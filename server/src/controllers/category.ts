import { BadRequestError } from "@/error-handler";
import { CreateCategoryReq } from "@/schema/category";
import { insertCategory } from "@/services/category";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function createCategory(
  req: Request<{}, {}, CreateCategoryReq["body"]>,
  res: Response
) {
  try {
    const category = await insertCategory(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "create category success", category });
  } catch (error: any) {
    if (error.code == "P2002")
      throw new BadRequestError(`category name exist.`);
    throw error;
  }
}
