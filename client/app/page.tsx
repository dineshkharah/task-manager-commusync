"use client";

import { useEffect, useState } from "react";
import { Task, getTasks, createTask, toggleTask, deleteTask } from "@/lib/api";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleAdd = async (title: string) => {
    const newTask = await createTask(title);
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggle = async (id: string) => {
    const updated = await toggleTask(id);
    setTasks((prev) => prev.map((task) => (task._id === id ? updated : task)));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-semibold text-zinc-800">Task Manager</h1>
      <div className="mt-4">
        <TaskForm onAdd={handleAdd} />
      </div>
      <div className="mt-6">
        <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      </div>
    </main>
  );
};

export default Home;
