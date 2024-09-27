import "express-async-errors";

import express, {
  type Express,
  Request,
  Response,
  NextFunction,
} from "express";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";

import { appRoutes } from "@/routes";
import { CustomError, IErrorResponse, NotFoundError } from "./error-handler";
import configs from "./configs";
import deserializeUser from "./middleware/deserializeUser";

const app: Express = express();

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
app.use(deserializeUser);

appRoutes(app);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

app.use(
  (error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
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

export default app;
