import { RequestHandler as Middleware } from "express";
import { NotAuthorizedError, PermissionError } from "../error-handler";

export const authMiddleware =
  (props?: { emailVerified?: boolean | undefined }): Middleware =>
  async (req, _, next) => {
    if (!req.user) {
      throw new NotAuthorizedError();
    }

    if (props?.emailVerified && !req.user.emailVerified) {
      throw new PermissionError("Your email hasn't been verified");
    }

    if (req.user.status == "Suspended") {
      throw new PermissionError("Your account has been suspended.");
    }
    if (req.user.status == "Disabled") {
      throw new PermissionError(
        "Your account has been disabled. Please contact your administrator to restore your account"
      );
    }
    return next();
  };
