import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";
import { hashData, randId } from "@/utils/helper";
import { SignUpReq } from "@/schema/auth";
import { CreateUserReq, EditUserReq, User } from "@/schema/user";
import { UserProfile } from "@/utils/oauth";
import { signJWT } from "@/utils/jwt";
import configs from "@/configs";
import { emaiEnum, sendMail } from "@/utils/nodemailer";

export const userSelectDefault: Prisma.UserSelect = {
  id: true,
  email: true,
  emailVerified: true,
  role: true,
  status: true,
  password: true,
  firstName: true,
  lastName: true,
  picture: true,
  phoneNumber: true,
  mfa: {
    select: {
      backupCodes: true,
      backupCodesUsed: true,
      lastAccess: true,
      secretKey: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  oauthProviders: {
    select: {
      provider: true,
      providerId: true,
    },
  },
  createdAt: true,
  updatedAt: true,
};
// Read
export async function getUserByEmail(
  email: string,
  select?: Prisma.UserSelect
) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: Prisma.validator<Prisma.UserSelect>()({
      ...userSelectDefault,
      ...select,
    }),
  });
  return user;
}

export async function getUserById(id: string, select?: Prisma.UserSelect) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: Prisma.validator<Prisma.UserSelect>()({
      ...userSelectDefault,
      ...select,
    }),
  });
  return user;
}

export async function getUserByToken(
  type: "emailVerification" | "recoverAccount" | "reActivate",
  session: string,
  select?: Prisma.UserSelect
) {
  switch (type) {
    case "emailVerification":
      return await prisma.user.findUnique({
        where: {
          emailVerificationToken: session,
          emailVerificationExpires: { gte: new Date() },
        },
        select: Prisma.validator<Prisma.UserSelect>()({
          ...userSelectDefault,
          ...select,
        }),
      });
    case "recoverAccount":
      return await prisma.user.findUnique({
        where: {
          passwordResetToken: session,
          passwordResetExpires: { gte: new Date() },
        },
        select: Prisma.validator<Prisma.UserSelect>()({
          ...userSelectDefault,
          ...select,
        }),
      });
    case "reActivate":
      return await prisma.user.findUnique({
        where: {
          reActiveToken: session,
          reActiveExpires: { gte: new Date() },
        },
        select: Prisma.validator<Prisma.UserSelect>()({
          ...userSelectDefault,
          ...select,
        }),
      });
    default:
      return null;
  }
}

export async function getUserByProvider(
  provider: string,
  providerId: string,
  select?: Prisma.UserSelect
) {
  const oauth = await prisma.oauthProvider.findUnique({
    where: {
      provider_providerId: {
        provider,
        providerId,
      },
    },
  });
  if (!oauth) return null;
  return await prisma.user.findUnique({
    where: {
      id: oauth.userId,
    },
    select: Prisma.validator<Prisma.UserSelect>()({
      ...userSelectDefault,
      ...select,
    }),
  });
}

export async function getUserByIds(ids: string[], select?: Prisma.UserSelect) {
  return await prisma.user.findMany({
    where: {
      id: { in: ids },
    },
    select: Prisma.validator<Prisma.UserSelect>()({
      ...userSelectDefault,
      ...select,
    }),
  });
}

// Create
export async function insertUserByAdmin(
  input: CreateUserReq["body"],
  select?: Prisma.UserSelect
) {
  const { password, firstName, lastName, email, ...rest } = input;
  const hash = hashData(password);

  const expires: number = Math.floor((Date.now() + 4 * 60 * 60 * 1000) / 1000);
  const session = await randId();
  const token = signJWT(
    {
      type: "emailVerification",
      session,
      iat: expires,
    },
    configs.JWT_SECRET
  );

  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
      emailVerificationExpires: new Date(expires * 1000),
      emailVerificationToken: session,
      firstName,
      lastName,
      ...rest,
    },
    select: Prisma.validator<Prisma.UserSelect>()({
      ...userSelectDefault,
      ...select,
    }),
  });

  await sendMail({
    template: emaiEnum.VERIFY_EMAIL,
    receiver: email,
    locals: {
      username: firstName + " " + lastName,
      verificationLink: configs.CLIENT_URL + "/confirm-email?token=" + token,
    },
  });

  return user;
}

export async function insertUserWithPassword(
  input: SignUpReq["body"],
  select?: Prisma.UserSelect
) {
  const { password, firstName, lastName, email } = input;

  const hash = hashData(password);
  const expires: number = Math.floor((Date.now() + 4 * 60 * 60 * 1000) / 1000);
  const session = await randId();
  const token = signJWT(
    {
      type: "emailVerification",
      session,
      iat: expires,
    },
    configs.JWT_SECRET
  );

  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
      emailVerificationExpires: new Date(expires * 1000),
      emailVerificationToken: session,
      firstName,
      lastName,
    },
    select: Prisma.validator<Prisma.UserSelect>()({
      ...userSelectDefault,
      ...select,
    }),
  });

  await sendMail({
    template: emaiEnum.VERIFY_EMAIL,
    receiver: email,
    locals: {
      username: firstName + " " + lastName,
      verificationLink: configs.CLIENT_URL + "/confirm-email?token=" + token,
    },
  });

  return user;
}

export async function insertUserWithProvider(
  info: UserProfile,
  select?: Prisma.UserSelect
) {
  const { provider, providerId, ...rest } = info;
  const data: Prisma.UserCreateInput = {
    emailVerified: true,
    ...rest,
    oauthProviders: {
      create: {
        provider,
        providerId,
      },
    },
  };

  return await prisma.user.create({
    data,
    select: Prisma.validator<Prisma.UserSelect>()({
      ...userSelectDefault,
      ...select,
    }),
  });
}
// Update
export type UpdateUserByIdInput = EditUserReq["body"] & {
  password?: string | null;
  emailVerified?: boolean | undefined;
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
  status?: User["status"] | undefined;
  role?: User["role"] | undefined;
  reActiveExpires?: Date | null;
  reActiveToken?: string | null;
  email?: string | undefined;
};

export async function editUserById(
  id: string,
  input: UpdateUserByIdInput,
  select?: Prisma.UserSelect
) {
  let data: Prisma.UserUpdateInput = {
    ...input,
  };
  if (input.password) {
    data.password = hashData(input.password);
  }
  if (input.email) {
    const expires: number = Math.floor(
      (Date.now() + 4 * 60 * 60 * 1000) / 1000
    );
    const session = await randId();
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
      receiver: input.email,
      locals: {
        username: data.firstName + " " + data.lastName,
        verificationLink: configs.CLIENT_URL + "/confirm-email?token=" + token,
      },
    });
  }

  return await prisma.user.update({
    where: {
      id,
    },
    data,
    select: Prisma.validator<Prisma.UserSelect>()({
      ...userSelectDefault,
      ...select,
    }),
  });
}

export async function enableMFA(
  id: string,
  input: {
    secretKey: string;
    backupCodes: string[];
  }
) {
  await prisma.mFA.create({
    data: {
      userId: id,
      backupCodes: input.backupCodes,
      secretKey: input.secretKey,
    },
  });
}

export async function disableMFA(id: string) {
  await prisma.mFA.delete({
    where: {
      userId: id,
    },
  });
}
