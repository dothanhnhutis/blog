import z from "zod";
import { commonContentSchema } from "./common";

const createArticleContentBodySchema = commonContentSchema.extend({
  image: z
    .string({
      invalid_type_error: "image must be string",
      required_error: "image is required",
    })
    .url("invalid url"),
  publishAt: z
    .string({
      invalid_type_error: "publishAt must be string",
      required_error: "publishAt is required",
    })
    .datetime("publishAt invalid datetime"),
});

// const createProductSchema = commonPostSchema.extend({
//   code: z.string(),
//   description: z.string(),
//   benefits: z.array(z.string()),
//   ingredients: z.array(z.string()),
// });

export const createArticleContentSchema = z.object({
  body: createArticleContentBodySchema.strict(),
});

export type CreateArticleContentReq = z.infer<
  typeof createArticleContentSchema
>;
