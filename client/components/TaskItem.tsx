import { Task } from "@/lib/api";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
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
        onClick={() => onDelete(task._id)}
        className="rounded-md border border-red-700 bg-red-600 px-2 py-1 text-sm text-white"
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
