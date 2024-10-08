import * as z from "zod";
import { postForEnum } from "./common";

export const createCategorySchema = z.object({
  body: z
    .object({
      categoryFor: postForEnum,
      categoryName: z.string(),
      categorySlug: z.string(),
    })
    .strict(),
});

export type CreateCategoryReq = z.infer<typeof createCategorySchema>;
