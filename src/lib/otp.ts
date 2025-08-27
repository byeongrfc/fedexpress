import path from "path";
import fs from "fs/promises";
import ejs from "ejs";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { sendMail } from "./email";

export function generateOtp(length: number = 6): string {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}

interface Mail {
  email: string;
  otp: string;
  language: Locale | string;
}

export async function sendOtpEmail({ email, otp, language }: Mail) {
  const t = await getTranslations({
    locale: language,
    namespace: "otpEmail",
  });

  const pageContents = {
    packageIconImage:
      "https://res.cloudinary.com/dm7ukckt0/image/upload/v1755184992/package_ykjrfi.png",
    title: t("title"),
    secureFastReliable: t("secureFastReliable"),
    greeting: t("greeting"),
    codeIsReady: t("codeIsReady"),
    otp: `${otp.slice(0, 3)}-${otp.slice(3)}`,
    expiresIn: t("expiresIn"),
    howToUse: t("howToUse"),
    returnToFedExpress: t("returnToFedExpress"),
    enterCode: t("enterCode"),
    clickVerify: t("clickVerify"),
    securityTips: t("securityTips"),
    neverShare: t("neverShare"),
    willNeverAsk: t("willNeverAsk"),
    contactUsImmediately: t("contactUsImmediately"),
    copyright: t("copyright", {
      year: new Date().getFullYear(),
    }),
  };

  const htmlPath = path.join(
    process.cwd(),
    "src",
    "templates",
    "otp",
    "email.html"
  );
  const html = await fs.readFile(htmlPath, "utf8");

  const rendered = ejs.render(html, pageContents);

  return sendMail({
    to: email,
    subject: "OTP",
    html: rendered,
  });
}
