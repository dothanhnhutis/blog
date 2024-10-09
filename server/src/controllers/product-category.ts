import { BadRequestError } from "@/error-handler";
import { createProductCategoryReq } from "@/schema/product-category";
import { insertProductCategory } from "@/services/product-category";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function createproductCategory(
  req: Request<{}, {}, createProductCategoryReq["body"]>,
  res: Response
) {
  try {
    const category = await insertProductCategory(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "create product category success", category });
  } catch (error: any) {
    if (error.code == "P2002")
      throw new BadRequestError(`product category name exist.`);
    throw error;
  }
}
