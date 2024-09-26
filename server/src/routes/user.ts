import express, { type Router } from "express";
import {
  changeEmail,
  changePassword,
  connectOauthProvider,
  connectOauthProviderCallback,
  currentUser,
  disableMFAAccount,
  disactivate,
  disconnectOauthProvider,
  editProfile,
  enableMFAAccount,
  readAllSession,
  removeSession,
  sendChangeEmail,
  sendVerifyEmail,
  setupMFA,
} from "@/controllers/current-user";
import { authMiddleware } from "@/middleware/requiredAuth";
import validateResource from "@/middleware/validateResource";
import {
  changeEmailSchema,
  changePasswordSchema,
  disconnectOauthProviderSchema,
  editProfileSchema,
  enableMFASchema,
  sendChangeEmailSchema,
  setupMFASchema,
} from "@/schema/user";
import {
  rateLimitSendChangeEmail,
  rateLimitRecover,
  rateLimitUserId,
} from "@/middleware/rateLimit";
import { readUserById } from "@/controllers/user";
import checkPermission from "@/middleware/checkPermission";
// import { sendVerificationCode } from "@/controllers/auth";
import { sendVerificationEmailSchema } from "@/schema/auth";

const router: Router = express.Router();
function userRouter(): Router {
  router.get(
    "/users/connect/:provider",
    authMiddleware(),
    connectOauthProvider
  );
  router.get(
    "/users/connect/:provider/callback",
    authMiddleware(),
    connectOauthProviderCallback
  );
  router.get(
    "/users/me",
    authMiddleware({ emailVerified: false }),
    currentUser
  );
  router.get("/users/sessions", authMiddleware(), readAllSession);
  router.get(
    "/users/:id",
    authMiddleware(),
    checkPermission(["ADMIN"]),
    readUserById
  );

  router.post("/users/disactivate", authMiddleware(), disactivate);
  router.post(
    "/users/mfa/setup",
    authMiddleware(),
    validateResource(setupMFASchema),
    setupMFA
  );
  router.post(
    "/users/mfa/enable",
    authMiddleware(),
    validateResource(enableMFASchema),
    enableMFAAccount
  );
  router.post("/users/mfa/disable", authMiddleware(), disableMFAAccount);
  router.post(
    "/users/password",
    authMiddleware(),
    validateResource(changePasswordSchema),
    changePassword
  );
  router.post(
    "/users/verify-email/send",
    rateLimitUserId,
    authMiddleware(),
    sendVerifyEmail
  );
  router.post(
    "/users/change-email/send",
    rateLimitSendChangeEmail,
    authMiddleware(),
    validateResource(sendChangeEmailSchema),
    sendChangeEmail
  );
  router.post(
    "/users/change-email/otp",
    authMiddleware({ emailVerified: true }),
    validateResource(changeEmailSchema),
    changeEmail
  );

  router.post(
    "/users/disconnect",
    authMiddleware(),
    validateResource(disconnectOauthProviderSchema),
    disconnectOauthProvider
  );

  router.patch(
    "/users",
    authMiddleware(),
    validateResource(editProfileSchema),
    editProfile
  );

  router.delete("/users/sessions/:sessionId", authMiddleware(), removeSession);

  return router;
}

export default userRouter();
