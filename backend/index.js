import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectDB from "./config/DB.js";
import router from "./routes/TaskRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  ConnectDB();
});
