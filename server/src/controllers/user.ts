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
  filterUserQuerySchema,
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

export async function filterUser(
  req: Request<{}, {}, FilterUserReq["body"], FilterUserReq["query"]>,
  res: Response
) {
  const input = {
    ...req.query,
    ...req.body,
  };
  let { limit, page, order_by, ...where } = input;

  const idsKeyMap = new Map();

  if (order_by) {
    order_by = order_by.reduce<object[]>((prev, curr, index, arr) => {
      const key = Object.keys(curr)[0];
      if (idsKeyMap.has(key)) {
        prev[idsKeyMap.get(key)] = curr;
      } else {
        prev = [...prev, curr];
        idsKeyMap.set(key, index);
      }
      return prev;
    }, []) as typeof order_by;
  }

  const users = await searchUser({
    where,
    orderBy: order_by,
    limit,
    page,
  });

  return res.status(StatusCodes.OK).json({
    where,
    orderBy: order_by,
    limit,
    page,
  });
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
