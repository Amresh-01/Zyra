import { Router } from "express";
import { getActionCenter } from "../controller/actionCenter.controller";

const router = Router();

router.get("/action-center/:studentId", getActionCenter);

export default router;