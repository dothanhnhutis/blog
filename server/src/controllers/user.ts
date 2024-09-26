import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  editUserById,
  getUserByEmail,
  getUserById,
  insertUserWithPassword,
} from "@/services/user";
import { BadRequestError, NotFoundError } from "@/error-handler";

// export async function createUser(
//   req: Request<{}, {}, CreateUserReq["body"]>,
//   res: Response
// ) {
//   const { email } = req.body;
//   const user = await getUserByEmail(email);
//   if (user) throw new BadRequestError("Email has been used");
//   await insertUserWithPassword(req.body);
//   return res.status(StatusCodes.OK).json({
//     message: "create new user success",
//   });
// }

export async function readUserById(
  req: Request<{ id: string }>,
  res: Response
) {
  const user = await getUserById(req.params.id);
  if (!user) throw new NotFoundError();
  const { password, ...props } = user;
  res.status(StatusCodes.OK).json({ ...props, hasPassword: !!password });
}

// export async function updateUserById(
//   req: Request<EditUserReq["params"], {}, EditUserReq["body"]>,
//   res: Response
// ) {
//   const { userId } = req.params;
//   const data = req.body;
//   const userExist = await getUserById(userId);
//   if (!userExist) throw new BadRequestError("Invalid user id");
//   await editUserById(userId, data);
//   res.status(StatusCodes.OK).json({
//     message: "Update user success",
//   });
// }
