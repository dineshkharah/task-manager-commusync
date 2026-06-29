import { Router } from "express";
import { getTasks, createTask, toggleTask, deleteTask } from "../controllers/taskController";
import { validateBody, createTaskSchema } from "../middleware/validate";

const router = Router();

router.get("/", getTasks);
router.post("/", validateBody(createTaskSchema), createTask);
router.patch("/:id", toggleTask);
router.delete("/:id", deleteTask);

export default router;
