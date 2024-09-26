import { RequestHandler as Middleware } from "express";
import { NotAuthorizedError, PermissionError } from "../error-handler";

type TAuthMiddleware = {
  emailVerified: boolean;
};

export const authMiddleware =
  (props?: Partial<TAuthMiddleware>): Middleware =>
  async (req, _, next) => {
    if (!req.user) {
      throw new NotAuthorizedError();
    }

    if (props?.emailVerified && !req.user.emailVerified) {
      throw new PermissionError("Your email hasn't been verified");
    }

    if (req.user.status == "SUSPENDED") {
      throw new PermissionError("Your account has been suspended.");
    }
    if (req.user.status == "DISABLED") {
      throw new PermissionError(
        "Your account has been disabled. Please contact your administrator to restore your account"
      );
    }
    return next();
  };
