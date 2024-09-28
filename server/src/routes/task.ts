import express, { type Router } from "express";
import { createTask } from "@/controllers/task";
import { authMiddleware } from "@/middleware/requiredAuth";
import validateResource from "@/middleware/validateResource";
import checkPermission from "@/middleware/checkPermission";
import { createTaskSchema } from "@/schema/task";

const router: Router = express.Router();
function taskRouter(): Router {
  router.post(
    "/tasks",
    authMiddleware({ emailVerified: true }),
    checkPermission(["MANAGER", "ADMIN"]),
    validateResource(createTaskSchema),
    createTask
  );
  return router;
}

export default taskRouter();
