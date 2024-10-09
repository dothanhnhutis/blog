import { CreateArticleCategoryReq } from "@/schema/article-category";
import prisma from "@/utils/db";

export async function insertArticleCategory(
  input: CreateArticleCategoryReq["body"]
) {
  return await prisma.articleContentCategory.create({
    data: input,
  });
}

export async function getArticleCategoryById(id: string) {
  return await prisma.articleContentCategory.findUnique({
    where: {
      id,
    },
  });
}

export async function getArticleCategoryByName(
  categoryName: string,
  categorySlug: string
) {
  return await prisma.articleContentCategory.findUnique({
    where: {
      categoryName_categorySlug: {
        categoryName,
        categorySlug,
      },
    },
  });
}
