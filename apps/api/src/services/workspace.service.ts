import prisma from "../lib/prisma.js";

export async function createWorkspace(userId: string, name: string) {
    const trimmedName = name.trim();

    const workspace = await prisma.$transaction(async (tx) => {
        const newWorkspace = await tx.workspace.create({
            data: {
                name: trimmedName,
            },
        });

        await tx.workspaceMember.create({
            data: {
                workspaceId: newWorkspace.id,
                userId,
                role: "ADMIN",
            },
        });

        return newWorkspace;
    });

    return workspace;
}

export async function getUserWorkspaces(userId: string) {
    const memberships = await prisma.workspaceMember.findMany({
        where: {
            userId,
        },
        include: {
            workspace: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return memberships.map((membership) => ({
        id: membership.workspace.id,
        name: membership.workspace.name,
        role: membership.role,
    }));
}

export async function inviteUserToWorkspace(
    _requesterUserId: string,
    workspaceId: string,
    email: string
) {
    const normalizedEmail = email.trim().toLowerCase();

    const targetUser = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
    });

    if (!targetUser) {
        throw new Error("User not found");
    }

    const existingMember = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId: targetUser.id,
                workspaceId,
            },
        },
    });

    if (existingMember) {
        throw new Error("User is already a member of this workspace");
    }

    const member = await prisma.workspaceMember.create({
        data: {
            userId: targetUser.id,
            workspaceId,
            role: "MEMBER",
        },
        select: {
            id: true,
            userId: true,
            workspaceId: true,
            role: true,
            createdAt: true,
        },
    });

    return member;
}
