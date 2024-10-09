import * as z from "zod";

export const orderByEnum = z.enum(["asc", "desc"]);
export const commonContentSchema = z.object({
  title: z.string({
    invalid_type_error: "title must be string",
    required_error: "title is required",
  }),
  slug: z.string({
    invalid_type_error: "slug must be string",
    required_error: "slug is required",
  }),
  content: z.string({
    invalid_type_error: "content must be string",
    required_error: "content is required",
  }),
  tags: z.array(z.string({ invalid_type_error: "tags item must be string" }), {
    invalid_type_error: "tags must be array",
    required_error: "tags is required",
  }),
  categoryId: z.string({
    invalid_type_error: "categoryId must be string",
    required_error: "categoryId is required",
  }),
  status: z.enum(["DRAFT", "DISABLE", "PUBLISH"], {
    invalid_type_error: "status must be 'DRAFT'|'DISABLE'|'PUBLISH'",
    required_error: "status is required",
  }),
});
