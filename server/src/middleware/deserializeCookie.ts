import { RequestHandler as Middleware } from "express";
import cookie from "cookie";
import configs from "@/configs";
import { getSession, ISessionData, sessionLastAccess } from "@/redis/session";
import { decrypt, encrypt } from "@/utils/helper";
import { PermissionError } from "@/error-handler";

declare global {
  namespace Express {
    interface Request {
      sessionKey?: string | undefined;
      sessionData?: ISessionData | undefined;
    }
  }
}

const deserializeCookie: Middleware = async (req, res, next) => {
  const cookies = req.get("cookie");
  if (!cookies || !cookie.parse(cookies)[configs.SESSION_KEY_NAME])
    return next();
  const cookiesParser = cookie.parse(cookies)[configs.SESSION_KEY_NAME];
  req.sessionKey = decrypt(cookiesParser, configs.SESSION_SECRET);
  if (!req.sessionKey) {
    res.clearCookie(configs.SESSION_KEY_NAME);
    return next();
  }

  req.sessionData = await getSession(req.sessionKey);
  if (!req.sessionData) {
    res.clearCookie(configs.SESSION_KEY_NAME);
    return next();
  }

  const newSession = await sessionLastAccess(req.sessionKey);
  if (newSession) {
    res.cookie(
      configs.SESSION_KEY_NAME,
      encrypt(req.sessionKey, configs.SESSION_SECRET),
      {
        ...newSession.cookie,
      }
    );
  }
  return next();
};
export default deserializeCookie;
