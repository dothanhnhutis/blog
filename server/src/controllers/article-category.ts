import { BadRequestError } from "@/error-handler";
import { CreateArticleCategoryReq } from "@/schema/article-category";
import { insertArticleCategory } from "@/services/article-category";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function createArticleCategory(
  req: Request<{}, {}, CreateArticleCategoryReq["body"]>,
  res: Response
) {
  try {
    const category = await insertArticleCategory(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "create article category success", category });
  } catch (error: any) {
    if (error.code == "P2002")
      throw new BadRequestError(`article category name exist.`);
    throw error;
  }
}
