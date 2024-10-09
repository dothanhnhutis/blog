import { type Application } from "express";
import healthRouter from "@/routes/health";
import authRouter from "@/routes/auth";
import userRouter from "@/routes/user";
import articleContentRouter from "@/routes/article-content";
import articleCategoryRouter from "@/routes/article-category";
import productContentRouter from "@/routes/product-content";
import productCategoryRouter from "@/routes/product-category";
const BASE_PATH = "/api/v1";

export function appRoutes(app: Application) {
  app.use("", healthRouter);
  app.use(BASE_PATH, authRouter);
  app.use(BASE_PATH, userRouter);
  app.use(BASE_PATH, articleCategoryRouter);
  app.use(BASE_PATH, articleContentRouter);
  app.use(BASE_PATH, productCategoryRouter);
  app.use(BASE_PATH, productContentRouter);
}
