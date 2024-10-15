import configs from "@/configs";
import { BadRequestError, NotFoundError } from "@/error-handler";
import { getDataCache, setDataInSecondCache } from "@/redis/cache";
import { createSession } from "@/redis/session";
import {
  RecoverAccountReq,
  ResetPasswordReq,
  SendReActivateAccountReq,
  SendVerificationEmailReq,
  SignInReq,
  signInWithProviderCallbackSchema,
  SignUpReq,
} from "@/schema/auth";
import { updateBackupCodeUsedById } from "@/services/mfa";
import {
  editUserById,
  getUserByEmail,
  getUserByProvider,
  getUserByToken,
  insertUserWithPassword,
  insertUserWithProvider,
} from "@/services/user";
import {
  compareData,
  encrypt,
  generateOTP,
  hashData,
  randId,
} from "@/utils/helper";
import { signJWT, verifyJWT } from "@/utils/jwt";
import { validateMFA } from "@/utils/mfa";
import { emaiEnum, sendMail } from "@/utils/nodemailer";
import { generateUrlOauth2, getUserProfile } from "@/utils/oauth";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function sendVerificationEmail(
  req: Request<{}, {}, SendVerificationEmailReq["body"]>,
  res: Response
) {
  const { emailVerified } = req.user!;
  const { email } = req.body;
  const user = await getUserByEmail(email);
  if (user) throw new BadRequestError("email already exists");

  if (emailVerified) {
    const otp = generateOTP();
    setDataInSecondCache(`otp:${email}`, `${hashData(otp)}`, 5 * 60 * 60);

    await sendMail({
      template: emaiEnum.OTP_VERIFY_ACCOUNT,
      receiver: email,
      locals: {
        otp,
      },
    });

    return res.status(StatusCodes.CREATED).send({
      message: "The verification code has been sent to your email",
    });
  } else {
  }
}

export async function signUp(
  req: Request<{}, {}, SignUpReq["body"]>,
  res: Response
) {
  const { email } = req.body;
  const user = await getUserByEmail(email);
  if (user) throw new BadRequestError("User already exists");
  await insertUserWithPassword(req.body);
  return res.status(StatusCodes.CREATED).send({
    message:
      "Sign up success. A confirmation email will be sent to your email address.",
  });
}

export async function verifyEmail(
  req: Request<{ token: string }>,
  res: Response
) {
  const { token } = req.params;

  const data = verifyJWT<{
    type: "emailVerification" | "recoverAccount" | "reActivate";
    session: string;
  }>(token, configs.JWT_SECRET);

  if (!data) throw new NotFoundError();

  const user = await getUserByToken(data.type, data.session);
  if (!user) throw new NotFoundError();

  await editUserById(user.id, {
    emailVerified: true,
    emailVerificationToken: null,
    emailVerificationExpires: new Date(),
  });

  return res.status(StatusCodes.OK).json({
    message: "verify email success",
  });
}

export async function recoverAccount(
  req: Request<{}, {}, RecoverAccountReq["body"]>,
  res: Response
) {
  const { email } = req.body;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) throw new BadRequestError("Invalid email");

  let randomCharacters = existingUser.passwordResetToken;
  let date = existingUser.passwordResetExpires;

  if (!randomCharacters || !date || date.getTime() < Date.now()) {
    randomCharacters = await randId();
    date = new Date(Date.now() + 4 * 60 * 60000);
    await editUserById(existingUser.id, {
      passwordResetToken: randomCharacters,
      passwordResetExpires: date,
    });
  }
  const token = signJWT(
    {
      type: "recoverAccount",
      session: randomCharacters,
      iat: Math.floor(date.getTime() / 1000),
    },
    configs.JWT_SECRET
  );
  const recoverLink = `${configs.CLIENT_URL}/reset-password?token=${token}`;
  await sendMail({
    template: emaiEnum.RECOVER_ACCOUNT,
    receiver: email,
    locals: {
      username: existingUser.fullName!,
      recoverLink,
    },
  });

  return res.status(StatusCodes.OK).send({
    message: "Send email success",
  });
}

export async function signIn(
  req: Request<{}, {}, SignInReq["body"]>,
  res: Response
) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user || !user.password || !(await compareData(user.password, password)))
    throw new BadRequestError("Invalid email or password");

  // if (user.mfa) {
  //   if (!mfa_code) throw new BadRequestError("MFA code is required");

  //   const mFAValidate =
  //     validateMFA({
  //       secret: user.mfa.secretKey,
  //       token: mfa_code,
  //     }) == 0;
  //   const isBackupCode = user.mfa.backupCodes.includes(mfa_code);
  //   const isBackupCodeUsed = user.mfa.backupCodesUsed.includes(mfa_code);

  //   if (!mFAValidate) {
  //     if (isBackupCodeUsed)
  //       throw new BadRequestError("MFA backup codes are used");
  //     if (!isBackupCode) throw new BadRequestError("Invalid MFA code");

  //     updateBackupCodeUsedById(user.id, mfa_code);
  //   }
  // } else {
  //   if (mfa_code)
  //     throw new BadRequestError("MFA code is an unrecognized key in body");
  // }

  if (user.status == "SUSPENDED")
    throw new BadRequestError("Your account is currently closed");

  if (user.status == "DISABLED")
    throw new BadRequestError(
      "Your account has been disabled. Please contact the administrator"
    );

  const { sessionKey, cookieOpt } = await createSession({
    userId: user.id,
    reqIp: req.ip || "",
    mfa: user.mfa ? false : true,
    userAgent: req.headers["user-agent"] || "",
  });

  return res
    .status(StatusCodes.OK)
    .cookie(
      configs.SESSION_KEY_NAME,
      encrypt(sessionKey, configs.SESSION_SECRET),
      {
        ...cookieOpt,
      }
    )
    .json({
      message: "Sign in success",
      mfa: !!user.mfa,
    });
}

// export async function name(params: type) {}

export async function resetPassword(
  req: Request<ResetPasswordReq["params"], {}, ResetPasswordReq["body"]>,
  res: Response
) {
  const { token } = req.params;
  const { password } = req.body;

  const data = verifyJWT<{
    type: "emailVerification" | "recoverAccount" | "reActivate";
    session: string;
  }>(token, configs.JWT_SECRET);
  if (!data || data.type != "recoverAccount")
    throw new BadRequestError("Token has expired.");

  const existingUser = await getUserByToken("recoverAccount", data.session);
  if (!existingUser) throw new BadRequestError("Reset token has expired");
  await editUserById(existingUser.id, {
    password,
    passwordResetExpires: new Date(),
    passwordResetToken: null,
  });

  return res.status(StatusCodes.OK).send({
    message: "Reset password success",
  });
}

export async function getSession(
  req: Request<{ token: string }>,
  res: Response
) {
  const { token } = req.params;
  const data = verifyJWT<{
    type: "emailVerification" | "recoverAccount" | "reActivate";
    session: string;
  }>(token, configs.JWT_SECRET);
  if (!data) throw new BadRequestError("Token has expired.");
  return res.status(StatusCodes.OK).json(data);
}

export async function sendReactivateAccount(
  req: Request<{}, {}, SendReActivateAccountReq["body"]>,
  res: Response
) {
  const user = await getUserByEmail(req.body.email, {
    reActiveToken: true,
    reActiveExpires: true,
  });
  if (!user) throw new BadRequestError("invalid email");
  let randomCharacters = user.reActiveToken;
  let date = user.reActiveExpires;
  if (
    !randomCharacters ||
    randomCharacters == "" ||
    !date ||
    date.getTime() <= Date.now()
  ) {
    randomCharacters = await randId();
    date = new Date(Date.now() + 5 * 60000);
    await editUserById(user.id, {
      reActiveToken: randomCharacters,
      reActiveExpires: date,
    });
  }
  const token = signJWT(
    {
      type: "reActivate",
      session: randomCharacters,
      iat: Math.floor(date.getTime() / 1000),
    },
    configs.JWT_SECRET
  );
  const reactivateLink = `${configs.CLIENT_URL}/reactivate?token=${token}`;
  await sendMail({
    template: emaiEnum.REACTIVATE_ACCOUNT,
    receiver: req.body.email,
    locals: {
      username: user.fullName!,
      reactivateLink,
    },
  });
  return res.status(StatusCodes.OK).send({
    message: "Send email success",
  });
}

export async function reActivateAccount(
  req: Request<{ token: string }>,
  res: Response
) {
  const { token } = req.params;
  const data = verifyJWT<{
    type: "emailVerification" | "recoverAccount" | "reActivate";
    session: string;
  }>(token, configs.JWT_SECRET);

  if (!data || data.type != "reActivate")
    throw new BadRequestError("Token has expired.");

  const user = await getUserByToken(data.type, data.session);
  if (!user) throw new NotFoundError();
  await editUserById(user.id, {
    status: "ACTIVE",
    reActiveExpires: new Date(),
    reActiveToken: null,
  });

  return res.status(StatusCodes.OK).send({
    message: "Your account has been activated.",
  });
}

export async function signInWithProvider(
  req: Request<{ provider: "google" | "facebook" }>,
  res: Response
) {
  const { provider } = req.params;
  const state = await randId();
  const url = generateUrlOauth2(provider, {
    state,
  });
  await setDataInSecondCache(`oauth2:${state}`, "oauth", 60 * 5);
  return res.redirect(url);
}

const ERROR_REDIRECT = `${configs.CLIENT_URL}/auth/error`;
const SUCCESS_REDIRECT = `${configs.CLIENT_URL}/account/profile`;

export async function signInWithProviderCallBack(
  req: Request<{ provider: "google" | "facebook" }>,
  res: Response
) {
  const { provider } = req.params;
  const { success, data } =
    signInWithProviderCallbackSchema.shape.query.safeParse(req.query);

  if (!success) return res.redirect(ERROR_REDIRECT);

  if ("error" in data) return res.redirect(ERROR_REDIRECT);

  const state = await getDataCache(`oauth2:${data.state}`);

  if (!state || state != "oauth") return res.redirect(ERROR_REDIRECT);

  const userInfo = await getUserProfile(provider, data.code);
  let user = await getUserByProvider(provider, userInfo.providerId);

  if (!user) {
    const existAccount = await getUserByEmail(userInfo.email);
    if (existAccount) {
      if (existAccount.password) {
        return res
          .cookie("oauth2_error", "registered_with_password", {
            httpOnly: true,
            secure: configs.NODE_ENV == "production",
          })
          .redirect(`${configs.CLIENT_URL}/login`);
      } else {
        return res
          .cookie(
            "oauth2_error",
            provider == "facebook"
              ? "registered_with_google"
              : "registered_with_facebook",
            {
              httpOnly: true,
              secure: configs.NODE_ENV == "production",
            }
          )
          .redirect(`${configs.CLIENT_URL}/login`);
      }
    }
    user = await insertUserWithProvider(userInfo);
  }

  if (user.status == "DISABLED") {
    // throw new BadRequestError(
    //   "Your account has been locked please contact the administrator"
    // );
    return res
      .cookie("oauth2_error", "disable", {
        httpOnly: true,
        secure: configs.NODE_ENV == "production",
      })
      .redirect(`${configs.CLIENT_URL}/login`);
  }

  if (user.status == "SUSPENDED") {
    // throw new BadRequestError("Your account has been suspended");
    return res
      .cookie("oauth2_error", "suspended", {
        httpOnly: true,
        secure: configs.NODE_ENV == "production",
      })
      .redirect(`${configs.CLIENT_URL}/login`);
  }

  const { sessionKey, cookieOpt } = await createSession({
    userId: user.id,
    mfa: true,
    reqIp: req.ip || "",
    userAgent: req.headers["user-agent"] || "",
  });

  return res
    .cookie(
      configs.SESSION_KEY_NAME,
      encrypt(sessionKey, configs.SESSION_SECRET),
      cookieOpt
    )
    .redirect(SUCCESS_REDIRECT);
}
