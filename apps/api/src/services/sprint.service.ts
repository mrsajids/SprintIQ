import prisma from "../lib/prisma.js";
import { SprintStatus } from "../generated/prisma/client.js";

export interface CreateSprintInput {
    name: string;
    goal?: string | null;
    status?: SprintStatus;
    startDate?: string | Date | null;
    endDate?: string | Date | null;
}

export interface UpdateSprintInput {
    name?: string;
    goal?: string | null;
    status?: SprintStatus;
    startDate?: string | Date | null;
    endDate?: string | Date | null;
}

const VALID_SPRINT_STATUSES: Set<SprintStatus> = new Set([
    SprintStatus.PLANNED,
    SprintStatus.ACTIVE,
    SprintStatus.COMPLETED,
]);

function parseDate(dateVal: string | Date | null | undefined): Date | null | undefined {
    if (dateVal === undefined) return undefined;
    if (dateVal === null) return null;
    const parsed = new Date(dateVal);
    if (isNaN(parsed.getTime())) {
        throw new Error("Invalid date format");
    }
    return parsed;
}

export async function createSprint(
    userId: string,
    projectId: string,
    input: CreateSprintInput
) {
    if (!input.name || typeof input.name !== "string" || !input.name.trim()) {
        throw new Error("Sprint name is required and must not be empty");
    }

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

    let status: SprintStatus = SprintStatus.PLANNED;
    if (input.status !== undefined) {
        if (!VALID_SPRINT_STATUSES.has(input.status)) {
            throw new Error("Invalid sprint status");
        }
        status = input.status;
    }

    const startDate = parseDate(input.startDate);
    const endDate = parseDate(input.endDate);

    if (startDate && endDate && endDate < startDate) {
        throw new Error("End date cannot be earlier than start date");
    }

    const sprint = await prisma.sprint.create({
        data: {
            name: input.name.trim(),
            goal: typeof input.goal === "string" ? input.goal.trim() || null : null,
            status,
            startDate: startDate || null,
            endDate: endDate || null,
            projectId: project.id,
        },
    });

    return sprint;
}

export async function updateSprint(
    userId: string,
    sprintId: string,
    input: UpdateSprintInput
) {
    const sprint = await prisma.sprint.findUnique({
        where: { id: sprintId },
        include: {
            project: {
                select: {
                    id: true,
                    workspaceId: true,
                },
            },
        },
    });

    if (!sprint) {
        throw new Error("Sprint not found");
    }

    const membership = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId,
                workspaceId: sprint.project.workspaceId,
            },
        },
    });

    if (!membership) {
        throw new Error("You are not a member of this workspace");
    }

    const data: {
        name?: string;
        goal?: string | null;
        status?: SprintStatus;
        startDate?: Date | null;
        endDate?: Date | null;
    } = {};

    if (input.name !== undefined) {
        if (typeof input.name !== "string" || !input.name.trim()) {
            throw new Error("Sprint name must not be empty");
        }
        data.name = input.name.trim();
    }

    if (input.goal !== undefined) {
        data.goal =
            input.goal === null
                ? null
                : typeof input.goal === "string"
                ? input.goal.trim() || null
                : null;
    }

    if (input.status !== undefined) {
        if (!VALID_SPRINT_STATUSES.has(input.status)) {
            throw new Error("Invalid sprint status");
        }
        data.status = input.status;
    }

    let parsedStart: Date | null | undefined = undefined;
    let parsedEnd: Date | null | undefined = undefined;

    if (input.startDate !== undefined) {
        parsedStart = parseDate(input.startDate);
        data.startDate = parsedStart;
    }

    if (input.endDate !== undefined) {
        parsedEnd = parseDate(input.endDate);
        data.endDate = parsedEnd;
    }

    const effectiveStart = parsedStart !== undefined ? parsedStart : sprint.startDate;
    const effectiveEnd = parsedEnd !== undefined ? parsedEnd : sprint.endDate;

    if (effectiveStart && effectiveEnd && effectiveEnd < effectiveStart) {
        throw new Error("End date cannot be earlier than start date");
    }

    const updatedSprint = await prisma.sprint.update({
        where: { id: sprintId },
        data,
    });

    return updatedSprint;
}
