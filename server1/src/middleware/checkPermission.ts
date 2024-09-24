import { RequestHandler as Middleware } from "express";
import { PermissionError } from "../error-handler";
import { User } from "@/schema/user";

const checkPermission =
  (roles: User["role"][]): Middleware =>
  async (req, _, next) => {
    if (!req.user || !roles.includes(req.user.role))
      throw new PermissionError();
    return next();
  };
export default checkPermission;
