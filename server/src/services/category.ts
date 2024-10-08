import { CreateCategoryReq } from "@/schema/category";
import prisma from "@/utils/db";

export async function insertCategory(input: CreateCategoryReq["body"]) {
  return await prisma.postCategory.create({
    data: input,
  });
}

export async function getCategoryById(id: string) {
  return await prisma.postCategory.findUnique({
    where: {
      id,
    },
  });
}

export async function getCategoryByName(
  categoryFor: CreateCategoryReq["body"]["categoryFor"],
  categoryName: string
) {
  return await prisma.postCategory.findUnique({
    where: {
      categoryFor_categoryName: {
        categoryFor,
        categoryName,
      },
    },
  });
}
