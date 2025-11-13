import { NextFunction, Request, Response } from "express-serve-static-core";
import { matchedData, validationResult } from "express-validator";

import { makeResObj } from "../helpers/utils.js";
import { messages } from "../helpers/messages.js";

export async function updateUser(
  req: Request,
  res: Response,
  _next: NextFunction
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

  const userId: number = validatedData.userId;
  delete validatedData.userId;

  return res.status(200).json({ message: "Yup" });
}
