import express, { query, type Router } from "express";
import {
  changeEmail,
  changePassword,
  currentUser,
  disableMFAAccount,
  disactivate,
  connectOauthProvider,
  connectOauthProviderCallback,
  disconnectOauthProvider,
  enableMFAAccount,
  readAllSession,
  removeSession,
  sendChangeEmail,
  sendVerifyEmail,
  setupMFA,
  signOut,
  editProfile,
} from "@/controllers/current-user";
import { authMiddleware } from "@/middleware/requiredAuth";
import validateResource from "@/middleware/validateResource";
import {
  changeEmailSchema,
  changePasswordSchema,
  editUserSchema,
  enableMFASchema,
  filterUserSchema,
  sendChangeEmailSchema,
  setupMFASchema,
} from "@/schema/user";
import {
  rateLimitSendChangeEmail,
  rateLimitUserId,
} from "@/middleware/rateLimit";
import {
  createUser,
  readUserById,
  updateUserById,
  filterUser,
} from "@/controllers/user";
import checkPermission from "@/middleware/checkPermission";

const router: Router = express.Router();
function userRouter(): Router {
  router.get(
    "/users/_search",
    authMiddleware(),
    validateResource(filterUserSchema),
    filterUser
  );
  router.get(
    "/users/connect/:provider(google|facebook)",
    authMiddleware(),
    connectOauthProvider
  );
  router.get(
    "/users/connect/:provider(google|facebook)/callback",
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
    "/users/:userId",
    authMiddleware(),
    checkPermission(["SUPER_ADMIN", "ADMIN"]),
    readUserById
  );

  router.post(
    "/users",
    authMiddleware(),
    validateResource(setupMFASchema),
    checkPermission(["SUPER_ADMIN", "ADMIN"]),
    createUser
  );
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

  router.patch(
    "/users/password",
    authMiddleware(),
    validateResource(changePasswordSchema),
    changePassword
  );
  router.patch(
    "/users/change-email/otp",
    authMiddleware(),
    validateResource(changeEmailSchema),
    changeEmail
  );
  router.put(
    "/users/:userId",
    authMiddleware(),
    checkPermission(["SUPER_ADMIN", "ADMIN"]),
    validateResource(editUserSchema),
    updateUserById
  );

  router.put(
    "/users",
    authMiddleware(),
    validateResource(editUserSchema),
    editProfile
  );

  router.delete(
    "/users/disconnect/:provider(google|facebook)",
    authMiddleware(),
    disconnectOauthProvider
  );
  router.delete("/users/mfa/disable", authMiddleware(), disableMFAAccount);
  router.delete("/users/disactivate", authMiddleware(), disactivate);
  router.delete("/users/sessions/:sessionId", authMiddleware(), removeSession);
  router.delete("/users/signout", signOut);

  return router;
}

export default userRouter();
