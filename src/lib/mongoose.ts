import mongoose from "mongoose";
import { cache } from "react";

const MONGODB_URI = process.env.MONGODB_URI!;

async function connectMongo() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }

  await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });

  return mongoose;
}

export const connectToDatabase = cache(connectMongo);
