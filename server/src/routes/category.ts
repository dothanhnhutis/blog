import express, { type Router } from "express";
import { health } from "@/controllers/health";
import validateResource from "@/middleware/validateResource";
import { createCategory } from "@/controllers/category";
import { createCategorySchema } from "@/schema/category";
import { authMiddleware } from "@/middleware/requiredAuth";
import checkPermission from "@/middleware/checkPermission";

const router: Router = express.Router();
function healthRouter(): Router {
  router.post(
    "/categories",
    authMiddleware(),
    checkPermission(["SUPER_ADMIN", "ADMIN"]),
    validateResource(createCategorySchema),
    createCategory
  );
  return router;
}

export default healthRouter();
