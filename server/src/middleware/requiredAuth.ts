import { RequestHandler as Middleware } from "express";
import { NotAuthorizedError, PermissionError } from "../error-handler";

type TAuthMiddleware = {
  emailVerified: boolean;
  mfa: boolean;
};

export const authMiddleware =
  (props?: Partial<TAuthMiddleware>): Middleware =>
  async (req, _, next) => {
    if (!req.user) {
      throw new NotAuthorizedError();
    }
    const newProps: TAuthMiddleware = {
      emailVerified: true,
      mfa: true,
      ...props,
    };

    if (newProps.emailVerified && !req.user.emailVerified) {
      throw new PermissionError("Your email hasn't been verified");
    }
    if (newProps.mfa && !req.sessionData?.mfa) {
      throw new PermissionError("Permission denied (MFA)");
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
