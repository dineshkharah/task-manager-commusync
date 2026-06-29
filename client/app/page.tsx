"use client";

import { useEffect, useState } from "react";
import { Task, getTasks, createTask, toggleTask, deleteTask } from "@/lib/api";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError("Could not load tasks. Is the server running?"))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (title: string) => {
    try {
      const newTask = await createTask(title);
      setTasks((prev) => [newTask, ...prev]);
      setError("");
    } catch {
      setError("Could not add the task.");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const updated = await toggleTask(id);
      setTasks((prev) => prev.map((task) => (task._id === id ? updated : task)));
      setError("");
    } catch {
      setError("Could not update the task.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      setError("");
    } catch {
      setError("Could not delete the task.");
    }
  };

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-semibold text-zinc-800">Task Manager</h1>
      <div className="mt-4">
        <TaskForm onAdd={handleAdd} />
      </div>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <div className="mt-6">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      </div>
    </main>
  );
};

export default Home;
