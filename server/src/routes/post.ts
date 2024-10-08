import express, { type Router } from "express";
import { createPost } from "@/controllers/post";
import validateResource from "@/middleware/validateResource";
import { createPostSchema } from "@/schema/post";

const router: Router = express.Router();

function postRouter(): Router {
  router.post("/posts", validateResource(createPostSchema), createPost);

  return router;
}

export default postRouter();
