import z from "zod";
import { commonContentSchema } from "./common";

const createProductSchema = commonContentSchema.extend({
  images: z.array(
    z
      .string({ invalid_type_error: "image[?] must be string" })
      .url("image[?] invalid url"),
    {
      invalid_type_error: "images must be string",
      required_error: "images is required",
    }
  ),
  code: z.string({
    invalid_type_error: "code must be string",
    required_error: "code is required",
  }),
  description: z.string({
    invalid_type_error: "description must be string",
    required_error: "description is required",
  }),
  benefits: z.array(
    z.string({ invalid_type_error: "benefit item must be string" }),
    {
      invalid_type_error: "benefits must be array",
      required_error: "benefits is required",
    }
  ),
  ingredients: z.array(
    z.string({ invalid_type_error: "ingredient item must be string" }),
    {
      invalid_type_error: "ingredients must be array",
      required_error: "ingredients is required",
    }
  ),
});

export const createProductContentSchema = z.object({
  body: createProductSchema.strict(),
});

export type CreateProductContentReq = z.infer<
  typeof createProductContentSchema
>;
