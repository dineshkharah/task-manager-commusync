"use client";

import { useState } from "react";
import { Task } from "@/lib/api";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const [confirming, setConfirming] = useState(false);

  return (
    <li className="flex items-center gap-2 border-b border-gray-700 py-2">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id)}
      />
      <span className={`flex-1 ${task.completed ? "text-gray-500 line-through" : ""}`}>
        {task.title}
      </span>
      <button
        onClick={() => setConfirming(true)}
        className="rounded-md border border-red-700 bg-red-600 px-2 py-1 text-sm text-white"
      >
        Delete
      </button>

      {confirming && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
          <div className="w-80 rounded-md border border-gray-600 bg-zinc-900 p-4">
            <p className="text-white">Delete this task?</p>
            <p className="mt-1 text-sm text-gray-400">{task.title}</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setConfirming(false)}
                className="rounded-md border border-gray-500 px-3 py-1 text-sm text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(task._id);
                  setConfirming(false);
                }}
                className="rounded-md border border-red-700 bg-red-600 px-3 py-1 text-sm text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
