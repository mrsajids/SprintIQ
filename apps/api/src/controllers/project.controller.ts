import { Request, Response } from "express";
import {
    createProject,
    getWorkspaceProjects,
} from "../services/project.service.js";

export async function create(req: Request, res: Response) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const { workspaceId, name, description } = req.body;

        if (!workspaceId || typeof workspaceId !== "string" || !workspaceId.trim()) {
            return res.status(400).json({
                message: "Workspace ID is required",
            });
        }

        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                message: "Project name is required",
            });
        }

        const project = await createProject(userId, {
            workspaceId: workspaceId.trim(),
            name: name.trim(),
            description: typeof description === "string" ? description : null,
        });

        return res.status(201).json(project);
    } catch (error) {
        console.error("Create project error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function listByWorkspace(req: Request, res: Response) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const rawWorkspaceId = req.params.id ?? req.params.workspaceId;
        const workspaceId = Array.isArray(rawWorkspaceId)
            ? rawWorkspaceId[0]
            : rawWorkspaceId;

        if (!workspaceId || typeof workspaceId !== "string" || !workspaceId.trim()) {
            return res.status(400).json({
                message: "Workspace ID is required",
            });
        }

        const projects = await getWorkspaceProjects(workspaceId);

        return res.status(200).json(projects);
    } catch (error) {
        console.error("List workspace projects error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
