import prisma from "@/utils/db";
import { CreatePostReq } from "@/schema/post";
import { Prisma } from "@prisma/client";

export const postSelectDefault: Prisma.PostSelect = {
  id: true,
  images: true,
  title: true,
  slug: true,
  postFor: true,
  categoryId: true,
  status: true,
  content: true,
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

export async function insertPost(
  input: CreatePostReq["body"] & { createdById: string },
  select?: Prisma.PostSelect
) {
  if (input.postFor == "BLOG") {
    const { tags, publishAt, ...rest } = input;
    return await prisma.post.create({
      data: {
        ...rest,
        tags: {
          create: tags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: {
                  tagFor_tagName: {
                    tagFor: input.postFor,
                    tagName: tag,
                  },
                },
                create: {
                  tagFor: input.postFor,
                  tagName: tag,
                },
              },
            },
          })),
        },
        postMores: {
          create: [
            {
              postMore: {
                create: {
                  key: "publishAt",
                  value: publishAt,
                },
              },
            },
          ],
        },
      },
      select: Prisma.validator<Prisma.PostSelect>()({
        ...postSelectDefault,
        ...select,
      }),
    });
  } else {
    return null;
  }
}

export async function getPostBySlug(
  postFor: CreatePostReq["body"]["postFor"],
  slug: string
) {
  return await prisma.post.findUnique({
    where: {
      slug_postFor: {
        slug,
        postFor,
      },
    },
  });
}
