import express, { type Router } from "express";
import validateResource from "@/middleware/validateResource";
import { createArticleCategory } from "@/controllers/article-category";
import { createArticleCategorySchema } from "@/schema/article-category";
import { authMiddleware } from "@/middleware/requiredAuth";
import checkPermission from "@/middleware/checkPermission";

const router: Router = express.Router();
function healthRouter(): Router {
  router.post(
    "/content/posts/categories",
    authMiddleware(),
    checkPermission(["SUPER_ADMIN", "ADMIN"]),
    validateResource(createArticleCategorySchema),
    createArticleCategory
  );
  return router;
}

export default healthRouter();
