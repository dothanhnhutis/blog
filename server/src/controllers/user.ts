import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  editUserById,
  getUserByEmail,
  getUserById,
  insertUserByAdmin,
} from "@/services/user";
import { BadRequestError, NotFoundError } from "@/error-handler";
import { CreateUserReq, EditUserReq, FilterUserReq } from "@/schema/user";

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

export async function filter(
  req: Request<{}, {}, FilterUserReq["body"]>,
  res: Response
) {
  const input = req.body;
  input.createRange;

  res.status(StatusCodes.OK).json(input);
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
