import { Schema, model, models, Document, Model, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);

export default User;
