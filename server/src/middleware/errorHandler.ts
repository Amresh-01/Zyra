import { Request, Response, NextFunction } from "express";
import ApiError  from "../utils/ApiError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error({
    requestId: req.requestId,
    message: err.message,
  });

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      requestId: req.requestId,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    requestId: req.requestId,
    message: "Internal Server Error",
  });
};