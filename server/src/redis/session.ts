import { CookieOptions } from "express";
import { UAParser } from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";

import {
  deteleDataCache,
  getDataCache,
  getKeyByPattern,
  setDataCache,
  setDataInMilisecondCache,
} from "./cache";
import configs from "@/configs";

export type ISessionData = {
  id: string;
  userId: string;
  mfa: boolean;
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
  userId,
  mfa,
  reqIp,
  userAgent,
}: {
  userId: string;
  mfa: boolean;
  reqIp?: string;
  userAgent?: string;
}) => {
  const sessionId = uuidv4();
  const sessionKey = `${configs.SESSION_KEY_NAME}:${userId}:${sessionId}`;
  const now = new Date();
  const cookieOpt = {
    path: "/",
    httpOnly: true,
    secure: false,
    expires: new Date(now.getTime() + SESSION_MAX_AGE),
  };

  const sessionData: ISessionData = {
    id: sessionId,
    userId,
    mfa,
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
  const sessionCache = await getDataCache(sessionKey);
  if (sessionCache == null) return;
  try {
    const sessionData = JSON.parse(sessionCache) as ISessionData;
    return sessionData;
  } catch (error: any) {
    console.log(`getSession() method error: `, error);
  }
};

export const sessionLastAccess = async (userId: string, sessionId: string) => {
  const sessionKey = `${configs.SESSION_KEY_NAME}:${userId}:${sessionId}`;

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

export const validateMFAAccess = async (
  sessionKey: string,
  sessionData: ISessionData
) => {
  await setDataCache(
    sessionKey,
    JSON.stringify({ ...sessionData, mfa: true }),
    { keepTTL: true }
  );
};

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

export const deleteSession = async (userId: string, sessionId: string) => {
  const sessionKey = `${configs.SESSION_KEY_NAME}:${userId}:${sessionId}`;
  await deteleDataCache(sessionKey);
};

export const deleteSessionByKey = async (sessionKey: string) => {
  await deteleDataCache(sessionKey);
};
