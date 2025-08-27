import React, { useState, useEffect } from "react";
import TaskItem from "../components/TaskItem";
import TaskInput from "../components/TaskInput";
import LoadingIcon from "../components/LoadingIcon";
import { createTask, getTasks } from "../actions/api";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";

// Main page for displaying and managing tasks
function TaskHomePage() {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTasks();
        setTasks(data.tasks || []);
        if (data.message) setSuccess(data.message);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Failed to fetch tasks. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Auto-clear alerts after 10 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Add a new task
  const handleAddTask = async (task) => {
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const data = await createTask(task.title, task.completed);
      if (data.task) setTasks((prev) => [data.task, ...prev]);
      setSuccess(data.message || "Task added successfully!");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to add task. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Update a single task in the tasks array
  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
  };

  // Remove a task from the tasks array
  const handleTaskDelete = (deletedId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t._id !== deletedId));
  };

  // Filter tasks by search
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  // Render UI
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-500  to-violet-800 py-4 px-2 flex flex-col items-center justify-start sm:justify-center">
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto bg-gray-700  p-4 sm:p-8 md:p-12 rounded-2xl shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-white drop-shadow-lg tracking-wide">
          Get Things Done!
        </h1>
        <div className="flex flex-col justify-center">
          <input
            type="text"
            className=" mb-4 px-4 py-2 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 md:w-lg mx-auto"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingIcon size={48} />
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                {success && <SuccessAlert message={success} />}
                {error && <ErrorAlert message={error} />}
              </div>
            </div>

            <TaskInput onSave={handleAddTask} />
            <div>
              {filteredTasks.length === 0 ? (
                <p className="text-center text-gray-300 mt-8">
                  No tasks found.
                </p>
              ) : (
                filteredTasks.map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onTaskUpdate={handleTaskUpdate}
                    onTaskDelete={handleTaskDelete}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskHomePage;
