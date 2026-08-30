import "dotenv/config";

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import workspaceRoutes from "./routes/workspace.routes.js";
import projectRoutes from "./routes/project.routes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { connectRedis } from "./lib/redis.js";
import { connectPrisma } from "./lib/prisma.js";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.json({
        status: "ok",
    });
});

// Public auth routes
app.use("/api/auth", authRoutes);

// Workspace routes
app.use("/api/workspaces", workspaceRoutes);
app.use("/workspaces", workspaceRoutes);

// Project routes
app.use("/api/projects", projectRoutes);
app.use("/projects", projectRoutes);

// Protected test route
app.get(
    "/api/protected",
    authMiddleware,
    (req, res) => {
        res.json({
            message:
                "You accessed a protected route",
            userId: req.userId,
        });
    }
);

async function startServer() {
    try {
        console.log("[startup] Checking dependencies...");
        await Promise.all([
            connectRedis(),
            connectPrisma(),
        ]);

        app.listen(PORT, () => {
            console.log(
                `API running on http://localhost:${PORT}`
            );
            console.log(
                `Health endpoint: /api/health`
            );
        });
    } catch (error) {
        console.error(
            "Failed to start API:",
            error
        );

        process.exit(1);
    }
}

startServer();