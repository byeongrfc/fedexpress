import {
  type Types,
  Schema,
  model,
  models,
  Model,
  SchemaTypes,
} from "mongoose";
import type { Shipment as ShipmentType } from "@/lib/validations/shipment";
import User from "./User";
import type { Locale } from "@/i18n/routing";

export interface IShipment extends ShipmentType {
  _id: string;
  owner: Types.ObjectId;
  language: Locale;
  updatedAt: Date;
}

const AddressSchema = new Schema(
  {
    city: { type: String },
    county: { type: String },
    postcode: { type: String },
    town: { type: String },
    village: { type: String },
    hamlet: { type: String },
    suburb: { type: String },
    state: { type: String },
    isoRegionCode: { type: String, required: true },
    country_code: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const RouteSchema = new Schema(
  {
    latlng: {
      type: [Number],
      validate: {
        validator: (arr: unknown) => Array.isArray(arr) && arr.length === 2,
        message: "latlng must be an array of two numbers",
      },
      required: true,
    },
    address: { type: AddressSchema, required: true },
    status: {
      type: String,
      validate: {
        validator: (str: unknown) =>
          ["current", "completed", "upcoming"].includes(str as string),
        message: "status must be current, completed or upcoming",
      },
      required: true,
    },
    timeStamp: { type: Date },
  },
  { _id: false }
);

const ShipmentSchema = new Schema<IShipment>(
  {
    _id: { type: String, required: true },
    language: { type: String, required: true },
    owner: { type: SchemaTypes.ObjectId, required: true, ref: User },
    sender: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    recipient: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    package: {
      type: { type: String, required: true },
      deliveryType: { type: String, required: true },
      image: String,
      weight: { type: Number, required: true },
      length: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    pickup: {
      date: { type: Date, required: true },
      time: { type: String, required: true },
    },
    routes: { type: [RouteSchema], required: true },
  },
  { _id: false, timestamps: true }
);

const Shipment: Model<IShipment> =
  models.Shipment || model<IShipment>("Shipment", ShipmentSchema);

export default Shipment;
