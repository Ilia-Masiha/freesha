import express from "express";

import { getUser, updateUser } from "../controllers/users.js";
import {
  getUserValidator,
  updateUserValidator,
} from "../middlewares/validation.js";
import { verifyUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:userId", verifyUser, getUserValidator(), getUser);
router.patch("/:userId", verifyUser, updateUserValidator(), updateUser);

export default router;
