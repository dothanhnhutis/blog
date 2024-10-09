import * as z from "zod";

export const createProductCategorySchema = z.object({
  body: z
    .object({
      categoryName: z.string(),
      categorySlug: z.string(),
    })
    .strict(),
});

export type createProductCategoryReq = z.infer<
  typeof createProductCategorySchema
>;
