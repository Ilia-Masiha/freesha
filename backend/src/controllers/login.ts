import { NextFunction, Request, Response } from "express-serve-static-core";
import { matchedData, validationResult } from "express-validator";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";

import * as db from "../database/db.js";
import { makeResObj } from "../helpers/utils.js";
import { messages } from "../helpers/messages.js";
import { SessionData } from "../helpers/types.js";
import { setSessionData } from "../middlewares/auth.js";

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const validationError = validationResult(req).array()[0];

  if (validationError) {
    const resObj = makeResObj(validationError.msg);
    return res.status(400).json(resObj);
  }

  const { email, password } = matchedData(req);

  const dbResponse = await db.getUser(
    email,
    [...db.defaultFields, "hashedPassword"],
    true
  );
  if (dbResponse.error) {
    return next(dbResponse.error);
  }

  const userInfo = dbResponse.result;

  if (!userInfo) {
    const resObj = makeResObj(messages.error401);
    return res.status(401).json(resObj);
  }

  if (!userInfo.hashedPassword || !userInfo.roleName) {
    const resObj = makeResObj(messages.error401);
    return res.status(401).json(resObj);
  }

  const { hashedPassword } = userInfo;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);
  if (!passwordsMatch) {
    const resObj = makeResObj(messages.error401);
    return res.status(401).json(resObj);
  }

  const sessionData: SessionData = {
    id: userInfo.id!,
    name: userInfo.name!,
    email: userInfo.email!,
    roleName: userInfo.roleName!,
  };

  const dbResponse2 = await db.updateLastLogin(userInfo.id!);
  if (dbResponse2.error) {
    return next(dbResponse2.error);
  }

  await setSessionData(res, randomUUID(), sessionData);

  delete userInfo.hashedPassword;
  const resObj = makeResObj(messages.successfulLogin, userInfo);
  return res.status(200).json(resObj);
}
