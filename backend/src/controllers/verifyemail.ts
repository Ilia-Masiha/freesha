import { NextFunction, Request, Response } from "express-serve-static-core";
import { validationResult, matchedData } from "express-validator";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";

import * as db from "../database/db.js";
import { redisDel, redisGet } from "../database/redis.js";
import { messages } from "../helpers/messages.js";
import { PreRegisterInfo, SessionData, User } from "../helpers/types.js";
import { makeResObj } from "../helpers/utils.js";
import { setSessionData } from "../middlewares/auth.js";

export async function verifyemail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const validationError = validationResult(req).array()[0];

  if (validationError) {
    const resObj = makeResObj(validationError.msg);
    return res.status(400).json(resObj);
  }

  const { otp, email } = matchedData(req);

  const hashedOtp = await redisGet(`otp:${email}`);
  if (!hashedOtp || typeof hashedOtp !== "string") {
    const resObj = makeResObj(messages.invalidOtp);
    return res.status(401).json(resObj);
  }

  const otpsMatch = await bcrypt.compare(otp, hashedOtp);
  if (!otpsMatch) {
    const resObj = makeResObj(messages.invalidOtp);
    return res.status(401).json(resObj);
  }

  const preRegisterInfoJson = (
    await redisGet(`pre-register:${email}`)
  )?.toString();
  if (!preRegisterInfoJson) {
    const resObj = makeResObj(messages.invalidOtp);
    return res.status(401).json(resObj);
  }

  const preRegisterInfo: PreRegisterInfo = JSON.parse(preRegisterInfoJson);

  const dbResult = await db.insertUser(preRegisterInfo);
  if (dbResult.error || !dbResult.result) {
    return next(dbResult.error);
  }

  const id: number = dbResult.result as number;

  const dbResult2 = await db.getUser(id);
  if (dbResult2.error || !dbResult2.result) {
    return next(dbResult2.error);
  }

  await redisDel(`otp:${email}`);
  await redisDel(`pre-register:${email}`);

  const userInfo: User = dbResult2.result;
  const sessionData: SessionData = {
    id: userInfo.id,
    name: userInfo.name,
    email: userInfo.email,
    roleName: userInfo.roleName!,
  };
  await setSessionData(res, randomUUID(), sessionData);

  const resObj = makeResObj(messages.successfulRegister, userInfo);
  return res.status(201).json(resObj);
}
