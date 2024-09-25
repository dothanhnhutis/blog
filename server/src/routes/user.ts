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
  setupMFASchema,
} from "@/schema/user";
import { rateLimitRecover, rateLimitSendEmail } from "@/middleware/rateLimit";
import { readUserById } from "@/controllers/user";
import checkPermission from "@/middleware/checkPermission";
import { sendVerificationCode } from "@/controllers/auth";
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
    checkPermission(["Admin"]),
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
    "/users/change-email/send",
    authMiddleware(),
    validateResource(sendVerificationEmailSchema),
    sendVerificationEmail
  );

  // GET /users/email/resend
  // POST /users/change-email {email:string; otp?:string}
  // POST /users/change-email/send {email:string}
  router.post(
    "/users/change-email",
    authMiddleware(),
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
