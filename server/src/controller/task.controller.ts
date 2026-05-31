import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import { Task } from "../models/Task.model";

type TaskStatus = "todo" | "in_progress" | "completed";

export const updateTaskStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const { status } = req.body as { status: TaskStatus };

    if (!taskId) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "TaskId is required"));
    }

    const allowedStatuses: TaskStatus[] = [
      "todo",
      "in_progress",
      "completed",
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            "Invalid status value"
          )
        );
    }
    const updatedTask = await Task.findOneAndUpdate(
      { taskId },
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Task not found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedTask,
          "Task status updated successfully"
        )
      );
  }
);