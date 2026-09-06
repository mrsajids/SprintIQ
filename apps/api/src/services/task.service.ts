import prisma from "../lib/prisma.js";
import { TaskStatus } from "../generated/prisma/client.js";

export interface CreateTaskInput {
    title: string;
    description?: string | null;
}

export interface UpdateTaskInput {
    title?: string;
    description?: string | null;
    status?: TaskStatus;
    sprintId?: string | null;
}

const VALID_STATUSES: Set<TaskStatus> = new Set([
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_REVIEW,
    TaskStatus.DONE,
]);

export async function createTask(
    userId: string,
    projectId: string,
    input: CreateTaskInput
) {
    const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { id: true, workspaceId: true },
    });

    if (!project) {
        throw new Error("Project not found");
    }

    const membership = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId,
                workspaceId: project.workspaceId,
            },
        },
    });

    if (!membership) {
        throw new Error("You are not a member of this workspace");
    }

    const task = await prisma.task.create({
        data: {
            title: input.title.trim(),
            description: input.description?.trim() || null,
            status: TaskStatus.TODO,
            projectId: project.id,
            createdById: userId,
        },
    });

    return task;
}

export async function getProjectBoard(userId: string, projectId: string) {
    const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { id: true, workspaceId: true },
    });

    if (!project) {
        throw new Error("Project not found");
    }

    const membership = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId,
                workspaceId: project.workspaceId,
            },
        },
    });

    if (!membership) {
        throw new Error("You are not a member of this workspace");
    }

    const tasks = await prisma.task.findMany({
        where: {
            projectId: project.id,
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    const board: Record<TaskStatus, typeof tasks> = {
        [TaskStatus.TODO]: [],
        [TaskStatus.IN_PROGRESS]: [],
        [TaskStatus.IN_REVIEW]: [],
        [TaskStatus.DONE]: [],
    };

    for (const task of tasks) {
        if (board[task.status]) {
            board[task.status].push(task);
        }
    }

    return board;
}

export async function updateTask(
    userId: string,
    taskId: string,
    input: UpdateTaskInput
) {
    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: {
            project: {
                select: {
                    id: true,
                    workspaceId: true,
                },
            },
        },
    });

    if (!task) {
        throw new Error("Task not found");
    }

    const membership = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId,
                workspaceId: task.project.workspaceId,
            },
        },
    });

    if (!membership) {
        throw new Error("You are not a member of this workspace");
    }

    const data: {
        title?: string;
        description?: string | null;
        status?: TaskStatus;
        sprintId?: string | null;
    } = {};

    if (input.title !== undefined) {
        if (typeof input.title !== "string" || !input.title.trim()) {
            throw new Error("Title must not be empty");
        }
        data.title = input.title.trim();
    }

    if (input.description !== undefined) {
        data.description =
            input.description === null
                ? null
                : typeof input.description === "string"
                ? input.description.trim() || null
                : null;
    }

    if (input.status !== undefined) {
        if (!VALID_STATUSES.has(input.status)) {
            throw new Error("Invalid task status");
        }
        data.status = input.status;
    }

    if (input.sprintId !== undefined) {
        if (input.sprintId === null) {
            data.sprintId = null;
        } else if (typeof input.sprintId === "string") {
            const sprintIdTrimmed = input.sprintId.trim();
            if (!sprintIdTrimmed) {
                data.sprintId = null;
            } else {
                const sprint = await prisma.sprint.findUnique({
                    where: { id: sprintIdTrimmed },
                    select: { id: true, projectId: true },
                });

                if (!sprint) {
                    throw new Error("Sprint not found");
                }

                if (sprint.projectId !== task.project.id) {
                    throw new Error("Sprint does not belong to the same project as the task");
                }

                data.sprintId = sprint.id;
            }
        } else {
            throw new Error("Invalid sprint ID format");
        }
    }

    const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data,
    });

    return updatedTask;
}
