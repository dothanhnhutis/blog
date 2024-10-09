import prisma from "@/utils/db";
import { CreateArticleContentReq } from "@/schema/article-content";
import { Prisma } from "@prisma/client";

export const postSelectDefault: Prisma.ArticleContentSelect = {
  id: true,
  image: true,
  title: true,
  slug: true,
  categoryId: true,
  status: true,
  content: true,
  publishAt: true,
  category: {
    select: {
      categoryName: true,
      id: true,
    },
  },
  tags: {
    select: {
      tagName: true,
    },
  },
  createdBy: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      picture: true,
    },
  },
  createdAt: true,
  updatedAt: true,
};

export async function insertArticleContent(
  input: CreateArticleContentReq["body"] & { createdById: string },
  select?: Prisma.ArticleContentSelect
) {
  const { tags, ...rest } = input;
  return await prisma.articleContent.create({
    data: {
      ...rest,
      tags: {
        create: tags.map((tagName) => ({
          tag: {
            connectOrCreate: {
              where: {
                tagName,
              },
              create: {
                tagName,
              },
            },
          },
        })),
      },
    },
    select: Prisma.validator<Prisma.ArticleContentSelect>()({
      ...postSelectDefault,
      ...select,
    }),
  });
}

export async function getArticleContentBySlug(slug: string) {
  return await prisma.articleContent.findUnique({
    where: {
      slug,
    },
  });
}
