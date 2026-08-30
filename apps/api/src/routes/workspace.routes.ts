import { Router } from "express";
import {
    create,
    list,
    invite,
} from "../controllers/workspace.controller.js";
import { listByWorkspace } from "../controllers/project.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { workspaceMemberMiddleware } from "../middleware/workspace.middleware.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", authMiddleware, list);
router.post("/:id/invite", authMiddleware, workspaceMemberMiddleware, invite);
router.get("/:id/projects", authMiddleware, workspaceMemberMiddleware, listByWorkspace);

export default router;
