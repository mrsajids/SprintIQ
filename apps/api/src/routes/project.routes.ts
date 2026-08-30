import { Router } from "express";
import { create } from "../controllers/project.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { workspaceMemberMiddleware } from "../middleware/workspace.middleware.js";

const router = Router();

router.post("/", authMiddleware, workspaceMemberMiddleware, create);

export default router;
