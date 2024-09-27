import express, { type Router } from "express";
import { authMiddleware } from "@/middleware/requiredAuth";
import checkPermission from "@/middleware/checkPermission";
import { createNewTask } from "@/controllers/task";

const router: Router = express.Router();
function taskRouter(): Router {
  router.post(
    "/tasks",
    authMiddleware({ emailVerified: true }),
    checkPermission(["ADMIN", "MANAGER"]),
    createNewTask
  );
  return router;
}

export default taskRouter();
