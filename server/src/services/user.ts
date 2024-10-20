import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";
import { hashData, randId } from "@/utils/helper";
import { SignUpReq } from "@/schema/auth";
import { CreateUserReq, EditUserReq, FilterUserReq, User } from "@/schema/user";
import { UserProfile } from "@/utils/oauth";
import { signJWT } from "@/utils/jwt";
import configs from "@/configs";
import { emaiEnum, sendMail } from "@/utils/nodemailer";
import {
  getUserCacheByEmail,
  getUserCacheById,
  setUserCache,
} from "@/redis/user";

export const userSelectDefault: Prisma.UserSelect = {
  id: true,
  email: true,
  emailVerified: true,
  role: true,
  status: true,
  password: true,
  fullName: true,
  gender: true,
  birthDate: true,
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
  const userCache = await getUserCacheByEmail(email);
  if (userCache) {
    return userCache;
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: Prisma.validator<Prisma.UserSelect>()({
      ...userSelectDefault,
      ...select,
    }),
  });
  if (user) await setUserCache(user);
  return user;
}

export async function getUserById(id: string, select?: Prisma.UserSelect) {
  const userCache = await getUserCacheById(id);
  if (userCache) {
    return userCache;
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: Prisma.validator<Prisma.UserSelect>()({
      ...userSelectDefault,
      ...select,
    }),
  });
  if (user) await setUserCache(user);
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

export type SearchUserProps = {
  where?: {
    ids?: string[];
    emails?: string[];
    emailVerified?: boolean;
    fullName?: string;
    statuses?: User["status"][];
    roles?: User["role"][];
    create_range?: string[];
  };

  limit?: number;
  page?: number;
  orderBy?: Partial<
    Record<
      | "email"
      | "firstName"
      | "lastName"
      | "role"
      | "emailVerified"
      | "status"
      | "createdAt"
      | "updatedAt",
      "asc" | "desc"
    >
  >[];
  select?: Prisma.UserSelect;
};
export async function searchUser(input: SearchUserProps) {
  const take = input.limit || 10;
  const page = (!input.page || input.page <= 0 ? 1 : input.page) - 1;
  const skip = page * take;

  const args: Prisma.UserFindManyArgs = {
    where: {
      AND: [
        {
          role: {
            notIn: ["SUPER_ADMIN"],
          },
        },
      ],
    },
    skip,
    take,
    select: Prisma.validator<Prisma.UserSelect>()({
      ...userSelectDefault,
      ...input.select,
      password: false,
    }),
  };

  if (input.where) {
    const {
      create_range,
      ids,
      emails,
      emailVerified,
      fullName,
      roles,
      statuses,
    } = input.where;

    if (ids) {
      args.where = {
        ...args.where,
        id: {
          in: ids,
        },
      };
    }

    if (emails) {
      args.where = {
        ...args.where,
        email: {
          in: emails,
        },
      };
    }
    if (emailVerified) {
      args.where = {
        ...args.where,
        emailVerified,
      };
    }
    if (fullName) {
      args.where = {
        ...args.where,
        OR: [
          {
            fullName: {
              contains: fullName,
            },
          },
        ],
      };
    }

    if (roles) {
      args.where = {
        ...args.where,
        role: {
          in: roles,
        },
      };
    }
    if (statuses) {
      args.where = {
        ...args.where,
        status: {
          in: statuses,
        },
      };
    }

    if (create_range) {
      args.where = {
        ...args.where,
        createdAt: {
          gte: create_range[0],
          lte: create_range[1],
        },
      };
    }
  }
  if (input.orderBy) {
    args.orderBy = input.orderBy;
  }

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany(args),
    prisma.user.count({ where: args.where }),
  ]);

  return {
    users,
    metadata: {
      hasNextPage: skip + take < total,
      totalPage: Math.ceil(total / take),
      totalItem: total,
    },
  };
}

// Create
export async function insertUserByAdmin(
  input: CreateUserReq["body"],
  select?: Prisma.UserSelect
) {
  const { password, email, fullName, ...rest } = input;
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
      fullName,
      ...rest,
    },
    select: Prisma.validator<Prisma.UserSelect>()({
      ...userSelectDefault,
      ...select,
    }),
  });

  await setUserCache(user);

  await sendMail({
    template: emaiEnum.VERIFY_EMAIL,
    receiver: email,
    locals: {
      username: fullName,
      verificationLink: configs.CLIENT_URL + "/confirm-email?token=" + token,
    },
  });

  return user;
}

export async function insertUserWithPassword(
  input: SignUpReq["body"],
  select?: Prisma.UserSelect
) {
  const { password, email } = input;

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
    },
    select: Prisma.validator<Prisma.UserSelect>()({
      ...userSelectDefault,
      ...select,
    }),
  });

  await setUserCache(user);

  await sendMail({
    template: emaiEnum.SIGNUP,
    receiver: email,
    locals: {
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
        username: input.fullName || input.fullName || "",
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
  return await prisma.mFA.create({
    data: {
      userId: id,
      backupCodes: input.backupCodes,
      secretKey: input.secretKey,
    },
    select: {
      backupCodes: true,
      backupCodesUsed: true,
      lastAccess: true,
      secretKey: true,
      createdAt: true,
      updatedAt: true,
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
