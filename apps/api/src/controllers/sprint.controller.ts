import { Request, Response } from "express";
import {
    createSprint,
    updateSprint,
} from "../services/sprint.service.js";

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

        const { name, goal, status, startDate, endDate } = req.body;

        const sprint = await createSprint(userId, projectId.trim(), {
            name,
            goal,
            status,
            startDate,
            endDate,
        });

        return res.status(201).json(sprint);
    } catch (error) {
        if (error instanceof Error) {
            if (
                error.message === "Sprint name is required and must not be empty" ||
                error.message === "Invalid sprint status" ||
                error.message === "Invalid date format" ||
                error.message === "End date cannot be earlier than start date"
            ) {
                return res.status(400).json({
                    message: error.message,
                });
            }

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

        console.error("Create sprint error:", error);
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

        const rawSprintId = req.params.id ?? req.params.sprintId;
        const sprintId = Array.isArray(rawSprintId)
            ? rawSprintId[0]
            : rawSprintId;

        if (!sprintId || typeof sprintId !== "string" || !sprintId.trim()) {
            return res.status(400).json({
                message: "Sprint ID is required",
            });
        }

        const { name, goal, status, startDate, endDate } = req.body;

        const sprint = await updateSprint(userId, sprintId.trim(), {
            name,
            goal,
            status,
            startDate,
            endDate,
        });

        return res.status(200).json(sprint);
    } catch (error) {
        if (error instanceof Error) {
            if (
                error.message === "Sprint name must not be empty" ||
                error.message === "Invalid sprint status" ||
                error.message === "Invalid date format" ||
                error.message === "End date cannot be earlier than start date"
            ) {
                return res.status(400).json({
                    message: error.message,
                });
            }

            if (error.message === "Sprint not found") {
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

        console.error("Update sprint error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
