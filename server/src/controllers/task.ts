import { BadRequestError, NotFoundError } from "@/error-handler";
import {
  CreateTaskReq,
  ReviewSubTaskReq,
  SubmitSubTaskReq,
  UpdateTaskReq,
} from "@/schema/task";
import { User } from "@/schema/user";
import {
  getTaskById,
  getTaskBySubTaskId,
  insertTask,
  reviewSubTask,
  submitSubtask,
} from "@/services/task";
import { getUserByIds } from "@/services/user";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function createTask(
  req: Request<{}, {}, CreateTaskReq["body"]>,
  res: Response
) {
  const { id } = req.user!;

  const { subTaskSwitch, ...body } = req.body;
  const users = await getUserByIds(body.taskAssignees);
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

  const task = await insertTask({
    ...body,
    createdById: id,
    subTasks: subTaskSwitch.enableSubTask
      ? subTaskSwitch.subTasks
      : [subTaskSwitch.subTask],
  });

  // emit socket
  return res.status(StatusCodes.CREATED).json({
    message: "Create task success",
    task,
  });
}

export async function updateTaskById(
  req: Request<UpdateTaskReq["params"], {}, UpdateTaskReq["body"]>,
  res: Response
) {
  const { taskId } = req.params;
  const task = await getTaskById(taskId);
  if (!task) throw new BadRequestError("invalid taskId");

  return res.status(StatusCodes.CREATED).json({
    message: "Update task success",
    // task
  });
}

export async function submitTask(
  req: Request<SubmitSubTaskReq["params"], {}, SubmitSubTaskReq["body"]>,
  res: Response
) {
  const { id } = req.user!;
  const { subTaskId } = req.params;
  const { attachments } = req.body;

  const task = await getTaskBySubTaskId(subTaskId);
  if (!task) throw new NotFoundError();

  if (task.taskAssignees.find((user) => user.userId == id))
    throw new BadRequestError("You have not been assigned this task");

  // if (
  //   task.subTasks.find((subTask) => subTask.id == subTaskId)!.status !=
  //   "ACCEPTED"
  // )
  //   throw new BadRequestError("Task has been completed");

  const subTask = task.subTasks.find((subTask) => subTask.id == subTaskId)!;
  if (subTask.enableAttachment == false && attachments.length > 0) {
    throw new BadRequestError("Unable to attach attachments to the task.");
  }

  await submitSubtask(subTaskId, req.body);

  return res.status(StatusCodes.CREATED).json({
    message: "Submit task success",
  });
}

export async function reviewTask(
  req: Request<ReviewSubTaskReq["params"], {}, ReviewSubTaskReq["body"]>,
  res: Response
) {
  const { id, role } = req.user!;
  const { subTaskId } = req.params;
  const { status } = req.body;

  const task = await getTaskBySubTaskId(subTaskId);
  if (!task) throw new NotFoundError();

  const rolesAccess: User["role"][] = ["ADMIN", "MANAGER"];
  if (!rolesAccess.includes(role) && task.createdById != id)
    throw new BadRequestError("You have not been assigned this task");

  // if (
  //   task.subTasks.find((subTask) => subTask.id == subTaskId)!.status ==
  //   "ASSIGNED"
  // )
  //   throw new BadRequestError(
  //     "The task assignees have not completed the task."
  //   );

  await reviewSubTask(subTaskId, status);

  return res.status(StatusCodes.CREATED).json({
    message: "Review task success",
  });
}
