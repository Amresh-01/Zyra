import { Request,Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";

import { getActionCenterData } from "../services/actionCenter.service";
export const getActionCenter = asyncHandler(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json(
        new ApiResponse(400, null, "Student ID is required")
      );
    }

    const data = await getActionCenterData(studentId as string);

    return res.status(200).json(
      new ApiResponse(
        200,
        data,
        "Action Center fetched successfully"
      )
    );
  }
);