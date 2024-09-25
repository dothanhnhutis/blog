import { RequestHandler as Middleware } from "express";
import cookie from "cookie";
import configs from "@/configs";
import { User } from "@/schema/user";
import { getUserById } from "@/services/user";
import {
  deleteSessionByKey,
  getSession,
  ISessionData,
  sessionLastAccess,
} from "@/redis/session";
import { decrypt, encrypt } from "@/utils/helper";

declare global {
  namespace Express {
    interface Request {
      sessionKey?: string | undefined;
      sessionData?: ISessionData | undefined;
      user?: User | null;
    }
  }
}

const deserializeUser: Middleware = async (req, res, next) => {
  const cookies = req.get("cookie");
  if (!cookies || !cookie.parse(cookies)[configs.SESSION_KEY_NAME])
    return next();
  const cookiesParser = cookie.parse(cookies)[configs.SESSION_KEY_NAME];
  req.sessionKey = decrypt(cookiesParser, configs.SESSION_SECRET);
  req.sessionData = await getSession(req.sessionKey);
  if (!req.sessionData) {
    res.clearCookie(configs.SESSION_KEY_NAME);
    return next();
  }

  req.user = await getUserById(req.sessionData.userId, {
    oauthProviders: {
      select: {
        id: true,
        provider: true,
        providerId: true,
      },
    },
  });

  if (req.user) {
    const newSession = await sessionLastAccess(req.user.id, req.sessionData.id);
    if (newSession) {
      res.cookie(
        configs.SESSION_KEY_NAME,
        encrypt(req.sessionKey, configs.SESSION_SECRET),
        {
          ...newSession.cookie,
        }
      );
    }
  } else {
    res.clearCookie(configs.SESSION_KEY_NAME);
    await deleteSessionByKey(req.sessionKey);
  }

  return next();
};
export default deserializeUser;
