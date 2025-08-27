import { useState } from "react";
import TaskInput from "./TaskInput";

function TaskItem({ task }) {
  const [menu, setMenu] = useState(false);
  const [edit, setEdit] = useState(false);
  const [completed, setCompleted] = useState(task.completed);

  const handleSaveBtn = () => {
    setEdit(false);
  };

  const handleCancelBtn = () => {
    setEdit(false);
  };

  const handleCompletedChange = (e) => {
    setCompleted(e.target.checked);
  };

  return (
    <div className="mb-4 w-full max-w-lg sm:max-w-xl md:max-w-lg mx-auto">
      <div className="bg-violet-900 shadow-md rounded-lg p-3 sm:p-4 border border-pirple-200 flex items-center justify-between relative">
        <div className="flex items-center flex-1 min-w-0 justify-between">
          <h2
            className={`text-base sm:text-lg font-semibold ${
              completed ? "line-through text-gray-100" : "text-white"
            } break-words max-w-[70vw] sm:max-w-xs md:max-w-md`}
          >
            {task.title}
          </h2>
          <div>
            <input
              type="checkbox"
              checked={completed}
              onChange={handleCompletedChange}
              className="mr-3 accent-blue-500 w-5 h-5 min-w-5 min-h-5"
              aria-label="Mark as completed"
            />
            <button
              className="ml-2 p-2 rounded-full hover:bg-gray-100 text-gray-500 focus:outline-none"
              title="More actions"
              aria-label="More actions"
              onClick={() => setMenu(!menu)}
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <circle cx="10" cy="4" r="1.5" />
                <circle cx="10" cy="10" r="1.5" />
                <circle cx="10" cy="16" r="1.5" />
              </svg>
            </button>
          </div>
        </div>

        {menu && (
          <div className="absolute right-2 top-12 w-32 bg-white  shadow-lg z-10">
            <button
              className="w-full text-left px-4 py-2 hover:bg-violet-500 text-gray-700"
              onClick={() => {
                setMenu(false);
                setEdit(true);
              }}
            >
              Edit
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-violet-500 text-red-600"
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
            onSave={handleSaveBtn}
            onCancel={handleCancelBtn}
            isEditing={edit}
          />
        </div>
      )}
    </div>
  );
}

export default TaskItem;
