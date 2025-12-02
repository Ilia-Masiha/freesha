import { NextFunction, Request, Response } from "express-serve-static-core";

import { clearSessionData } from "../middlewares/auth.js";
import { None } from "../helpers/types.js";
import { isNone, makeResObj } from "../helpers/utils.js";
import { messages } from "../helpers/messages.js";

export async function logout(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response | void> {
  const sessionKey: string | None = req.cookies.sessionKey;
  const data = { alreadyLoggedOut: true };

  if (!isNone(sessionKey)) {
    await clearSessionData(res, sessionKey);
    data.alreadyLoggedOut = false;
  }

  const resObj = makeResObj(messages.successfulLogout, data);
  return res.status(200).json(resObj);
}
