import { FlattenMaps, Types } from "mongoose";
import { connectToDatabase } from "./mongoose";
import Shipment, { type IShipment } from "@/models/Shipment";
import { redirect } from "next/navigation";

export async function getSenderShipments(id: Types.ObjectId) {
  await connectToDatabase();
  const shipments = await Shipment.find({ owner: id }).lean().exec();

  return shipments;
}

export async function getShipment(
  id: string,
  redirectIfNotFound: true
): Promise<
  FlattenMaps<IShipment> &
    Required<{
      _id: Types.ObjectId;
    }> & {
      __v: number;
    }
>;
export async function getShipment(
  id: string,
  redirectIfNotFound: false
): Promise<
  | (FlattenMaps<IShipment> &
      Required<{
        _id: Types.ObjectId;
      }> & {
        __v: number;
      })
  | null
>;
export async function getShipment(
  id: string,
  redirectIfNotFound: boolean = false
) {
  await connectToDatabase();
  const shipment = await Shipment.findOne({ _id: id }).lean().exec();

  if (!shipment && redirectIfNotFound) redirect("/dashboard");

  return shipment;
}
