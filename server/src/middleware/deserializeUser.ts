import { RequestHandler as Middleware } from "express";
import configs from "@/configs";
import { User } from "@/schema/user";
import { getUserById } from "@/services/user";
import { deleteSessionByKey, sessionLastAccess } from "@/redis/session";
import { decrypt, encrypt } from "@/utils/helper";

declare global {
  namespace Express {
    interface Request {
      user?: User | null;
    }
  }
}

const deserializeUser: Middleware = async (req, res, next) => {
  if (!req.sessionData || !req.sessionKey) return next();

  req.user = await getUserById(req.sessionData.userId, {
    oauthProviders: {
      select: {
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
