// TaskItem: Displays a single task with edit, delete, and complete options
import { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import { updateTask, deleteTask } from "../actions/api";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

function TaskItem({ task, onTaskUpdate, onTaskDelete }) {
  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return (
      d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
      " " +
      d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
    );
  };

  const [menu, setMenu] = useState(false);
  const [edit, setEdit] = useState(false);
  const [completed, setCompleted] = useState(task.completed);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

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

  // Handle save (edit) action
  const handleSaveBtn = async (newTitle) => {
    setEdit(false);
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const data = await updateTask(task._id, newTitle, completed);
      if (onTaskUpdate && data.task) onTaskUpdate(data.task);
      setSuccess(data.message || "Task updated successfully!");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to update task. Please try again."
      );
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 1500);
    }
  };

  // Handle cancel edit
  const handleCancelBtn = () => {
    setEdit(false);
  };

  // Handle mark as completed
  const handleCompletedChange = async (e) => {
    const newCompleted = e.target.checked;
    setCompleted(newCompleted);
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const data = await updateTask(task._id, task.title, newCompleted);
      if (onTaskUpdate && data.task) onTaskUpdate(data.task);
      setSuccess(data.message || "Task updated successfully!");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to update task. Please try again."
      );
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 1500);
    }
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const data = await deleteTask(task._id);
      if (onTaskDelete) onTaskDelete(task._id);
      setSuccess("Task deleted successfully!");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to delete task. Please try again."
      );
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 1500);
    }
  };

  return (
    <div className="mb-4 w-full max-w-lg sm:max-w-xl md:max-w-lg mx-auto">
      {success && <SuccessAlert message={success} />}
      {error && <ErrorAlert message={error} />}
      <div className="bg-purple-700 shadow-lg rounded-xl p-3 sm:p-4 border-none flex items-center justify-between relative">
        <div className="flex items-center flex-1 min-w-0">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChange}
            className="mr-3 accent-purple-300 w-5 h-5 min-w-5 min-h-5"
            aria-label="Mark as completed"
          />
          <div className="flex flex-col min-w-0">
            <h2
              className={`text-base sm:text-lg font-semibold ${
                completed ? "line-through text-gray-300" : "text-white"
              } break-words max-w-[70vw] sm:max-w-xs md:max-w-md drop-shadow-lg`}
            >
              {task.title}
            </h2>
            {task.createdAt && (
              <span className="text-xs text-gray-200 mt-1">
                {formatDate(task.createdAt)}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full hover:bg-purple-600 text-white focus:outline-none transition-colors"
            title="Edit"
            aria-label="Edit"
            onClick={() => setEdit(true)}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.414 2.586a2 2 0 0 0-2.828 0l-8.5 8.5A2 2 0 0 0 5 12.5V15a1 1 0 0 0 1 1h2.5a2 2 0 0 0 1.414-.586l8.5-8.5a2 2 0 0 0 0-2.828zM7.5 15H6v-1.5l8.5-8.5 1.5 1.5-8.5 8.5z" />
            </svg>
          </button>
          <button
            className="p-2 rounded-full hover:bg-purple-600 text-white focus:outline-none transition-colors"
            title="Delete"
            aria-label="Delete"
            onClick={handleDelete}
            disabled={loading}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 8v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8M9 4h2a2 2 0 0 1 2 2v1H7V6a2 2 0 0 1 2-2z" />
            </svg>
          </button>
        </div>

        {menu && (
          <div className="absolute right-2 top-12 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
            <button
              className="w-full text-left px-4 py-2 hover:bg-violet-700 text-white"
              onClick={() => {
                setMenu(false);
                setEdit(true);
              }}
            >
              Edit
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-violet-700 text-red-300"
              onClick={() => {
                console.log("Delete clicked");
                setMenu(false);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {edit && (
        <div className="mt-2">
          <TaskInput
            initialValue={task.title}
            onSave={(val) => handleSaveBtn(val.title)}
            onCancel={handleCancelBtn}
            isEditing={edit}
          />
        </div>
      )}
    </div>
  );
}

export default TaskItem;
