import express from "express";
import cors from "cors";
import type {
    Task,
    CreateTaskRequest
} from "@sprintiq/shared-types";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

const tasks: Task[] = [
    {
        id: "1",
        title: "Learn React",
        completed: false,
        createdAt: new Date().toISOString()
    },
    {
        id: "2",
        title: "Build SprintIQ API",
        completed: false,
        createdAt: new Date().toISOString()
    }
];

app.get("/api/health", (_req, res) => {
    res.json({
        status: "ok"
    });
});

// Health check without prefix for simple uptime checks
app.get("/health", (_req, res) => {
    res.json({
        status: "ok"
    });
});

app.get("/api/tasks", (_req, res) => {
    res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
    const body = req.body as CreateTaskRequest;

    if (!body.title || typeof body.title !== "string") {
        res.status(400).json({
            message: "Title is required"
        });

        return;
    }

    const task: Task = {
        id: crypto.randomUUID(),
        title: body.title,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(task);

    res.status(201).json(task);
});

app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
    console.log(`Health endpoints: /health and /api/health`);
});