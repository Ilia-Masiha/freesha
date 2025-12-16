import { NextFunction, Request, Response } from "express-serve-static-core";

import * as db from "../database/db.js";
import { makeResObj } from "../helpers/utils.js";
import { messages } from "../helpers/messages.js";

export async function createJobPost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const userId = req.sessionData!.id;

  const dbResponse = await db.getUser(userId, db.defaultFields, false);
  if (dbResponse.error) {
    return next(dbResponse.error);
  }

  const userInfo = dbResponse.result;

  if (!userInfo) {
    const resObj = makeResObj(messages.error401);
    return res.status(401).json(resObj);
  }

  const resObj = makeResObj(messages.successfulAuth, userInfo);
  return res.status(200).json(resObj);
}
