// TaskInput: Input form for adding or editing a task
import React, { useState } from "react";

function TaskInput({ onSave, onCancel, initialValue, isEditing }) {
  // State for input value
  const [title, setTitle] = useState(initialValue || "");

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave({ title: title, completed: false });
    setTitle(""); // Clear input after submit
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" shadow-md flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6 w-full max-w-lg mx-auto"
    >
      <input
        type="text"
        className="border border-gray-700 bg-gray-600 text-white placeholder-gray-400 rounded-lg px-5 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 flex-1 min-w-0"
        placeholder="What is the task today?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex flex-row gap-2 w-full sm:w-auto mt-2 sm:mt-0">
        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition font-semibold shadow-md"
        >
          {isEditing ? "Save" : "Add Task"}
        </button>

        {isEditing && (
          <button
            type="button"
            className="w-full sm:w-auto px-5 py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-700 transition font-semibold"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskInput;
