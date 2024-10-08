import z from "zod";

const commonPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  images: z.array(z.string()),
  content: z.string(),
  tags: z.array(z.string()),
  categoryId: z.string(),
  status: z.enum(["DRAFT", "DISABLE", "PUBLISH"]),
});

const createBlogSchema = commonPostSchema.extend({
  postFor: z.literal("BLOG"),
  publishAt: z.string().datetime(),
});

const createProductSchema = commonPostSchema.extend({
  postFor: z.literal("PRODUCT"),
  code: z.string(),
  description: z.string(),
  benefits: z.array(z.string()),
  ingredients: z.array(z.string()),
});

export const createPostSchema = z.object({
  body: z.discriminatedUnion("postFor", [
    createBlogSchema.strict(),
    createProductSchema.strict(),
  ]),
});

export type CreatePostReq = z.infer<typeof createPostSchema>;
