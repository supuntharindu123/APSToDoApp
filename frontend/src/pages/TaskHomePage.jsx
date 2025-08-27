import React, { useState } from "react";
import TaskItem from "../components/TaskItem";
import TaskInput from "../components/TaskInput";

function TaskHomePage() {
  const [tasks, setTasks] = useState([
    {
      title: "Buy groceries",

      completed: false,
    },
    {
      title: "Finish assignment",

      completed: true,
    },
  ]);

  const handleAddTask = (task) => {
    setTasks([{ ...task, completed: false }, ...tasks]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 to-violet-900 py-4 flex flex-col items-center justify-start sm:justify-center">
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto bg-gray-800 p-4 sm:p-8 md:p-12 rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-white">
          Get Things Done!
        </h1>
        <TaskInput onAddTask={handleAddTask} />
        <div>
          {tasks.length === 0 ? (
            <p className="text-center text-white mt-8">
              No tasks yet. Add your first task!
            </p>
          ) : (
            tasks.map((task, idx) => <TaskItem key={idx} task={task} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskHomePage;
