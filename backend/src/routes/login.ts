import express from "express";

import { loginValidator } from "../middlewares/validation/users.js";
import { login } from "../controllers/login.js";

const router = express.Router();

router.post("/", loginValidator(), login);

export default router;
