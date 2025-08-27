// TaskController: Handles CRUD operations for Task model
import Task from "../model/Task.js";

// Create a new task
export async function CreateTask(req, res) {
  const { title, completed } = req.body;
  try {
    // Validate input
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    // Save new task
    const newTask = new Task({ title, completed });
    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
}

// Get all tasks
export async function GetTasks(req, res) {
  try {
    // Fetch tasks from DB
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
}

// Update a task by ID
export async function UpdateTask(req, res) {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    // Validate input
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    // Update task in DB
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );
    // If not found
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
}

// Delete a task by ID
export async function DeleteTask(req, res) {
  const { id } = req.params;
  try {
    // Delete task from DB
    const deletedTask = await Task.findByIdAndDelete(id);
    // If not found
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
}
