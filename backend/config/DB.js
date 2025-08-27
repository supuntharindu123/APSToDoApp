// DB.js: Handles MongoDB connection
import mongoose from "mongoose";

// Connect to MongoDB
async function ConnectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected:");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

export default ConnectDB;
