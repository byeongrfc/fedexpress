import { z, ZodError } from "zod";
import { routing } from "@/i18n/routing";

export const shippingSchema = z.object({
  language: z.enum(routing.locales),
  sender: z.object({
    name: z.string().trim().min(3),
    email: z.email(),
    phone: z.string().trim().min(10).max(15),
    address: z.string().trim().min(3).max(1000),
  }),
  recipient: z.object({
    name: z.string().trim().min(3),
    email: z.email(),
    phone: z.string().trim().min(10).max(15),
    address: z.string().trim().min(3).max(1000),
  }),
  package: z.object({
    type: z.enum(["box", "envelope", "other"]),
    deliveryType: z.enum(["standard", "express", "same-day"]),
    image: z.union([z.undefined(), z.string()]),
    weight: z.number().min(1),
    length: z.number().min(1),
    width: z.number().min(1),
    height: z.number().min(1),
  }),
  pickup: z.object({
    date: z.date().min(new Date()),
    time: z.enum(["morning", "afternoon", "evening"]),
  }),
  routes: z
    .array(
      z.object({
        latlng: z.tuple([z.number(), z.number()]),
        address: z.object({
          isoRegionCode: z.string(),
          city: z.union([z.undefined(), z.string()]),
          county: z.union([z.undefined(), z.string()]),
          postcode: z.union([z.undefined(), z.string()]),
          town: z.union([z.undefined(), z.string()]),
          village: z.union([z.undefined(), z.string()]),
          hamlet: z.union([z.undefined(), z.string()]),
          suburb: z.union([z.undefined(), z.string()]),
          state: z.union([z.undefined(), z.string()]),
          country_code: z.string(),
          country: z.string(),
        }),
        status: z.enum(["current", "completed", "upcoming"]),
        timeStamp: z.union([z.undefined(), z.date(), z.string()]),
      })
    )
    .min(4)
    .max(4),
});

export type Shipment = z.infer<typeof shippingSchema>;
export type Routes = Shipment["routes"];
export type Route = Shipment["routes"][0];
export type Address = Shipment["routes"][0]["address"];
export type Delivery = Shipment["package"]["deliveryType"];
export type Package = Shipment["package"]["type"];

export type ShippingFormEntry =
  | "language"
  | "sender-name"
  | "sender-email"
  | "sender-phone"
  | "pickup-address"
  | "recipient-name"
  | "recipient-email"
  | "recipient-phone"
  | "delivery-address"
  | "package-type"
  | "delivery-type"
  | "image"
  | "weight"
  | "length"
  | "width"
  | "height"
  | "pickup-date"
  | "pickup-time"
  | "routes";

export interface ShippingForm extends FormData {
  get: (name: ShippingFormEntry) => FormDataEntryValue | null;
}

export function parseShipmentForm(formData: ShippingForm, imageUrl?: string) {
  const parsed = shippingSchema.safeParse({
    language: formData.get("language"),
    sender: {
      name: formData.get("sender-name"),
      email: formData.get("sender-email"),
      phone: formData.get("sender-phone"),
      address: formData.get("pickup-address"),
    },
    recipient: {
      name: formData.get("recipient-name"),
      email: formData.get("recipient-email"),
      phone: formData.get("recipient-phone"),
      address: formData.get("delivery-address"),
    },
    package: {
      type: formData.get("package-type"),
      deliveryType: formData.get("delivery-type"),
      weight: Number(formData.get("weight")),
      length: Number(formData.get("length")),
      width: Number(formData.get("width")),
      height: Number(formData.get("height")),
      image: imageUrl,
    },
    pickup: {
      date: new Date(formData.get("pickup-date") as string),
      time: formData.get("pickup-time"),
    },
    routes: JSON.parse(formData.get("routes") as string),
  });

  return parsed;
}

export function getErrorKey(
  parsedError: ZodError<Shipment>
): ShippingFormEntry | null {
  const error = z.formatError(parsedError);

  return error?.language
    ? "language"
    : error.sender?.name
    ? "sender-name"
    : error.sender?.email
    ? "sender-email"
    : error.sender?.phone
    ? "sender-phone"
    : error.sender?.address
    ? "pickup-address"
    : error.recipient?.name
    ? "recipient-name"
    : error.recipient?.email
    ? "recipient-email"
    : error.recipient?.phone
    ? "recipient-phone"
    : error.recipient?.address
    ? "delivery-address"
    : error.package?.type
    ? "package-type"
    : error.package?.deliveryType
    ? "delivery-type"
    : error.package?.weight
    ? "weight"
    : error.package?.length
    ? "length"
    : error.package?.width
    ? "width"
    : error.package?.height
    ? "height"
    : error.package?.image
    ? "image"
    : error.pickup?.date
    ? "pickup-date"
    : error.pickup?.time
    ? "pickup-time"
    : error.routes
    ? "routes"
    : null;
}
