import prisma from "@/utils/db";
import { UserProfile } from "@/utils/oauth";
import { Prisma } from "@prisma/client";

const oauthSelectDefault: Prisma.OauthProviderSelect = {
  user: {
    select: {
      id: true,
      status: true,
    },
  },
};

// CREATE
export async function createProvider(
  userId: string,
  info: UserProfile,
  select?: Prisma.OauthProviderSelect
) {
  return await prisma.oauthProvider.create({
    data: {
      provider: info.provider,
      providerId: info.providerId,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    select: Prisma.validator<Prisma.OauthProviderSelect>()({
      ...oauthSelectDefault,
      ...select,
    }),
  });
}

// READ
export async function getProvider(
  providerId: string,
  provider: string,
  select?: Prisma.OauthProviderSelect
) {
  return await prisma.oauthProvider.findUnique({
    where: {
      provider_providerId: {
        provider,
        providerId,
      },
    },
    select: Prisma.validator<Prisma.OauthProviderSelect>()({
      ...oauthSelectDefault,
      ...select,
    }),
  });
}
// DELETE
export async function deleteProvider(
  provider: string,
  providerId: string,
  select?: Prisma.OauthProviderSelect
) {
  return await prisma.oauthProvider.delete({
    where: {
      provider_providerId: {
        provider,
        providerId,
      },
    },
    select: Prisma.validator<Prisma.OauthProviderSelect>()({
      ...oauthSelectDefault,
      ...select,
    }),
  });
}
