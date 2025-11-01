import { NextFunction, Request, Response } from "express-serve-static-core";
import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcryptjs";

import { redisGet } from "../database/redis.js";
import { messages } from "../helpers/messages.js";
import { PreRegisterInfo } from "../helpers/types.js";

export async function verifyemail(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response | void> {
  const validationError = validationResult(req).array()[0];

  if (validationError) {
    const message = validationError.msg;
    return res.status(400).json({ message });
  }

  const { otp, email } = matchedData(req);

  const hashedOtp = await redisGet(`otp:${email}`);
  if (!hashedOtp || typeof hashedOtp !== "string") {
    const message = messages.invalidOtp;
    return res.status(401).send({ message });
  }

  const otpsMatch = await bcrypt.compare(otp, hashedOtp);
  if (!otpsMatch) {
    const message = messages.invalidOtp;
    return res.status(401).send({ message });
  }

  const preRegisterInfoJson = await redisGet(`pre-register:${email}`);
  if (!preRegisterInfoJson || typeof preRegisterInfoJson !== "string") {
    const message = messages.invalidOtp;
    return res.status(401).send({ message });
  }

  const preRegisterInfo: PreRegisterInfo = JSON.parse(preRegisterInfoJson);

  return res.sendStatus(201);
}
