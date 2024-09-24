import { Application } from "express";
import healthRouter from "@/routes/health";

const BASE_PATH = "/api/v1";

export function appRouter(app: Application) {
  app.use("", healthRouter);
}
