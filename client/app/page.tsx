"use client";

import TaskForm from "@/components/TaskForm";

const Home = () => {
  const handleAdd = (title: string) => {
    console.log("would add task:", title);
  };

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-semibold text-zinc-800">Task Manager</h1>
      <div className="mt-4">
        <TaskForm onAdd={handleAdd} />
      </div>
    </main>
  );
};

export default Home;
