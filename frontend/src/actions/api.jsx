// API utility functions for task CRUD operations
import axios from "axios";

// Create a new task
export async function createTask(title, completed) {
  try {
    const response = await axios.post("http://localhost:3000/api/tasks", {
      title,
      completed,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

// Get all tasks
export async function getTasks() {
  try {
    const response = await axios.get("http://localhost:3000/api/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

// Update a task by ID
export async function updateTask(id, title, completed) {
  try {
    const response = await axios.put(`http://localhost:3000/api/tasks/${id}`, {
      title,
      completed,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}

// Delete a task by ID
export async function deleteTask(id) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/tasks/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}
