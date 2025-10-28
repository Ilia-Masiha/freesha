import express from "express";

import { error404Middleware } from "../middlewares/response.js";
import { registerUser } from "../controllers/register.js";

const router = express.Router();

router.post("/", registerUser);

router.all("/{*anything}", error404Middleware);

export default router;
