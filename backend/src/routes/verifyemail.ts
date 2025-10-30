import express from "express";

import { verifyemailValidator } from "../middlewares/validation.js";
import { verifyemail } from "../controllers/verifyemail.js";

const router = express.Router();

router.post("/", verifyemailValidator(), verifyemail);

export default router;
