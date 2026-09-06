import prisma from "../lib/prisma.js";
import type { CreateProjectInput } from "@sprintiq/shared-types";

export type { CreateProjectInput };

export async function createProject(
    userId: string,
    input: CreateProjectInput
) {
    const project = await prisma.project.create({
        data: {
            workspaceId: input.workspaceId,
            name: input.name.trim(),
            description: input.description?.trim() || null,
            createdById: userId,
        },
    });

    return project;
}

export async function getWorkspaceProjects(workspaceId: string) {
    const projects = await prisma.project.findMany({
        where: {
            workspaceId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return projects;
}
