import { Request, Response, NextFunction } from "express";
import { Task } from "../models/Task";

export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const task = await Task.create({ title: req.body.title });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

export async function getTasks(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

export async function toggleTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }
    res.json({ message: "task deleted" });
  } catch (error) {
    next(error);
  }
}
