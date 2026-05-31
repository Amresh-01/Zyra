import { Router } from "express";

import actionCenterRoutes from "./actionCenter.route";
import taskRoutes from "./task.route";

const router = Router();

router.use("/students", actionCenterRoutes);
router.use("/tasks", taskRoutes);

export default router;