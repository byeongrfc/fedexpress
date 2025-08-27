import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import path from "path";
import fs from "fs/promises";
import ejs from "ejs";
import { storeImage } from "./cloudinary";
import { formatFullDate, formatToISODate } from "./date";
import { sendMail } from "./email";
import type { Delivery, Package } from "./validations/shipment";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

interface Info {
  language: Locale;
  sender: {
    name: string;
    address: string;
  };
  recipient: {
    name: string;
    address: string;
  };
  zip: string;
  service: Delivery;
  origin: [number, number];
  destination: [number, number];
  trackingNumber: string;
  accountId: string;
  weight: number;
}

interface Mail {
  language: Locale;
  packageImage: string;
  sender: {
    name: string;
    address: string;
    email: string;
  };
  recipient: {
    name: string;
    address: string;
    email: string;
  };
  trackingNumber: string;
  deliveryDate: Date;
  description: Package;
  service: Delivery;
}

export function generateTrackingNumber(service: Delivery = "express"): string {
  let length: number;
  let startDigit: number;

  switch (service) {
    case "standard":
      length = 15;
      startDigit = 6;
      break;
    case "express":
      length = 12;
      startDigit = 3;
      break;
    case "same-day":
      length = 12;
      startDigit = 7;
      break;
  }

  let base = startDigit.toString();
  for (let i = 0; i < length - 1; i++) {
    base += Math.floor(Math.random() * 10).toString();
  }

  const checkDigit = calculateMod11CheckDigit(base.slice(0, -1));
  return base.slice(0, -1) + checkDigit.toString();
}

export async function generatePackageImage({
  language,
  sender,
  recipient,
  zip,
  origin,
  destination,
  service,
  trackingNumber,
  accountId,
  weight,
}: Info) {
  const t = await getTranslations({
    locale: language,
    namespace: "packageImage",
  });

  const pageContents = {
    service_class_code: getServiceClassCode(service),
    postage_info: {
      postage_paid: t("postageAndFeesUnpaid"),
      ship_date: formatToISODate(new Date(), language),
      origin_zip: zip,
      account_or_permit: accountId.slice(0, 9).toUpperCase(),
      mode:
        service === "standard"
          ? t("standard")
          : service === "express"
          ? t("express")
          : t("sameDay"),
      weight: t("weight", {
        weight: Number(weight).toFixed(1),
      }),
      zone: t("zone", {
        zone: getShippingZone(origin, destination),
      }),
      internal_routing_code: generateInternalRoutingCode(),
    },
    service:
      service === "standard"
        ? t("standardGround")
        : service === "express"
        ? t("overnightExpress")
        : t("sameDayDelivery"),
    sender: {
      name: sender.name.toUpperCase(),
      address: sender.address.replace(/[\n\r]+/g, "<br/>"),
    },
    package_number: `000${Math.ceil(Math.random() * 9)}`,
    routing_code: generateRoutingCodeFromAddress(recipient.address),
    ship_to: t("shipTo"),
    recipient: {
      name: recipient.name.toUpperCase(),
      address: recipient.address.replace(/[\n\r]+/g, "<br/>"),
    },
    shipment_reference: `S-${Math.floor(
      1_000_000 + Math.random() * 9_000_000
    )}`,
    style_route: generateRoutingCodeFromAddress(recipient.address)[0],
    tracking_name: t("FDXTracking"),
    tracking_number: formatTrackingNumberWithSpaces(trackingNumber, service),
    tracking_link: new URL(`track/${trackingNumber}`, process.env.APP_URL).href,
  };

  const browser =
    process.env.NODE_ENV === "development"
      ? await puppeteer.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        })
      : await puppeteer.launch({
          headless: true,
          args: chromium.args,
          executablePath: await chromium.executablePath(),
        });

  const page = await browser.newPage();

  const clientErrors: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      clientErrors.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    clientErrors.push(err.message);
  });

  const htmlPath = path.join(
    process.cwd(),
    "src",
    "templates",
    "package",
    "puppeteer.html"
  );
  const html = await fs.readFile(htmlPath, "utf8");

  const rendered = ejs.render(html, pageContents);

  await page.setContent(rendered, { waitUntil: "networkidle0" });

  await page.setViewport({ width: 736, height: 981 });

  await page.waitForSelector("body");

  if (clientErrors.length) {
    throw new Error("Client-side errors:\n" + clientErrors.join("\n"));
  }

  const buffer = await page.screenshot({
    type: "jpeg",
    quality: 90,
    fullPage: false,
    clip: { width: 736, height: 981, x: 0, y: 0 },
  });

  const cloudinaryUrl = await storeImage(buffer as Buffer);

  browser.close();

  return cloudinaryUrl;
}

export async function generatePackageEmail({
  language,
  packageImage,
  sender,
  recipient,
  trackingNumber,
  deliveryDate,
  description,
  service,
}: Mail) {
  const t = await getTranslations({
    locale: language,
    namespace: "packageEmail",
  });

  const pageContents = {
    packageIconImage:
      "https://res.cloudinary.com/dm7ukckt0/image/upload/v1755184992/package_ykjrfi.png",
    avatarImage:
      "https://res.cloudinary.com/dm7ukckt0/image/upload/v1755184992/avatar_j5jmln.png",
    routePlaneImage:
      "https://res.cloudinary.com/dm7ukckt0/image/upload/v1755184992/route-plane_leirwz.png",
    homeImage:
      "https://res.cloudinary.com/dm7ukckt0/image/upload/v1755184992/home-animated_gswixb.gif",
    title: t("title"),
    packageOnTheWay: t("packageOnTheWay"),
    greetings: t("greetings", {
      name: recipient.name.split(" ")[0],
    }),
    greatNews: t("greatNews"),
    from: t("from"),
    senderName: sender.name,
    to: t("to"),
    recipientName: recipient.name,
    senderInformation: t("senderInformation"),
    name: t("name"),
    address: t("address"),
    senderAddress: sender.address.replace(/[\n\r]+/g, "<br/>"),
    packageDetails: t("packageDetails"),
    trackingUrl: new URL(`track/${trackingNumber}`, process.env.APP_URL).href,
    trackingNumberTitle: t("trackingNumber"),
    trackingNumber: `FDX-${formatTrackingNumberWithSpaces(
      trackingNumber,
      service
    ).replaceAll(" ", "-")}`,
    estimatedDeliveryTitle: t("estimatedDeliveryDate"),
    estimatedDelivery: formatFullDate(deliveryDate, language),
    deliveryMethodTitle: t("deliveryMethod"),
    deliveryMethod:
      service === "standard"
        ? t("standard")
        : service === "express"
        ? t("express")
        : t("sameDay"),
    descriptionTitle: t("description"),
    description:
      description === "box"
        ? t("box")
        : description === "envelope"
        ? t("envelope")
        : t("package"),
    deliveryAddressTitle: t("deliveryAddress"),
    deliveryAddress: recipient.address.replace(/[\n\r]+/g, "<br/>"),
    packageImage,
    trackMyPackage: t("trackMyPackage"),
    questionsAboutYourDelivery: t("questionsAboutYourDelivery", {
      linkText: `<a href="${
        new URL("/support", process.env.APP_URL).href
      }" style="color:#92400e;text-decoration:underline">${t(
        "deliveryFAQ"
      )}</a>`,
    }),
    deliveryInformation: t("deliveryInformation"),
    driverWillAttempt: t("driverWillAttempt"),
    reliableShippingWithCare: t("reliableShippingWithCare"),
    privacyUrl: new URL("legal", process.env.APP_URL).href,
    privacyPolicy: t("privacyPolicy"),
    termsUrl: new URL("legal", process.env.APP_URL).href,
    terms: t("terms"),
    unsubscribeUrl: new URL("", process.env.APP_URL).href,
    unsubscribe: t("unsubscribe"),
  };

  const htmlPath = path.join(
    process.cwd(),
    "src",
    "templates",
    "package",
    "email.html"
  );
  const html = await fs.readFile(htmlPath, "utf8");

  const rendered = ejs.render(html, pageContents);

  await sendMail({
    to: sender.email,
    subject: `${t("incomingPackageNotification")} (view)`,
    html: rendered,
  });
  await sendMail({
    to: recipient.email,
    subject: t("incomingPackageNotification"),
    html: rendered,
  });
}

export function formatTrackingNumberWithSpaces(
  trackingNumber: string,
  service: Delivery
): string {
  let groupSizes: number[];

  switch (service) {
    case "standard":
      groupSizes = [4, 4, 4, 3];
      break;
    case "express":
    case "same-day":
      groupSizes = [4, 4, 4];
      break;
    default:
      throw new Error("Unsupported service type");
  }

  let result = "";
  let index = 0;

  for (const size of groupSizes) {
    result += trackingNumber.slice(index, index + size) + " ";
    index += size;
  }

  return result.trim();
}

// Helpers

function calculateMod11CheckDigit(digits: string): number {
  const weights = [3, 1, 7];
  let sum = 0;
  let weightIndex = 0;

  for (let i = digits.length - 1; i >= 0; i--) {
    sum += parseInt(digits[i], 10) * weights[weightIndex];
    weightIndex = (weightIndex + 1) % weights.length;
  }

  const remainder = sum % 11;
  let checkDigit = (11 - remainder) % 11;

  if (checkDigit === 10) checkDigit = 0;

  return checkDigit;
}

function generateRoutingCodeFromAddress(address: string): string {
  let hash = 0;
  for (let i = 0; i < address.length; i++) {
    hash = (hash << 5) - hash + address.charCodeAt(i);
    hash |= 0; // Convert to 32bit int
  }

  const isRural = (hash & 1) === 0;
  const prefix = isRural ? "R" : "C";

  const routeNumber = Math.abs(hash % 999) + 1;
  const paddedRoute = routeNumber.toString().padStart(3, "0");

  return `${prefix}${paddedRoute}`;
}

function getShippingZone(
  origin: [number, number],
  destination: [number, number]
): number {
  const [originLat, originLon] = origin;
  const [destLat, destLon] = destination;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const R = 3958.8; // Earth radius in miles
  const dLat = toRad(destLat - originLat);
  const dLon = toRad(destLon - originLon);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(originLat)) *
      Math.cos(toRad(destLat)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceMiles = R * c;

  const zone =
    distanceMiles <= 50
      ? 1
      : distanceMiles <= 150
      ? 2
      : distanceMiles <= 300
      ? 3
      : distanceMiles <= 600
      ? 4
      : distanceMiles <= 1000
      ? 5
      : distanceMiles <= 1400
      ? 6
      : distanceMiles <= 1800
      ? 7
      : 8;

  return zone;
}

function generateInternalRoutingCode(): string {
  const hubs = ["CLT", "ATL", "DFW", "LAX", "ORD", "JFK"]; // hub codes
  const hub = hubs[Math.floor(Math.random() * hubs.length)];
  const building = `HB${Math.floor(Math.random() * 5) + 1}`; // HB1–HB5
  const belt = `BELT${Math.floor(Math.random() * 10) + 1}`; // BELT1–BELT10
  return `${hub}-${building}-${belt}`;
}

function getServiceClassCode(service: Delivery): string {
  switch (service) {
    case "standard":
      return "S";
    case "express":
      return "E";
    case "same-day":
      return "D";
    default:
      throw new Error(`Unknown service type: ${service}`);
  }
}
