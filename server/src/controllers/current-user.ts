import configs from "@/configs";
import { BadRequestError } from "@/error-handler";
import {
  deteleDataCache,
  getDataCache,
  setDataCache,
  setDataInSecondCache,
} from "@/redis/cache";
import { generateMFASetup, getMFASetup } from "@/redis/mfa";
import {
  deleteSession,
  deleteSessionByKey,
  getAllSession,
  updateSessionData,
} from "@/redis/session";
import { signInWithProviderCallbackSchema } from "@/schema/auth";
import {
  ChangeEmailReq,
  ChangePasswordReq,
  EditUserReq,
  EnableMFAReq,
  SetupMFAReq,
} from "@/schema/user";
import { createProvider, deleteProvider } from "@/services/oauth";
import {
  disableMFA,
  editUserById,
  enableMFA,
  getUserByEmail,
  getUserById,
} from "@/services/user";
import { compareData, generateOTP, hashData, randId } from "@/utils/helper";
import { signJWT } from "@/utils/jwt";
import { validateMFA } from "@/utils/mfa";
import { emaiEnum, sendMail } from "@/utils/nodemailer";
import { generateUrlOauth2, getUserProfile } from "@/utils/oauth";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import qrcode from "qrcode";

export function currentUser(req: Request, res: Response) {
  const {
    user: { password, ...rest },
  } = req.sessionData!;
  res.status(StatusCodes.OK).json({
    ...rest,
    hasPassword: !!password,
  });
}

export async function signOut(req: Request, res: Response) {
  await deleteSessionByKey(req.sessionKey!);
  res
    .status(StatusCodes.OK)
    .clearCookie(configs.SESSION_KEY_NAME)
    .json({
      message: "Sign out successful",
    })
    .end();
}

export async function readAllSession(req: Request, res: Response) {
  const { user } = req.sessionData!;
  const sessions = await getAllSession(user.id);
  console.log(sessions);
  res.status(StatusCodes.OK).json(
    sessions.map((s) => {
      const {
        user: { password, ...noPass },
        ...rest
      } = s;
      return {
        ...rest,
        user: {
          ...noPass,
          hasPassword: !!password,
        },
      };
    })
  );
}

export async function removeSession(
  req: Request<{ sessionId: string }>,
  res: Response
) {
  const { id, user } = req.sessionData!;
  if (id == req.params.sessionId)
    throw new BadRequestError("Cannot delete current session");
  await deleteSession(user.id, req.params.sessionId);
  res.status(StatusCodes.OK).json({
    message: "delete session success",
  });
}

export async function disactivate(req: Request, res: Response) {
  const { user } = req.sessionData!;
  await editUserById(user.id, {
    status: "SUSPENDED",
  });
  if (req.sessionData) await deleteSession(user.id);
  res.status(StatusCodes.OK).clearCookie(configs.SESSION_KEY_NAME).json({
    message: "Your account has been disabled. You can reactivate at any time!",
  });
}

export async function setupMFA(
  req: Request<{}, {}, SetupMFAReq["body"]>,
  res: Response
) {
  const {
    user: { id, mfa },
  } = req.sessionData!;
  const { deviceName } = req.body;
  if (mfa)
    throw new BadRequestError(
      "Multi-factor authentication (MFA) has been enabled"
    );

  const { totp, backupCodes } = await generateMFASetup(id, deviceName);

  qrcode.toDataURL(totp.oauth_url, async (err, imageUrl) => {
    if (err) {
      deteleDataCache(`mfasetup:${id}`);
      throw new BadRequestError("Failed to generate QR code.");
    }

    return res.status(StatusCodes.OK).json({
      message: "Scan this QR code with your authenticator app.",
      data: {
        backupCodes,
        totp,
        qrCodeUrl: imageUrl,
      },
    });
  });
}

export async function enableMFAAccount(
  req: Request<{}, {}, EnableMFAReq["body"]>,
  res: Response
) {
  const {
    user: { id, mfa },
  } = req.sessionData!;
  const { mfa_code1, mfa_code2 } = req.body;

  if (mfa)
    throw new BadRequestError(
      "Multi-factor authentication (MFA) has been enabled"
    );
  const totpData = await getMFASetup(id);
  if (!totpData)
    throw new BadRequestError(
      "The multi-factor authentication (MFA) code has expired"
    );

  if (
    validateMFA({ secret: totpData.totp.base32, token: mfa_code1 }) == null ||
    validateMFA({ secret: totpData.totp.base32, token: mfa_code2 }) == null
  )
    throw new BadRequestError("Invalid MFA code");

  const newMFA = await enableMFA(id, {
    secretKey: totpData.totp.base32,
    backupCodes: totpData.backupCodes,
  });
  await updateSessionData(req.sessionKey!, { mfa: newMFA });
  await deteleDataCache(`mfasetup:${id}`);

  res.status(StatusCodes.OK).json({
    message: "Multi-factor authentication (MFA) is enable",
    data: {
      backupCodes: totpData.backupCodes,
    },
  });
}

export async function disableMFAAccount(req: Request, res: Response) {
  const {
    user: { id, mfa },
  } = req.sessionData!;
  const { mfa_code1, mfa_code2 } = req.body;

  if (!mfa)
    throw new BadRequestError(
      "Multi-factor authentication (MFA) has been disable"
    );
  if (
    validateMFA({ secret: mfa.secretKey, token: mfa_code1 }) == null ||
    validateMFA({ secret: mfa.secretKey, token: mfa_code2 }) == null
  )
    throw new BadRequestError("Invalid MFA code");
  await disableMFA(id);
  await updateSessionData(req.sessionKey!, { mfa: null });

  return res
    .status(StatusCodes.OK)
    .json({ message: "Multi-factor authentication (MFA) is disable" });
}

export async function changePassword(
  req: Request<{}, {}, ChangePasswordReq["body"]>,
  res: Response
) {
  const { oldPassword, newPassword } = req.body;
  const { id, password } = req.user!;

  if (password) {
    if (!oldPassword) throw new BadRequestError("oldPassword is required.");

    const userExist = await getUserById(id, { password: true });
    const isValidOldPassword = await compareData(
      userExist!.password!,
      oldPassword
    );

    if (!isValidOldPassword)
      throw new BadRequestError("oldPassword is incorrect");

    if (oldPassword != newPassword)
      await editUserById(id, {
        password: newPassword,
      });

    return res.status(StatusCodes.OK).json({
      message: "Update password success",
    });
  } else {
    if (oldPassword)
      throw new BadRequestError("oldPassword is an unrecognized key in body");

    await editUserById(id, {
      password: newPassword,
    });

    return res.status(StatusCodes.OK).json({
      message: "Create password success",
    });
  }
}

export async function sendVerifyEmail(req: Request, res: Response) {
  const { id, emailVerified, email, fullName } = req.user!;
  if (emailVerified) throw new BadRequestError("Verified email");

  const user = await getUserById(id, {
    emailVerificationToken: true,
    emailVerificationExpires: true,
  });

  if (!user || !user.emailVerificationToken || !user.emailVerificationExpires)
    throw new BadRequestError("Send email verification failed");

  let session: string = await randId();
  let expires: number = Math.floor((Date.now() + 4 * 60 * 60 * 1000) / 1000);

  if (user.emailVerificationExpires.getTime() < Date.now()) {
    await editUserById(id, {
      emailVerificationToken: session,
      emailVerificationExpires: new Date(expires * 1000),
    });
  } else {
    session = user.emailVerificationToken;
    expires = user.emailVerificationExpires.getTime();
  }

  const token = signJWT(
    {
      type: "emailVerification",
      session,
      iat: expires,
    },
    configs.JWT_SECRET
  );

  await sendMail({
    template: emaiEnum.SIGNUP,
    receiver: email!,
    locals: {
      verificationLink: configs.CLIENT_URL + "/confirm-email?token=" + token,
    },
  });

  return res.status(StatusCodes.OK).json({
    message: "Sent verification email",
  });
}

export async function sendChangeEmail(
  req: Request<{}, {}, ChangeEmailReq["body"]>,
  res: Response
) {
  const { id, emailVerified, email, fullName } = req.user!;
  const { email: newEmail } = req.body;

  if (newEmail == email)
    throw new BadRequestError(
      "The new email cannot be the same as the current email"
    );

  const checkNewEmail = await getUserByEmail(newEmail);
  if (checkNewEmail) throw new BadRequestError("Email already exists");

  if (emailVerified) {
    let otp: string = generateOTP();
    await setDataInSecondCache(`otp:${newEmail}`, hashData(otp), 5 * 60 * 60);

    await sendMail({
      template: emaiEnum.OTP_VERIFY_ACCOUNT,
      receiver: newEmail,
      locals: {
        otp,
      },
    });
    return res.status(StatusCodes.OK).json({
      message: "The verification code has been sent to your email.",
    });
  } else {
    let session: string = await randId();
    let expires: number = Math.floor((Date.now() + 4 * 60 * 60 * 1000) / 1000);

    await editUserById(id, {
      email: newEmail,
      emailVerificationToken: session,
      emailVerificationExpires: new Date(expires * 1000),
    });

    const token = signJWT(
      {
        type: "emailVerification",
        session,
        iat: expires,
      },
      configs.JWT_SECRET
    );

    await sendMail({
      template: emaiEnum.SIGNUP,
      receiver: newEmail,
      locals: {
        verificationLink: configs.CLIENT_URL + "/confirm-email?token=" + token,
      },
    });
    return res.status(StatusCodes.OK).json({
      message: "Sent verification email",
    });
  }
}

export async function changeEmail(
  req: Request<{}, {}, ChangeEmailReq["body"]>,
  res: Response
) {
  const { email: newEmail, otp } = req.body;
  const { id, email } = req.user!;

  if (email == newEmail)
    throw new BadRequestError(
      "The new email cannot be the same as the current email"
    );

  const checkNewEmail = await getUserByEmail(newEmail);
  if (checkNewEmail) throw new BadRequestError("Email already exists");

  const hashOtp = await getDataCache(`otp:${newEmail}`);
  if (!hashOtp || !compareData(hashOtp, otp))
    throw new BadRequestError("Invalid otp code");

  await editUserById(id, {
    email: newEmail,
  });

  await deteleDataCache(`otp:${newEmail}`);

  return res.status(StatusCodes.OK).json({
    message: "Update email success",
  });
}

export async function connectOauthProvider(
  req: Request<{ provider: "google" | "facebook" }>,
  res: Response
) {
  const { provider } = req.params;
  const state = await randId();
  const url = generateUrlOauth2(provider, {
    state,
    redirect_uri: `${configs.SERVER_URL}/api/v1/users/connect/${provider}/callback`,
  });
  await setDataInSecondCache(`oauth2:${state}`, "connect", 60 * 5);

  return res.redirect(url);
}

const CONNECT_ERROR_REDIRECT = `${configs.CLIENT_URL}/security/error`;
export async function connectOauthProviderCallback(
  req: Request<{ provider: "google" | "facebook" }>,
  res: Response
) {
  const { id } = req.user!;
  const { provider } = req.params;
  const { success, data } =
    signInWithProviderCallbackSchema.shape.query.safeParse(req.query);

  if (!success) return res.redirect(CONNECT_ERROR_REDIRECT);

  if ("error" in data) return res.redirect(CONNECT_ERROR_REDIRECT);

  const state = await getDataCache(`oauth2:${data.state}`);

  if (!state || state != "connect") return res.redirect(CONNECT_ERROR_REDIRECT);

  console.log(state);
  const userInfo = await getUserProfile(provider, data.code, {
    redirect_uri: `${configs.SERVER_URL}/api/v1/users/connect/${provider}/callback`,
  });

  await createProvider(id, userInfo);
  return res.status(StatusCodes.OK).json({ message: "oke" });
}

export async function disconnectOauthProvider(
  req: Request<{ provider: "google" | "facebook" }>,
  res: Response
) {
  const { oauthProviders, password } = req.user!;
  const { provider } = req.params;
  const oauthProvider = oauthProviders.find((o) => o.provider == provider);

  if (!oauthProvider)
    throw new BadRequestError(`Unable to disconnect ${provider} provider`);
  if (
    oauthProviders.filter((o) => o.provider != provider).length == 0 &&
    !password
  )
    throw new BadRequestError(
      `Please create a password before disconnecting from the ${provider} provider.`
    );

  await deleteProvider(oauthProvider.provider, oauthProvider.providerId);
  return res
    .status(StatusCodes.OK)
    .json({ message: `Disconnect to ${provider} success.` });
}

export async function editProfile(
  req: Request<{}, {}, EditUserReq["body"]>,
  res: Response
) {
  const { id } = req.user!;
  await editUserById(id, req.body);
  return res.status(StatusCodes.OK).json({ message: "Update user success." });
}
