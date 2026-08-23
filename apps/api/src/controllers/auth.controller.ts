import { Request, Response } from "express";

import {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
} from "../services/auth.service.js";

export async function register(
    req: Request,
    res: Response
) {
    try {
        const {
            name,
            email,
            password,
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message:
                    "Name, email and password are required",
            });
        }

        const user = await registerUser(
            name,
            email,
            password
        );

        return res.status(201).json({
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "User already exists"
        ) {
            return res.status(409).json({
                message: error.message,
            });
        }

        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function login(
    req: Request,
    res: Response
) {
    try {
        const {
            email,
            password,
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email and password are required",
            });
        }

        const result = await loginUser(
            email,
            password
        );

        return res.status(200).json(result);
    } catch (error) {
        if (
            error instanceof Error &&
            error.message ===
                "Invalid email or password"
        ) {
            return res.status(401).json({
                message: error.message,
            });
        }

        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function refresh(
    req: Request,
    res: Response
) {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                message: "Refresh token is required",
            });
        }

        const result =
            await refreshAccessToken(refreshToken);

        return res.status(200).json(result);
    } catch (error) {
        if (
            error instanceof Error &&
            error.message ===
                "Invalid or expired refresh token"
        ) {
            return res.status(401).json({
                message: error.message,
            });
        }

        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function logout(
    req: Request,
    res: Response
) {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                message: "Refresh token is required",
            });
        }

        await logoutUser(refreshToken);

        return res.status(200).json({
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}