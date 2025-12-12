import { NextFunction, Request, Response } from "express-serve-static-core";
import { matchedData, validationResult } from "express-validator";

import * as db from "../database/db.js";
import { makeResObj } from "../helpers/utils.js";
import { messages } from "../helpers/messages.js";

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const validationError = validationResult(req).array()[0];

  if (validationError) {
    const resObj = makeResObj(validationError.msg);
    return res.status(400).json(resObj);
  }

  const validatedData = matchedData(req);

  if (Object.keys(validatedData).length < 2) {
    const resObj = makeResObj(messages.emptyReqBody);
    return res.status(400).json(resObj);
  }

  const { userId } = validatedData;
  if (userId !== req.sessionData?.id && req.sessionData?.roleName === "user") {
    const resObj = makeResObj(messages.error403);
    return res.status(403).json(resObj);
  }

  const dbResponse = await db.updateUser(userId, validatedData);
  if (dbResponse.error || !dbResponse.result) {
    return next(dbResponse.error);
  }

  const userInfo = dbResponse.result;

  const resObj = makeResObj(messages.updatedUser, userInfo);
  return res.status(200).json(resObj);
}

export async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const validationError = validationResult(req).array()[0];

  if (validationError) {
    const resObj = makeResObj(validationError.msg);
    return res.status(400).json(resObj);
  }

  const validatedData = matchedData(req);
  const { userId } = validatedData;

  if (userId !== req.sessionData?.id && req.sessionData?.roleName === "user") {
    const resObj = makeResObj(messages.error403);
    return res.status(403).json(resObj);
  }

  const dbResponse = await db.getUser(userId, validatedData.fields, false);
  if (dbResponse.error || !dbResponse.result) {
    return next(dbResponse.error);
  }

  const userInfo = dbResponse.result;

  const resObj = makeResObj(messages.gotUser, userInfo);
  return res.status(200).json(resObj);
}
