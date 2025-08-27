// Task.js: Mongoose model for tasks
import mongoose from "mongoose";

// Define schema for Task
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create Task model
const Task = mongoose.model("Task", taskSchema);

export default Task;
