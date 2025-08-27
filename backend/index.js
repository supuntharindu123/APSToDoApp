import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectDB from "./config/DB.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  ConnectDB();
});
