import * as z from "zod";

export const orderByEnum = z.enum(["asc", "desc"]);
export const postForEnum = z.enum(["BLOG", "PRODUCT"]);
