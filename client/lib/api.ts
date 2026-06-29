export type Task = {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`);
  if (!res.ok) {
    throw new Error("failed to load tasks");
  }
  return res.json();
}

export async function createTask(title: string): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    throw new Error("failed to add task");
  }
  return res.json();
}

export async function toggleTask(id: string): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, { method: "PATCH" });
  if (!res.ok) {
    throw new Error("failed to update task");
  }
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("failed to delete task");
  }
}
