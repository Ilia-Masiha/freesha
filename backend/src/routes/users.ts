import express from "express";

import { updateUser } from "../controllers/users.js";
import { updateUserValidator } from "../middlewares/validation.js";

const router = express.Router();

router.patch("/:userId", updateUserValidator(), updateUser);

export default router;
