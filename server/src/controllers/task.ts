import { createTask } from "@/services/task";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function createNewTask(req: Request, res: Response) {
  await createTask();
  return res.status(StatusCodes.CREATED).json({
    message: "create new task success",
  });
}
