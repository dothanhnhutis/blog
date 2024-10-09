import express, { type Router } from "express";
import { createArticleContent } from "@/controllers/article-content";
import validateResource from "@/middleware/validateResource";
import { createArticleContentSchema } from "@/schema/article-content";

const router: Router = express.Router();

function postRouter(): Router {
  router.post(
    "/content/posts",
    validateResource(createArticleContentSchema),
    createArticleContent
  );

  return router;
}

export default postRouter();
