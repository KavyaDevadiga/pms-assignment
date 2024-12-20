import { MONGO_URI } from "#src/config/env";
import mongoose from "mongoose";

const connectDb = async () => {
  if (!MONGO_URI) {
    throw new Error("Database URI is required");
  }
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
};

const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.error("Failed to disconnect the database:", error);
  }
};

export { connectDb, disconnectDb };
