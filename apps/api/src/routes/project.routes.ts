import { Router } from "express";
import { create } from "../controllers/project.controller.js";
import {
    create as createTaskController,
    getBoard as getBoardController,
} from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { workspaceMemberMiddleware } from "../middleware/workspace.middleware.js";

const router = Router();

router.post("/", authMiddleware, workspaceMemberMiddleware, create);
router.post("/:id/tasks", authMiddleware, createTaskController);
router.get("/:id/board", authMiddleware, getBoardController);

export default router;
