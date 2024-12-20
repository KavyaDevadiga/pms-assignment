import * as dotenv from "dotenv";
dotenv.config();

export const PORT = parseInt(process.env.PORT, 10) || 3000;

//Mongo Credentials
export const MONGO_URI = process.env.MONGO_URI || "";

export const JWT_SECRET = process.env.JWT_SECRET || "";
