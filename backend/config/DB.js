import mongoose from "mongoose";

async function ConnectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected:");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

export default ConnectDB;
