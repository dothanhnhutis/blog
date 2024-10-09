import express, { type Router } from "express";
import validateResource from "@/middleware/validateResource";
import { authMiddleware } from "@/middleware/requiredAuth";
import checkPermission from "@/middleware/checkPermission";
import { createProductCategorySchema } from "@/schema/product-category";
import { createproductCategory } from "@/controllers/product-category";

const router: Router = express.Router();
function productCategoryRouter(): Router {
  router.post(
    "/content/products/categories",
    authMiddleware(),
    checkPermission(["SUPER_ADMIN", "ADMIN"]),
    validateResource(createProductCategorySchema),
    createproductCategory
  );
  return router;
}

export default productCategoryRouter();
