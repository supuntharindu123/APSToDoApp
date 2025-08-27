import axios from "axios";

export function createTask(task) {
  return axios.post("/api/tasks", task);
}
