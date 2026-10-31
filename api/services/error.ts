import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

// When an error gets thrown (like no item found by id) errorHandler catches the "throw" and sets statuscode
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (typeof err === "number") {
    return res.sendStatus(err);
  }

  if (err instanceof ZodError) {
    return res.sendStatus(400);
  }

  return res.sendStatus(err.status ?? 500);
};
