import { createProductCategoryReq } from "@/schema/product-category";
import prisma from "@/utils/db";

export async function insertProductCategory(
  input: createProductCategoryReq["body"]
) {
  return await prisma.productContentCategory.create({
    data: input,
  });
}

export async function getProductCategoryById(id: string) {
  return await prisma.productContentCategory.findUnique({
    where: {
      id,
    },
  });
}

export async function getProductCategoryByName(
  categoryName: string,
  categorySlug: string
) {
  return await prisma.productContentCategory.findUnique({
    where: {
      categoryName_categorySlug: {
        categoryName,
        categorySlug,
      },
    },
  });
}
