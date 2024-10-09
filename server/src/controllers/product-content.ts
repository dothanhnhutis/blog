import { BadRequestError } from "@/error-handler";
import { CreateProductContentReq } from "@/schema/product-content";
import { getProductCategoryById } from "@/services/product-category";
import {
  getProductBySlug,
  insertProductContent,
} from "@/services/product-content";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function createProductContent(
  req: Request<{}, {}, CreateProductContentReq["body"]>,
  res: Response
) {
  const { id } = req.user!;
  const { categoryId, slug } = req.body;
  const category = await getProductCategoryById(categoryId);
  if (!category) throw new BadRequestError("invalid product categoryId");
  const existSlug = await getProductBySlug(slug);
  if (existSlug) throw new BadRequestError("product slug already exist");
  const productContent = await insertProductContent({
    ...req.body,
    createdById: id,
  });
  return res
    .status(StatusCodes.OK)
    .json({ message: "create product content success", productContent });
}
