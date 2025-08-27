// TaskRoute.js: Defines API endpoints for tasks
import express from "express";
import {
  CreateTask,
  DeleteTask,
  GetTasks,
  UpdateTask,
} from "../controller/TaskController.js";

const router = express.Router();

// Task CRUD routes
router.post("/tasks", CreateTask); // POST /tasks
router.get("/tasks", GetTasks); // GET /tasks
router.put("/tasks/:id", UpdateTask); // PUT /tasks/:id
router.delete("/tasks/:id", DeleteTask); // DELETE /tasks/:id

export default router;
