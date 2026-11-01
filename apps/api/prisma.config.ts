import path from "node:path";
import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

// Load environment variables from the monorepo root .env or apps/api/.env
dotenv.config({ path: path.resolve(import.meta.dirname, "../../.env") });
dotenv.config({ path: path.resolve(import.meta.dirname, ".env") });
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
