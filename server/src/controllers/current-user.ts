import configs from "@/configs";
import { BadRequestError } from "@/error-handler";
import {
  deteleDataCache,
  getDataCache,
  setDataCache,
  setDataInSecondCache,
} from "@/redis/cache";
import { deleteSession, getAllSession } from "@/redis/session";
import {
  ChangeEmailReq,
  ChangePasswordReq,
  DisconnectOauthProviderReq,
  EnableMFAReq,
  SetupMFAReq,
  editProfileReq,
} from "@/schema/user";
import { getMFAByUserId } from "@/services/mfa";
import { insertGoogleLink, deleteOauth } from "@/services/oauth";
import {
  disableMFA,
  editUserById,
  enableMFA,
  getUserByEmail,
  getUserById,
  UpdateUserByIdInput,
} from "@/services/user";
import { compareData, generateOTP, hashData, randId } from "@/utils/helper";
import { uploadImageCloudinary } from "@/utils/image";
import { signJWT } from "@/utils/jwt";
import { generateMFA, TOTPType, validateMFA } from "@/utils/mfa";
import { emaiEnum, sendMail } from "@/utils/nodemailer";
import { generateGoogleAuthUrl, getGoogleUserProfile } from "@/utils/oauth";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import qrcode from "qrcode";

export function currentUser(req: Request, res: Response) {
  const { password, ...props } = req.user!;
  res.status(StatusCodes.OK).json({
    ...props,
    hasPassword: !!password,
  });
}

export async function readAllSession(req: Request, res: Response) {
  const { id } = req.user!;
  res.status(StatusCodes.OK).json(await getAllSession(id));
}

export async function removeSession(
  req: Request<{ sessionId: string }>,
  res: Response
) {
  const { id, userId } = req.sessionData!;
  if (id == req.params.sessionId)
    throw new BadRequestError("Cannot delete current session");
  await deleteSession(userId, req.params.sessionId);
  res.status(StatusCodes.OK).json({
    message: "delete session success",
  });
}

export async function disactivate(req: Request, res: Response) {
  const { id } = req.user!;
  await editUserById(id, {
    status: "SUSPENDED",
  });
  if (req.sessionData) await deleteSession(id, req.sessionData.id);
  res.status(StatusCodes.OK).clearCookie(configs.SESSION_KEY_NAME).json({
    message: "Your account has been disabled. You can reactivate at any time!",
  });
}

export async function setupMFA(
  req: Request<{}, {}, SetupMFAReq["body"]>,
  res: Response
) {
  const { id, mFAEnabled } = req.user!;
  const { deviceName } = req.body;
  if (mFAEnabled)
    throw new BadRequestError(
      "Multi-factor authentication (MFA) has been enabled"
    );

  let backupCodes: string[], totp: TOTPType;
  const totpData = await getDataCache(`${id}:mfa`);

  if (!totpData) {
    backupCodes = Array.from({ length: 10 }).map(() => generateOTP());
    totp = generateMFA(deviceName);

    await setDataInSecondCache(
      `${id}:mfa`,
      JSON.stringify({
        backupCodes,
        totp,
      }),
      60 * 60
    );
  } else {
    const mfaCookie = JSON.parse(totpData) as {
      backupCodes: string[];
      totp: TOTPType;
    };

    backupCodes = mfaCookie.backupCodes;
    totp = generateMFA(deviceName, mfaCookie.totp.base32);
    await setDataCache(
      `${id}:mfa`,
      JSON.stringify({
        backupCodes,
        totp,
      }),
      { keepTTL: true }
    );
  }

  qrcode.toDataURL(totp.oauth_url, async (err, imageUrl) => {
    if (err) {
      deteleDataCache(`${id}:mfa`);
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
  const { id, mFAEnabled } = req.user!;
  const { mfa_code1, mfa_code2 } = req.body;

  if (mFAEnabled)
    throw new BadRequestError(
      "Multi-factor authentication (MFA) has been enabled"
    );
  const totpInfo = await getDataCache(`${id}:mfa`);
  if (!totpInfo)
    throw new BadRequestError(
      "The multi-factor authentication (MFA) code has expired"
    );

  const { backupCodes, totp } = JSON.parse(totpInfo) as {
    backupCodes: string[];
    totp: TOTPType;
  };

  if (
    validateMFA({ secret: totp.base32, token: mfa_code1 }) == null ||
    validateMFA({ secret: totp.base32, token: mfa_code2 }) == null
  )
    throw new BadRequestError("Invalid MFA code");

  await enableMFA(id, { secretKey: totp.base32, backupCodes });

  res.status(StatusCodes.OK).json({
    message: "Multi-factor authentication (MFA) is enable",
    data: {
      backupCodes,
    },
  });
}

export async function disableMFAAccount(req: Request, res: Response) {
  const { id, mFAEnabled } = req.user!;
  const { mfa_code1, mfa_code2 } = req.body;

  if (!mFAEnabled)
    throw new BadRequestError(
      "Multi-factor authentication (MFA) has been disable"
    );
  const totp = await getMFAByUserId(id);
  if (!totp)
    throw new BadRequestError(
      "Multi-factor authentication (MFA) has been disable"
    );
  if (
    validateMFA({ secret: totp.secretKey, token: mfa_code1 }) == null ||
    validateMFA({ secret: totp.secretKey, token: mfa_code2 }) == null
  )
    throw new BadRequestError("Invalid MFA code");
  await disableMFA(id);

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
  const { id, emailVerified, email, profile } = req.user!;
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
    template: emaiEnum.VERIFY_EMAIL,
    receiver: email,
    locals: {
      username: profile!.firstName + " " + profile!.lastName,
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
  const { id, emailVerified, email, profile } = req.user!;
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
      template: emaiEnum.VERIFY_EMAIL,
      receiver: newEmail,
      locals: {
        username: profile!.firstName + " " + profile!.lastName,
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
  req: Request<{ provider: "google" }>,
  res: Response
) {
  const { id } = req.user!;
  const { provider } = req.params;
  const url = generateGoogleAuthUrl({
    redirect_uri: `${configs.SERVER_URL}/api/v1/users/connect/${provider}/callback`,
    state: id,
  });
  return res.redirect(url);
}

export async function connectOauthProviderCallback(
  req: Request<
    { provider: "google" },
    {},
    {},
    {
      code?: string | string[] | undefined;
      error?: string | string[] | undefined;
      state?: string | string[] | undefined;
    }
  >,
  res: Response
) {
  const { provider } = req.params;
  const { code, error, state } = req.query;
  console.log(code, error, state);
  if (
    error ||
    !code ||
    typeof code == "object" ||
    !state ||
    typeof state == "object"
  )
    throw new BadRequestError("fail connect");

  const userInfo = await getGoogleUserProfile({
    code,
    redirect_uri: `${configs.SERVER_URL}/api/v1/users/connect/${provider}/callback`,
  });
  await insertGoogleLink(userInfo.id, state);
  return res.status(StatusCodes.OK).json({ message: "oke" });
}

export async function disconnectOauthProvider(
  req: Request<{}, {}, DisconnectOauthProviderReq["body"]>,
  res: Response
) {
  const { oauthProviders, password } = req.user!;
  const { provider, providerId } = req.body;
  if (
    oauthProviders.filter(
      (o) => o.provider == provider && o.providerId == providerId
    ).length == 0
  )
    throw new BadRequestError(`Unable to disconnect ${provider} provider`);
  if (
    oauthProviders.filter((o) => o.provider != provider).length == 0 &&
    !password
  )
    throw new BadRequestError(
      `Please create a password before disconnecting from the ${provider} provider.`
    );

  await deleteOauth(providerId, provider);
  return res
    .status(StatusCodes.OK)
    .json({ message: `Disconnect to ${provider} success.` });
}

export async function editProfile(
  req: Request<{}, {}, editProfileReq["body"]>,
  res: Response
) {
  const { id } = req.user!;
  const { photo, coverPhoto, ...props } = req.body;
  const input: UpdateUserByIdInput = props;

  if (photo) {
    if (photo.type == "base64") {
      const { secure_url } = await uploadImageCloudinary(photo.data, {
        transformation: [{ width: 640, height: 640, crop: "scale" }],
        tags: ["avatar", id],
      });
      input.photo = secure_url;
    } else {
      input.photo = photo.data;
    }
  }

  if (coverPhoto) {
    if (coverPhoto.type == "base64") {
      const { secure_url } = await uploadImageCloudinary(coverPhoto.data, {
        transformation: [{ width: 640, height: 640, crop: "scale" }],
        tags: ["avatar", id],
      });
      input.coverPhoto = secure_url;
    } else {
      input.coverPhoto = coverPhoto.data;
    }
  }

  await editUserById(id, input);

  return res.status(StatusCodes.OK).json({ message: "Update profile success" });
}