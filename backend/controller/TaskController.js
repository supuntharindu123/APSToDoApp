import Task from "../model/Task.js";

export async function CreateTask(req, res) {
  const { title, completed } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const newTask = new Task({ title, completed });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
}

export async function GetTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
}

export async function UpdateTask(req, res) {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
}

export async function DeleteTask(req, res) {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
}
