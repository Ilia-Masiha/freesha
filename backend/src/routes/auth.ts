import express from "express";

import { verifyUser } from "../middlewares/auth.js";
import { me } from "../controllers/auth.js";

const router = express.Router();

router.get("/me", verifyUser, me);

export default router;
