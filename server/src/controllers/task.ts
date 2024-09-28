import { BadRequestError } from "@/error-handler";
import { CreateTaskReq } from "@/schema/task";
import { insertTask } from "@/services/task";
import { getUserByIds } from "@/services/user";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function createTask(
  req: Request<{}, {}, CreateTaskReq["body"]>,
  res: Response
) {
  const { id } = req.user!;

  const users = await getUserByIds(req.body.taskAssignees);

  if (req.body.taskAssignees.length > users.length) {
    const userNotVerify = users.filter((user) => !user.emailVerified);
    if (userNotVerify.length > 0)
      throw new BadRequestError(
        "Tasks cannot be assigned to users with unverified accounts"
      );
    const userNotPermission = users.filter((user) => user.role == "CUSTOMER");
    if (userNotPermission.length > 0)
      throw new BadRequestError(
        "Tasks cannot be assigned to users with the 'CUSTOMER' role"
      );
  }

  const task = await insertTask({
    ...req.body,
    createdById: id,
  });

  // emit socket
  return res.status(StatusCodes.CREATED).json({
    message: "Create task success",
    task,
  });
}

export async function updateTaskById(req: Request<{}, {}, {}>, res: Response) {
  return res.status(StatusCodes.CREATED).json({
    message: "Update task success",
    // task
  });
}

export async function name(params: type) {}
