import { CookieOptions } from "express";
import { UAParser } from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";

import {
  deteleDataCache,
  getDataCache,
  getKeyByPattern,
  setDataCache,
  setDataInMilisecondCache,
  setDataInSecondCache,
} from "./cache";
import configs from "@/configs";
import { User } from "@/schema/user";
import user from "@/routes/user";

export type ISessionData = {
  id: string;
  user: User;
  cookie: CookieOptions;
  reqInfo: {
    ip: string;
    userAgent: UAParser.IResult;
    lastAccess: Date;
    createAt: Date;
  };
};

const SESSION_MAX_AGE = 30 * 24 * 60 * 60000;

export const createSession = async ({
  user,
  reqIp,
  userAgent,
}: {
  user: User;
  reqIp?: string;
  userAgent?: string;
}) => {
  const sessionId = uuidv4();
  const sessionKey = `${configs.SESSION_KEY_NAME}:${user.id}:${sessionId}`;
  const now = new Date();
  const cookieOpt = {
    path: "/",
    httpOnly: true,
    secure: false,
    expires: new Date(now.getTime() + SESSION_MAX_AGE),
  };

  const sessionData: ISessionData = {
    id: sessionId,
    user,
    cookie: cookieOpt,
    reqInfo: {
      ip: reqIp || "",
      userAgent: UAParser(userAgent),
      lastAccess: now,
      createAt: now,
    },
  };

  await setDataInMilisecondCache(
    sessionKey,
    JSON.stringify(sessionData),
    Math.abs(cookieOpt.expires.getTime() - Date.now())
  );

  return { sessionKey, cookieOpt };
};

export const getSession = async (sessionKey: string) => {
  try {
    const sessionCache = await getDataCache(sessionKey);
    if (!sessionCache) return;
    const sessionData = JSON.parse(sessionCache) as ISessionData;
    return sessionData;
  } catch (error: any) {
    console.log(`getSession() method error: `, error);
  }
};

export const sessionLastAccess = async (sessionKey: string) => {
  const sessionCache = await getDataCache(sessionKey);

  if (sessionCache == null) return;
  try {
    const sessionData = JSON.parse(sessionCache) as ISessionData;
    const now = new Date();

    sessionData.reqInfo.lastAccess = now;
    sessionData.cookie.expires = new Date(now.getTime() + SESSION_MAX_AGE);
    await setDataInMilisecondCache(
      sessionKey,
      JSON.stringify(sessionData),
      Math.abs(sessionData.cookie.expires.getTime() - Date.now())
    );
    return sessionData;
  } catch (error: any) {
    console.log(`SessionLastAccess() method error: `, error);
  }
};

export const updateSessionData = async (
  sessionKey: string,
  data: Partial<ISessionData["user"]>
) => {
  const sessionCache = await getDataCache(sessionKey);

  if (!sessionCache) return;
  try {
    const sessionData = JSON.parse(sessionCache) as ISessionData;
    await setDataCache(
      sessionKey,
      JSON.stringify({
        ...sessionData,
        user: {
          ...sessionData.user,
          ...data,
        },
      }),
      { keepTTL: true }
    );
  } catch (error) {
    console.log(`updateSessionData() method error: `, error);
  }
};

// export const validateMFAAccess = async (
//   sessionKey: string,
//   sessionData: ISessionData
// ) => {
//   await setDataCache(
//     sessionKey,
//     JSON.stringify({ ...sessionData, mfa: true }),
//     { keepTTL: true }
//   );
// };

export const getAllSession = async (userId: string) => {
  const keys = await getKeyByPattern(`${configs.SESSION_KEY_NAME}:${userId}:*`);
  const data: ISessionData[] = [];
  for (const id of keys) {
    const sessionCache = await getDataCache(id);
    if (sessionCache == null) continue;
    try {
      const sessionData = JSON.parse(sessionCache) as ISessionData;
      data.push(sessionData);
    } catch (error: any) {
      console.log(`getAllSession() method error: `, error);
      continue;
    }
  }
  return data;
};

export const deleteSession = async (userId: string, sessionId?: string) => {
  if (sessionId) {
    await deteleDataCache(`${configs.SESSION_KEY_NAME}:${userId}:${sessionId}`);
  } else {
    const keys = await getKeyByPattern(
      `${configs.SESSION_KEY_NAME}:${userId}:*`
    );
    await deteleDataCache(...keys);
  }
};

export const deleteSessionByKey = async (sessionKey: string) => {
  await deteleDataCache(sessionKey);
};
