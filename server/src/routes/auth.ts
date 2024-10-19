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
  signInWithMFA,
} from "@/controllers/auth";
import validateResource from "@/middleware/validateResource";
import {
  recoverAccountSchema,
  resetPasswordSchema,
  sendReActivateAccountSchema,
  signInSchema,
  signInWithMFASchema,
  signupSchema,
} from "@/schema/auth";
import { rateLimitEmail } from "@/middleware/rateLimit";

const router: Router = express.Router();
function authRouter(): Router {
  router.get("/auth/confirm-email/:token", verifyEmail);
  router.get("/auth/session/:token", getSession);
  router.get("/auth/reactivate/:token", reActivateAccount);
  router.get(
    "/auth/:provider(google|facebook)/callback",
    signInWithProviderCallBack
  );
  router.get("/auth/:provider(google|facebook)", signInWithProvider);

  router.post("/auth/signup", validateResource(signupSchema), signUp);
  router.post(
    "/auth/signin/mfa",
    validateResource(signInWithMFASchema),
    signInWithMFA
  );

  router.post("/auth/signin", validateResource(signInSchema), signIn);
  router.post(
    "/auth/recover",
    rateLimitEmail,
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
    rateLimitEmail,
    validateResource(sendReActivateAccountSchema),
    sendReactivateAccount
  );

  return router;
}

export default authRouter();
