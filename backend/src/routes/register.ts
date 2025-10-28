import express from "express";

import { error404Middleware } from "../middlewares/response.js";
import { registerValidator } from "../middlewares/validation.js";
import { register } from "../controllers/register.js";

const router = express.Router();

router.post("/", registerValidator, register);

router.all("/{*anything}", error404Middleware);

export default router;
