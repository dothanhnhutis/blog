import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mq from "@/utils/rabbit";

export async function health(_: Request, res: Response) {
  await mq.sendTest();
  return res.status(StatusCodes.OK).send("Server health check oker");
}
