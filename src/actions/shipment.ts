"use server";

import Shipment from "@/models/Shipment";
import { connectToDatabase } from "@/lib/mongoose";
import { parseShipmentForm, ShippingForm } from "@/lib/validations/shipment";
import { storeImage } from "@/lib/cloudinary";
import logger, { structureError } from "@/lib/logger";
import {
  generatePackageImage,
  generatePackageEmail,
  generateTrackingNumber,
} from "@/lib/package";
import { getSessionUserId } from "@/lib/session";
import { redirect } from "next/navigation";

export async function sendShipment(formData: ShippingForm) {
  let shipmentId;
  try {
    const userId = await getSessionUserId();
    if (userId) {
      const image = formData.get("image") as File | null;
      const imageUrl = image?.size ? await storeImage(image) : undefined;

      const parsed = parseShipmentForm(formData, imageUrl);

      if (!parsed.success) {
        return { error: "Invalid parameters recieved" };
      }

      // Tracking number
      const trackingNumber = generateTrackingNumber(
        parsed.data.package.deliveryType
      );

      // Generate inage
      const packageImage = imageUrl
        ? imageUrl
        : await generatePackageImage({
            language: parsed.data.language,
            sender: {
              name: parsed.data.sender.name,
              address: parsed.data.sender.address,
            },
            recipient: {
              name: parsed.data.recipient.name,
              address: parsed.data.recipient.address,
            },
            service: parsed.data.package.deliveryType,
            zip: parsed.data.routes[0].address.isoRegionCode,
            origin: parsed.data.routes[0].latlng,
            destination: parsed.data.routes.at(-1)!.latlng,
            trackingNumber,
            accountId: userId,
            weight: parsed.data.package.weight,
          });

      // Save shippment
      await connectToDatabase();
      const newShipment = new Shipment({
        _id: trackingNumber,
        owner: userId,
        ...parsed.data,
      });

      newShipment.package.image = packageImage;

      const shipment = await newShipment.save();
      shipmentId = shipment._id;

      // Notify recipient
      await generatePackageEmail({
        language: parsed.data.language,
        packageImage,
        sender: {
          name: parsed.data.sender.name,
          address: parsed.data.sender.address,
          email: parsed.data.sender.email,
        },
        recipient: {
          name: parsed.data.recipient.name,
          address: parsed.data.recipient.address,
          email: parsed.data.recipient.email,
        },
        trackingNumber,
        deliveryDate: parsed.data.pickup.date,
        description: parsed.data.package.type,
        service: parsed.data.package.deliveryType,
      });

      logger.info("Shipment sent", { shipmentId });

      return { success: shipment._id };
    }
  } catch (error) {
    logger.error("Failed to send shipment", structureError(error));
    if (shipmentId) await Shipment.deleteOne({ _id: shipmentId });
    return { error: "An error occurred" };
  }

  redirect("/login");
}

export async function updateShipment(
  formData: ShippingForm,
  shipmentId: string
) {
  try {
    const userId = await getSessionUserId();
    if (userId) {
      const parsed = parseShipmentForm(formData);

      if (!parsed.success) {
        return { error: "Invalid parameters recieved" };
      }

      // update shipment
      await connectToDatabase();
      await Shipment.updateOne({ _id: shipmentId }, parsed.data);

      logger.info("Shipment update", { shipmentId });

      return { success: shipmentId };
    }
  } catch (error) {
    logger.error("Failed to update shipment", structureError(error));
    return { error: "An error occurred" };
  }

  redirect("/login");
}

export async function deleteShipment(shipmentId: string) {
  try {
    const userId = await getSessionUserId();
    if (userId) {
      // update shippment
      await connectToDatabase();
      await Shipment.deleteOne({ _id: shipmentId });

      logger.info("Shipment deleted", { shipmentId });

      return { success: shipmentId };
    }
  } catch (error) {
    logger.error("Failed to delete shipment", structureError(error));
    return { error: "An error occurred" };
  }

  redirect("/login");
}
