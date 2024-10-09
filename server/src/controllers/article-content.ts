import { BadRequestError } from "@/error-handler";
import { CreateArticleContentReq } from "@/schema/article-content";
import { getArticleCategoryById } from "@/services/article-category";
import {
  getArticleContentBySlug,
  insertArticleContent,
} from "@/services/article-content";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function createArticleContent(
  req: Request<{}, {}, CreateArticleContentReq["body"]>,
  res: Response
) {
  const { id } = req.user!;
  const category = await getArticleCategoryById(req.body.categoryId);
  if (!category) throw new BadRequestError("article categoryId not exist");
  const existPost = await getArticleContentBySlug(req.body.slug);
  if (existPost) throw new BadRequestError("article slug already exist");
  const post = await insertArticleContent({ ...req.body, createdById: id });
  return res.status(StatusCodes.OK).json({
    message: "create article content success.",
    post,
  });
}
