import express from "express";

import { SessionData } from "../../helpers/types.js";

declare global {
  namespace Express {
    interface Request {
      sessionData?: SessionData;
    }
  }
}
