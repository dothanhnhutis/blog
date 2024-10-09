import { CreateProductContentReq } from "@/schema/product-content";
import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";

export const productSelectDefault: Prisma.ProductContentSelect = {
  id: true,
  images: true,
  title: true,
  slug: true,
  categoryId: true,
  status: true,
  content: true,
  benefits: true,
  description: true,
  ingredients: true,
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

export async function insertProductContent(
  input: CreateProductContentReq["body"] & { createdById: string },
  select?: Prisma.ProductContentSelect
) {
  const { tags, ...rest } = input;
  return await prisma.productContent.create({
    data: {
      ...rest,
      tags: {
        create: tags.map((tag) => ({
          tag: {
            connectOrCreate: {
              where: {
                tagName: tag,
              },
              create: {
                tagName: tag,
              },
            },
          },
        })),
      },
    },
    select: Prisma.validator<Prisma.ProductContentSelect>()({
      ...productSelectDefault,
      ...select,
    }),
  });
}

export async function getProductBySlug(slug: string) {
  return await prisma.productContent.findUnique({
    where: {
      slug,
    },
  });
}
