import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  editUserById,
  getUserByEmail,
  getUserById,
  insertUserByAdmin,
  searchUser,
} from "@/services/user";
import { BadRequestError, NotFoundError } from "@/error-handler";
import {
  CreateUserReq,
  EditUserReq,
  FilterUserReq,
  filterUserSchema,
} from "@/schema/user";
import { z } from "zod";

export async function createUser(
  req: Request<{}, {}, CreateUserReq["body"]>,
  res: Response
) {
  const { email } = req.body;
  const user = await getUserByEmail(email);
  if (user) throw new BadRequestError("Email has been used");
  await insertUserByAdmin(req.body);
  return res.status(StatusCodes.OK).json({
    message: "Create user success",
  });
}

export async function readUserById(
  req: Request<{ userId: string }>,
  res: Response
) {
  const user = await getUserById(req.params.userId);
  if (!user) throw new NotFoundError();
  const { password, ...rest } = user;
  res.status(StatusCodes.OK).json(rest);
}

const filterUserQuery = z
  .object({
    id: z
      .union([z.string(), z.array(z.string())])
      .transform((val) => (typeof val == "string" ? [val] : val)),
    email: z
      .union([z.string(), z.array(z.string())])
      .transform(
        (val) =>
          z
            .array(z.string().email())
            .safeParse(typeof val == "string" ? [val] : val).data
      ),
    email_verified: z
      .union([z.string(), z.array(z.string())])
      .transform(
        (val) =>
          z
            .enum(["0", "1", "true", "false"])
            .safeParse(typeof val == "string" ? val : val.pop()).data
      ),
    full_name: z
      .union([z.string(), z.array(z.string())])
      .transform((val) => (typeof val == "string" ? val : val.pop())),
    role: z
      .union([z.string(), z.array(z.string())])
      .transform(
        (val) =>
          z
            .array(z.enum(["ADMIN", "BUSINESS_PARTNER", "CUSTOMER"]))
            .safeParse(typeof val == "string" ? [val] : val).data
      ),
    status: z
      .union([z.string(), z.array(z.string())])
      .transform(
        (val) =>
          z
            .array(z.enum(["ACTIVE", "SUSPENDED", "DISABLED"]))
            .safeParse(typeof val == "string" ? [val] : val).data
      ),
    created_from: z.union([z.string(), z.array(z.string())]).transform(
      (val) =>
        z
          .string()
          .datetime()
          .safeParse(typeof val == "string" ? val : val.pop()).data
    ),
    created_to: z.union([z.string(), z.array(z.string())]).transform(
      (val) =>
        z
          .string()
          .datetime()
          .safeParse(typeof val == "string" ? val : val.pop()).data
    ),
    order_by: z
      .union([z.string(), z.array(z.string())])
      .transform((val) => (typeof val == "string" ? val : val.pop())),
    limit: z.union([z.string(), z.array(z.string())]).transform(
      (val) =>
        z
          .string()
          .regex(/^\d+$/)
          .safeParse(typeof val == "string" ? val : val.pop()).data
    ),
    page: z.union([z.string(), z.array(z.string())]).transform(
      (val) =>
        z
          .string()
          .regex(/^\d+$/)
          .safeParse(typeof val == "string" ? val : val.pop()).data
    ),
  })
  .strip()
  .partial()
  .transform((val) => {
    const result: any = {};
    if (val.id && val.id.length > 0) {
      result.ids = val.id;
    }
    if (val.email && val.email.length > 0) {
      result.emails = val.email;
    }
    if (val.email_verified) {
      result.emailVerified =
        val.email_verified == "1" || val.email_verified == "true";
    }
    if (val.full_name) {
      result.fullName = val.full_name;
    }
    if (val.status) {
      result.statuses = val.status;
    }
    if (val.role) {
      result.roles = val.role;
    }
    if (
      val.created_from &&
      val.created_to &&
      new Date(val.created_from) <= new Date(val.created_to)
    ) {
      result.created_range = [val.created_from, val.created_to];
    }

    if (val.limit) {
      result.limit = val.limit;
    }

    console.log(result);
    return result;
  })
  .pipe(filterUserSchema.shape.body);

export async function filterUser(req: Request, res: Response) {
  // console.log(req.body);
  // console.log(req.query);

  const { success, data } = filterUserQuery.safeParse(req.query);
  if (success) {
    return res.status(StatusCodes.OK).json(data);
  } else {
    return res.status(StatusCodes.OK).send(success);
  }

  // const { limit, page, order_by, ...where } = req.body;

  // const users = await searchUser({
  //   where,
  //   orderBy: order_by,
  //   limit,
  //   page,
  // });
}

export async function updateUserById(
  req: Request<EditUserReq["params"], {}, EditUserReq["body"]>,
  res: Response
) {
  const { firstName, lastName } = req.user!;
  const { userId } = req.params;
  const data = req.body;
  const userExist = await getUserById(userId);
  if (!userExist) throw new BadRequestError("Invalid user id");

  if (data.email) {
    const existEmail = await getUserByEmail(data.email);
    if (existEmail) throw new BadRequestError("Email already exists");
  }

  await editUserById(userId, {
    firstName,
    lastName,
    ...data,
  });

  res.status(StatusCodes.OK).json({
    message: "Update user success",
  });
}
