import { Request, Response } from "express";
import {
    createTask,
    getProjectBoard,
    updateTask,
} from "../services/task.service.js";

export async function create(req: Request, res: Response) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const rawProjectId = req.params.id ?? req.params.projectId;
        const projectId = Array.isArray(rawProjectId)
            ? rawProjectId[0]
            : rawProjectId;

        if (!projectId || typeof projectId !== "string" || !projectId.trim()) {
            return res.status(400).json({
                message: "Project ID is required",
            });
        }

        const { title, description } = req.body;

        if (!title || typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                message: "Task title is required and must not be empty",
            });
        }

        const task = await createTask(userId, projectId.trim(), {
            title: title.trim(),
            description: typeof description === "string" ? description : null,
        });

        return res.status(201).json(task);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "Project not found") {
                return res.status(404).json({
                    message: error.message,
                });
            }

            if (error.message === "You are not a member of this workspace") {
                return res.status(403).json({
                    message: error.message,
                });
            }
        }

        console.error("Create task error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function getBoard(req: Request, res: Response) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const rawProjectId = req.params.id ?? req.params.projectId;
        const projectId = Array.isArray(rawProjectId)
            ? rawProjectId[0]
            : rawProjectId;

        if (!projectId || typeof projectId !== "string" || !projectId.trim()) {
            return res.status(400).json({
                message: "Project ID is required",
            });
        }

        const board = await getProjectBoard(userId, projectId.trim());

        return res.status(200).json(board);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "Project not found") {
                return res.status(404).json({
                    message: error.message,
                });
            }

            if (error.message === "You are not a member of this workspace") {
                return res.status(403).json({
                    message: error.message,
                });
            }
        }

        console.error("Get project board error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const rawTaskId = req.params.id ?? req.params.taskId;
        const taskId = Array.isArray(rawTaskId) ? rawTaskId[0] : rawTaskId;

        if (!taskId || typeof taskId !== "string" || !taskId.trim()) {
            return res.status(400).json({
                message: "Task ID is required",
            });
        }

        const { title, description, status } = req.body;

        const task = await updateTask(userId, taskId.trim(), {
            title,
            description,
            status,
        });

        return res.status(200).json(task);
    } catch (error) {
        if (error instanceof Error) {
            if (
                error.message === "Title must not be empty" ||
                error.message === "Invalid task status"
            ) {
                return res.status(400).json({
                    message: error.message,
                });
            }

            if (error.message === "Task not found") {
                return res.status(404).json({
                    message: error.message,
                });
            }

            if (error.message === "You are not a member of this workspace") {
                return res.status(403).json({
                    message: error.message,
                });
            }
        }

        console.error("Update task error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
