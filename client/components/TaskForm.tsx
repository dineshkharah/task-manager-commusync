"use client";

import { useState } from "react";

type TaskFormProps = {
  onAdd: (title: string) => void;
};

const TaskForm = ({ onAdd }: TaskFormProps) => {
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed === "") {
      return;
    }
    onAdd(trimmed);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="add a task"
        className="flex-1 rounded-md border border-gray-400 px-2 py-1"
      />
      <button type="submit" className="rounded-md border border-blue-700 bg-blue-600 px-3 py-1 text-white">
        Add
      </button>
    </form>
  );
};

export default TaskForm;
