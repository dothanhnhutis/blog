import { RecoverAccountReq, SendReActivateAccountReq } from "@/schema/auth";
import { SendChangeEmailReq } from "@/schema/user";
import { Request } from "express";
import { rateLimit } from "express-rate-limit";

// export const rateLimitContact = rateLimit({
//   windowMs: 60 * 1000,
//   limit: 2,
//   standardHeaders: "draft-7",
//   legacyHeaders: false,
//   keyGenerator: function (req: Request<{}, {}, CreateContact["body"]>) {
//     return req.body.requestId;
//   },
//   handler: (req, res, next, options) => {
//     return res.status(options.statusCode).json({ message: options.message });
//   },
// });

// export const rateLimitSendOtpSignUp = rateLimit({
//   windowMs: 60000,
//   limit: 1,
//   standardHeaders: "draft-7",
//   legacyHeaders: false,
//   keyGenerator: function (
//     req: Request<{}, {}, SendVerificationCodeReq["body"]>
//   ) {
//     const currentUser = req.user!;
//     return currentUser.id;
//   },
//   handler: (req, res, next, options) => {
//     return res.status(options.statusCode).json({ message: options.message });
//   },
// });

export const rateLimitEmail = rateLimit({
  windowMs: 1 * 60000,
  limit: 1,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: function (req: Request<{}, {}, { email: string }>) {
    return req.body.email;
  },
  handler: (req, res, next, options) => {
    return res.status(options.statusCode).json({ message: options.message });
  },
});

export const rateLimitUserId = rateLimit({
  windowMs: 60000,
  limit: 1,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: function (req: Request) {
    const currentUser = req.user!;
    return currentUser.id;
  },
  handler: (req, res, next, options) => {
    return res.status(options.statusCode).json({ message: options.message });
  },
});
