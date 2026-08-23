import bcrypt from "bcrypt";
import { randomBytes, createHash } from "node:crypto";
import prisma from "../lib/prisma.js";
import redis from "../lib/redis.js";
import { generateAccessToken } from "../lib/jwt.js";

const REFRESH_TOKEN_EXPIRES_IN = Number(
    process.env.REFRESH_TOKEN_EXPIRES_IN || 604800
);

const SALT_ROUNDS = 12;

function hashRefreshToken(token: string): string {
    return createHash("sha256")
        .update(token)
        .digest("hex");
}

function generateRefreshToken(): string {
    return randomBytes(64).toString("hex");
}

export async function registerUser(
    name: string,
    email: string,
    password: string
) {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(
        password,
        SALT_ROUNDS
    );

    const user = await prisma.user.create({
        data: {
            name: name.trim(),
            email: normalizedEmail,
            passwordHash,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });

    return user;
}

export async function loginUser(
    email: string,
    password: string
) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!passwordMatches) {
        throw new Error("Invalid email or password");
    }

    const accessToken = generateAccessToken(user.id);

    const refreshToken = generateRefreshToken();

    const refreshTokenHash =
        hashRefreshToken(refreshToken);

    const redisKey = `auth:refresh:${refreshTokenHash}`;

    await redis.set(
        redisKey,
        user.id,
        {
            EX: REFRESH_TOKEN_EXPIRES_IN,
        }
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        accessToken,
        refreshToken,
    };
}

export async function refreshAccessToken(
    refreshToken: string
) {
    const refreshTokenHash =
        hashRefreshToken(refreshToken);

    const redisKey =
        `auth:refresh:${refreshTokenHash}`;

    const userId = await redis.get(redisKey);

    if (!userId) {
        throw new Error("Invalid or expired refresh token");
    }

    const accessToken =
        generateAccessToken(userId);

    return {
        accessToken,
    };
}

export async function logoutUser(
    refreshToken: string
) {
    const refreshTokenHash =
        hashRefreshToken(refreshToken);

    const redisKey =
        `auth:refresh:${refreshTokenHash}`;

    await redis.del(redisKey);
}