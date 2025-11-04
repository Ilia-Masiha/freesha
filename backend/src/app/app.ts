import express from "express";
import { Application } from "express-serve-static-core";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import mainRouter from "../routes/main.js";
import { timeNow } from "../helpers/utils.js";
import { generalErrorHandler, limitResponse } from "../middlewares/response.js";

morgan.token("time-only", () => {
  return timeNow();
});

export function createApp(): Application {
  const app: Application = express();

  const minuteLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 65,
    message: limitResponse,
  });

  const secondLimiter = rateLimit({
    windowMs: 1 * 1000,
    limit: 3,
    message: limitResponse,
  });

  app.use(minuteLimiter);
  app.use(secondLimiter);
  app.use(cookieParser());
  app.use(cors());
  app.use(
    morgan("(:time-only) [MORGAN] :method :url :status - :response-time ms")
  );
  app.use(express.json());

  app.use(mainRouter);

  app.use(generalErrorHandler);

  return app;
}
