import { NextFunction, Request, Response } from "express-serve-static-core";
import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcryptjs";

import * as db from "../database/db.js";
import { redisGet } from "../database/redis.js";
import { messages } from "../helpers/messages.js";
import { PreRegisterInfo } from "../helpers/types.js";
import { makeResObj } from "../helpers/utils.js";

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

  const preRegisterInfoJson = await redisGet(`pre-register:${email}`);
  if (!preRegisterInfoJson || typeof preRegisterInfoJson !== "string") {
    const resObj = makeResObj(messages.invalidOtp);
    return res.status(401).json(resObj);
  }

  const preRegisterInfo: PreRegisterInfo = JSON.parse(preRegisterInfoJson);

  const dbResponse = await db.insertUser(preRegisterInfo);
  if (dbResponse.error || !dbResponse.result) {
    return next(dbResponse.error);
  }

  const id: number = dbResponse.result as number;

  const dbResponse2 = await db.getUser(id);
  if (dbResponse2.error || !dbResponse2.result) {
    return next(dbResponse2.error);
  }

  const userInfo = dbResponse2.result;

  const resObj = makeResObj(messages.successfulRegister, userInfo);
  return res.sendStatus(201).json(resObj);
}
