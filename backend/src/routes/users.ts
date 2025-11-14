import express from "express";

import { updateUser } from "../controllers/users.js";
import { updateUserValidator } from "../middlewares/validation.js";
import { verifyUser } from "../middlewares/auth.js";

const router = express.Router();

router.patch("/", verifyUser, updateUserValidator(), updateUser);

export default router;
