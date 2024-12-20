import mongoose from "mongoose";

export const generateMongoObjectId = () => {
  return new mongoose.Types.ObjectId().toHexString();
};
