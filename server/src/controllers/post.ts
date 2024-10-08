import { BadRequestError } from "@/error-handler";
import { CreatePostReq } from "@/schema/post";
import { getCategoryById } from "@/services/category";
import { getPostBySlug, insertPost } from "@/services/post";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function createPost(
  req: Request<{}, {}, CreatePostReq["body"]>,
  res: Response
) {
  const { id } = req.user!;
  const category = await getCategoryById(req.body.categoryId);
  if (!category) throw new BadRequestError("categoryId not exist");
  const existPost = await getPostBySlug(req.body.postFor, req.body.slug);
  if (existPost) throw new BadRequestError("Slug already exist");
  const post = await insertPost({ ...req.body, createdById: id });
  return res.status(StatusCodes.OK).json({
    message: "create post success.",
    post,
  });
}
