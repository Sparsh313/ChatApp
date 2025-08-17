// DB.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
const url = process.env.MONGODB_URL;

  try {
    await mongoose.connect(url, { dbName: "chatAppMicroservice" });
    console.log("Connected to DB");
  } catch (err) {
    console.log(`Failed to connect to DB`);
    process.exit(1);
  }
};

export default connectDB;
