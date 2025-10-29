import express from "express";

import { registerValidator } from "../middlewares/validation.js";
import { register } from "../controllers/register.js";

const router = express.Router();

router.post("/", registerValidator(), register);

export default router;
