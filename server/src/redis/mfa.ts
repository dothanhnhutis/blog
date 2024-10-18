import { User } from "@/schema/user";
import { v4 as uuidv4 } from "uuid";
import { getDataCache, setDataInSecondCache } from "./cache";
import { generateOTP } from "@/utils/helper";
import { generateMFA, TOTPType } from "@/utils/mfa";

export const createMFASession = async (user: User) => {
  const sessionId = uuidv4();
  const sessionKey = `mfa:${sessionId}`;
  await setDataInSecondCache(sessionKey, JSON.stringify(user), 60 * 5);
  return sessionId;
};

export const getMFASession = async (sessionId: string) => {
  try {
    const sessionCache = await getDataCache(`mfa:${sessionId}`);
    if (sessionCache == null) return;
    const sessionData = JSON.parse(sessionCache) as User;
    return sessionData;
  } catch (error: any) {
    console.log(`getMFASession() method error: `, error);
  }
};

export const generateMFASetup = async (userId: string, deviceName: string) => {
  const totpDataCache = await getDataCache(`mfasetup:${userId}`);
  let backupCodes: string[], totp: TOTPType;
  if (totpDataCache) {
    const mfaData = JSON.parse(totpDataCache) as {
      backupCodes: string[];
      totp: TOTPType;
    };
    backupCodes = mfaData.backupCodes;
    totp = mfaData.totp;
  } else {
    backupCodes = Array.from({ length: 10 }).map(() => generateOTP());
    totp = generateMFA(deviceName);
    await setDataInSecondCache(
      `mfasetup:${userId}`,
      JSON.stringify({
        backupCodes,
        totp,
      }),
      60 * 60
    );
  }
  return { backupCodes, totp };
};

export const getMFASetup = async (userId: string) => {
  try {
    const totpInfo = await getDataCache(`mfasetup:${userId}`);
    if (!totpInfo) return;
    return JSON.parse(totpInfo) as {
      backupCodes: string[];
      totp: TOTPType;
    };
  } catch (error) {
    console.log(`getMFASetup() method error: `, error);
  }
};
