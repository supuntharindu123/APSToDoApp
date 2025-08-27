import React, { useState } from "react";

function TaskInput({ onSave, onCancel, initialValue, isEditing }) {
  const [title, setTitle] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-600 shadow-md rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6 border justify-center border-gray-200 w-full max-w-lg mx-auto"
    >
      <input
        type="text"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 flex-1 min-w-0 text-white"
        placeholder="What is the task today?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div className="flex flex-row gap-2 w-full sm:w-auto mt-2 sm:mt-0">
        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2 bg-purple-800 text-white rounded hover:bg-purple-900 transition font-semibold"
        >
          {isEditing ? "Save" : "+ Add Task"}
        </button>

        {isEditing && (
          <button
            type="button"
            className="w-full sm:w-auto px-5 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition font-semibold"
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
