import express, {
  type Express,
  Request,
  Response,
  NextFunction,
} from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import configs from "./configs";
import helmet from "helmet";
import compression from "compression";
import { StatusCodes } from "http-status-codes";
import { Server } from "socket.io";

import { Customerror, IErrorResponse, NotFoundError } from "./error-handler";
import { appRouter } from "./routes";
import { initRedis } from "./redis/connection";
import deserializeUser from "./middleware/deserializeUser";
import { Redis } from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";

const app: Express = express();
const SERVER_PORT = 4000;

app.set("trust proxy", 1);
app.use(morgan(configs.NODE_ENV == "production" ? "combined" : "dev"));
app.use(helmet());
app.use(
  cors({
    origin: configs.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(compression());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

initRedis();
app.use(deserializeUser);

appRouter(app);

// handle 404
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});
// handle error
app.use(
  (error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof Customerror) {
      if (error.statusCode == StatusCodes.UNAUTHORIZED) {
        // res.clearCookie("session");
      }
      return res.status(error.statusCode).json(error.serializeErrors());
    }
    console.log(error);
    // req.session.destroy(function (err) {});
    // res.clearCookie("session");
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong" });
  }
);

const startHttpServer = (httpServer: http.Server) => {
  try {
    console.log(`App server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      console.log(`App server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    console.log("startHttpServer() method error:", error);
  }
};

const createSocketIO = async (httpServer: http.Server) => {
  const pubClient = new Redis(configs.REDIS_HOST);
  const subClient = pubClient.duplicate();
  await Promise.all([pubClient.connect(), subClient.connect()]);

  const io: Server = new Server(httpServer, {
    cors: {
      origin: `${configs.CLIENT_URL}`,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    },
    adapter: createAdapter(pubClient, subClient),
  });

  return io;
};

const startServer = async () => {
  try {
    const httpServer: http.Server = new http.Server(app);
    const socketIO: Server = await createSocketIO(httpServer);
    startHttpServer(httpServer);
    // socketIOConnections(socketIO);
  } catch (error) {
    console.log("startServer() error method:", error);
  }
};
startServer();

export default app;
