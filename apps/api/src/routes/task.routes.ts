import { Router } from "express";
import { update } from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.patch("/:id", authMiddleware, update);

export default router;
