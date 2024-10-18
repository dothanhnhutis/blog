import { RequestHandler as Middleware } from "express";
import { NotAuthorizedError, PermissionError } from "../error-handler";

type TAuthMiddleware = {
  emailVerified: boolean;
};

export const authMiddleware =
  (props?: Partial<TAuthMiddleware>): Middleware =>
  async (req, _, next) => {
    if (!req.sessionData) {
      throw new NotAuthorizedError();
    }
    const newProps: TAuthMiddleware = {
      emailVerified: true,
      ...props,
    };

    if (newProps.emailVerified && !req.sessionData.user.emailVerified) {
      throw new PermissionError("Your email hasn't been verified");
    }

    if (req.sessionData.user.status == "SUSPENDED") {
      throw new PermissionError("Your account has been suspended.");
    }
    if (req.sessionData.user.status == "DISABLED") {
      throw new PermissionError(
        "Your account has been disabled. Please contact your administrator to restore your account"
      );
    }
    return next();
  };
