import express, { type Router } from "express";
import validateResource from "@/middleware/validateResource";
import { createProductContentSchema } from "@/schema/product-content";
import { authMiddleware } from "@/middleware/requiredAuth";
import checkPermission from "@/middleware/checkPermission";
import { createProductContent } from "@/controllers/product-content";

const router: Router = express.Router();

function productContentRouter(): Router {
  router.post(
    "/content/products",
    authMiddleware(),
    checkPermission(["SUPER_ADMIN", "ADMIN"]),
    validateResource(createProductContentSchema),
    createProductContent
  );

  return router;
}

export default productContentRouter();
