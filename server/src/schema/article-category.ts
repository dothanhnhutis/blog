import * as z from "zod";

export const createArticleCategorySchema = z.object({
  body: z
    .object({
      categoryName: z.string(),
      categorySlug: z.string(),
    })
    .strict(),
});

export type CreateArticleCategoryReq = z.infer<
  typeof createArticleCategorySchema
>;
