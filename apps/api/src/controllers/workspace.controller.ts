import { Request, Response } from "express";
import {
    createWorkspace,
    getUserWorkspaces,
    inviteUserToWorkspace,
} from "../services/workspace.service.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function create(req: Request, res: Response) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const { name } = req.body;

        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                message: "Workspace name is required",
            });
        }

        const workspace = await createWorkspace(userId, name);

        return res.status(201).json(workspace);
    } catch (error) {
        console.error("Create workspace error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function list(req: Request, res: Response) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const workspaces = await getUserWorkspaces(userId);

        return res.status(200).json(workspaces);
    } catch (error) {
        console.error("List workspaces error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function invite(req: Request, res: Response) {
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

        if (!workspaceId || typeof workspaceId !== "string") {
            return res.status(400).json({
                message: "Workspace ID is required",
            });
        }

        const { email } = req.body;

        if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
            return res.status(400).json({
                message: "Valid email is required",
            });
        }

        const member = await inviteUserToWorkspace(
            userId,
            workspaceId,
            email
        );

        return res.status(200).json({
            message: "User invited successfully",
            member,
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "User not found" || error.message === "Workspace not found") {
                return res.status(404).json({
                    message: error.message,
                });
            }

            if (error.message === "User is already a member of this workspace") {
                return res.status(409).json({
                    message: error.message,
                });
            }

            if (error.message === "You are not a member of this workspace") {
                return res.status(403).json({
                    message: error.message,
                });
            }
        }

        console.error("Invite user error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
