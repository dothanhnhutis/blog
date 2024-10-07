import express, { type Router } from "express";

import {
  getSession,
  reActivateAccount,
  recoverAccount,
  resetPassword,
  sendReactivateAccount,
  signIn,
  signInWithProviderCallBack,
  signInWithProvider,
  signUp,
  verifyEmail,
} from "@/controllers/auth";
import validateResource from "@/middleware/validateResource";
import {
  recoverAccountSchema,
  resetPasswordSchema,
  sendReActivateAccountSchema,
  signinSchema,
  signupSchema,
} from "@/schema/auth";
import {
  rateLimitRecover,
  rateLimitSendReActivateAccount,
} from "@/middleware/rateLimit";

const router: Router = express.Router();
function authRouter(): Router {
  router.get(
    "/auth/:provider(google|facebook)/callback",
    signInWithProviderCallBack
  );
  router.get("/auth/:provider(google|facebook)", signInWithProvider);

  router.get("/auth/confirm-email/:token", verifyEmail);
  router.get("/auth/session/:token", getSession);
  router.get("/auth/reactivate/:token", reActivateAccount);

  router.post("/auth/signup", validateResource(signupSchema), signUp);

  router.post("/auth/signin", validateResource(signinSchema), signIn);
  router.post(
    "/auth/recover",
    rateLimitRecover,
    validateResource(recoverAccountSchema),
    recoverAccount
  );
  router.post(
    "/auth/reset-password/:token",
    validateResource(resetPasswordSchema),
    resetPassword
  );
  router.post(
    "/auth/reactivate",
    rateLimitSendReActivateAccount,
    validateResource(sendReActivateAccountSchema),
    sendReactivateAccount
  );

  return router;
}

export default authRouter();
