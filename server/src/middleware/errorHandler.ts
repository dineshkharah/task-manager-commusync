import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);

  if (err.name === "CastError") {
    return res.status(400).json({ error: "invalid id" });
  }

  res.status(500).json({ error: "something went wrong" });
}
