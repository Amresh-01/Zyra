import { Router } from "express";
import { updateTaskStatus } from "../controller/task.controller";

const router = Router();

router.patch("/status/:taskId", updateTaskStatus);

export default router;