import { NextFunction, Request, Response } from "express-serve-static-core";

import { makeResObj } from "../helpers/utils.js";
import { messages } from "../helpers/messages.js";
import { None, SessionData } from "../helpers/types.js";
import { redisDel, redisGet, redisSet } from "../database/redis.js";

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const sessionKey: string | None = req.cookies.sessionKey;

  if (!sessionKey) {
    const resObj = makeResObj(messages.error401);
    return res.status(401).json(resObj);
  }

  const sessionDataJson = (await redisGet(`session:${sessionKey}`))?.toString();

  if (!sessionDataJson) {
    const resObj = makeResObj(messages.error401);
    return res.status(401).json(resObj);
  }

  req.sessionData = JSON.parse(sessionDataJson);

  return next();
}

export async function setSessionData(
  res: Response,
  sessionKey: string,
  sessionData: SessionData
) {
  const sessionDataJson = JSON.stringify(sessionData);

  await redisSet(`session:${sessionKey}`, sessionDataJson, 24 * 60 * 60);

  res.cookie("sessionKey", sessionKey, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
}

export async function clearSessionData(res: Response, sessionKey: string) {
  await redisDel(`session:${sessionKey}`);

  res.clearCookie("sessionKey", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}
