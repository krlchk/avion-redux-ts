import { Request, Response, NextFunction } from "express";

export const errorHandling = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = 500;
  const message = err instanceof Error ? err.message : "Something went wrong";
  res.status(statusCode).json({
    status: statusCode,
    message: message,
    error: message,
  });
};
