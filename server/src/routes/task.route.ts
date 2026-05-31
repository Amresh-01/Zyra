import { Router } from "express";
import { updateTaskStatus } from "../controller/task.controller";

const router = Router();

router.patch("/:taskId/status", updateTaskStatus);

export default router;