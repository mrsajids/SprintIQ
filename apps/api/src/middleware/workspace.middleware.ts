import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { Workspace, WorkspaceMember } from "../generated/prisma/client.js";

declare global {
    namespace Express {
        interface Request {
            workspace?: Workspace;
            workspaceMember?: WorkspaceMember;
        }
    }
}

export async function workspaceMemberMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({
            message: "Authentication required",
        });
    }

    const rawWorkspaceId =
        req.params.id ??
        req.params.workspaceId ??
        req.body?.workspaceId;
    const workspaceId = Array.isArray(rawWorkspaceId)
        ? rawWorkspaceId[0]
        : rawWorkspaceId;

    if (!workspaceId || typeof workspaceId !== "string" || !workspaceId.trim()) {
        return res.status(400).json({
            message: "Workspace ID is required",
        });
    }

    try {
        const workspace = await prisma.workspace.findUnique({
            where: { id: workspaceId },
        });

        if (!workspace) {
            return res.status(404).json({
                message: "Workspace not found",
            });
        }

        const member = await prisma.workspaceMember.findUnique({
            where: {
                userId_workspaceId: {
                    userId,
                    workspaceId,
                },
            },
        });

        if (!member) {
            return res.status(403).json({
                message: "You are not a member of this workspace",
            });
        }

        req.workspace = workspace;
        req.workspaceMember = member;

        next();
    } catch (error) {
        console.error("Workspace authorization error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
