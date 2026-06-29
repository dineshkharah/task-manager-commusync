import { Request, Response, NextFunction } from "express";
import { z, ZodType } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "title is required").max(200, "title is too long"),
});

export function validateBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues[0]?.message || "invalid input";
      return res.status(400).json({ error: message });
    }

    req.body = result.data;
    next();
  };
}
