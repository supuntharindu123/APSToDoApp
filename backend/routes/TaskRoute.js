import express from "express";
import {
  CreateTask,
  DeleteTask,
  GetTasks,
  UpdateTask,
} from "../controller/TaskController.js";

const router = express.Router();

router.post("/tasks", CreateTask);
router.get("/tasks", GetTasks);
router.put("/tasks/:id", UpdateTask);
router.delete("/tasks/:id", DeleteTask);

export default router;
