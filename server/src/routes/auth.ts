import express, { type Router } from "express";

import {
  getSession,
  reActivateAccount,
  recoverAccount,
  resetPassword,
  sendReactivateAccount,
  signIn,
  signInWithGoogle,
  signInWithGoogleCallBack,
  signOut,
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
  router.get("/auth/google", signInWithGoogle);
  router.get("/auth/google/callback", signInWithGoogleCallBack);
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

  router.delete("/auth/signout", signOut);

  return router;
}

export default authRouter();
