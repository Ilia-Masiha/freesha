import { NextFunction, Request, Response } from "express-serve-static-core";
import { matchedData, validationResult } from "express-validator";

import * as db from "../database/db.js";
import { makeResObj } from "../helpers/utils.js";
import { JobPost } from "../helpers/types.js";
import { JobPostStatusIds } from "../helpers/enums.js";
import { messages } from "../helpers/messages.js";

export async function createJobPost(
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
  if (validatedData.budgetLow > validatedData.budgetHigh) {
    const resObj = makeResObj(messages.budgetLowHigh);
    return res.status(400).json(resObj);
  }

  const userId = req.sessionData!.id;
  const jobPost: JobPost = {
    clientId: userId,
    statusId: JobPostStatusIds.Pending,
    title: validatedData.title,
    description: validatedData.description,
    budget_low: validatedData.budgetLow,
    budget_high: validatedData.budgetHigh,
  };

  const dbResponse = await db.insertJobPost(jobPost);
  if (dbResponse.error || !dbResponse.result) {
    return next(dbResponse.error);
  }

  const resObj = makeResObj(messages.createdJobPost, {
    ...jobPost,
    ...dbResponse.result,
  });
  return res.status(201).json(resObj);
}
