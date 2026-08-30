import prisma from "../lib/prisma.js";

export interface CreateProjectInput {
    workspaceId: string;
    name: string;
    description?: string | null;
}

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
