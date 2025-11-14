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

  if (Object.keys(validatedData).length < 1) {
    const resObj = makeResObj(messages.emptyReqBody);
    return res.status(400).json(resObj);
  }

  const userId: number = req.sessionData?.id!;

  const dbResponse = await db.updateUser(userId, validatedData);
  if (dbResponse.error || !dbResponse.result) {
    return next(dbResponse.error);
  }

  const userInfo = dbResponse.result;

  const resObj = makeResObj(messages.updatedUser, userInfo);
  return res.status(200).json(resObj);
}
