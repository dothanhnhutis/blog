import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";
import { hashData, randId } from "@/utils/helper";
import { SignUpReq } from "@/schema/auth";
import { User } from "@/schema/user";
import { GoogleUserInfo } from "@/utils/oauth";
import { signJWT } from "@/utils/jwt";
import configs from "@/configs";
import { emaiEnum, sendMail } from "@/utils/nodemailer";

export const userSelectDefault: Prisma.UserSelect = {
  id: true,
  email: true,
  role: true,
  password: true,
  emailVerified: true,
  status: true,
  // hasPassword: true,
  mFAEnabled: true,
  profile: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      photo: true,
      coverPhoto: true,
      phone: true,
      address: true,
      // postalCode: true,
      // country: true,
      // region: true,
      // city: true,
      bio: true,
      urls: true,
    },
  },
  oauthProviders: {
    select: {
      id: true,
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
  providerName: string,
  providerId: string,
  select?: Prisma.UserSelect
) {
  const provider = await prisma.oauthProvider.findUnique({
    where: {
      provider_providerId: {
        provider: providerName,
        providerId,
      },
    },
  });
  if (!provider) return null;
  return await prisma.user.findUnique({
    where: {
      id: provider.userId,
    },
    select: Prisma.validator<Prisma.UserSelect>()({
      ...userSelectDefault,
      ...select,
    }),
  });
}

// Create
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
      profile: {
        create: {
          firstName,
          lastName,
        },
      },
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

export async function insertUserWithGoogle(
  googleData: GoogleUserInfo,
  select?: Prisma.UserSelect
) {
  const data: Prisma.UserCreateInput = {
    email: googleData.email,
    profile: {
      create: {
        firstName: googleData.given_name,
        lastName: googleData.family_name,
        photo: googleData.picture,
      },
    },
    oauthProviders: {
      create: {
        provider: googleData.name,
        providerId: googleData.id,
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
export type UpdateUserByIdInput = {
  twoFAEnabled?: boolean | undefined;
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
  photo?: string | null;
  coverPhoto?: string | null;
  firstName?: string | undefined;
  lastName?: string | undefined;
  phone?: string | null;
  address?: string | null;
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

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      mFAEnabled: true,
    },
  });
}

export async function disableMFA(id: string) {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      mFAEnabled: false,
    },
  });
  await prisma.mFA.delete({
    where: {
      userId: id,
    },
  });
}
