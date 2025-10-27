import express from "express";

import { error404Middleware } from "../middlewares/response.js";

const router = express.Router();

router.all("/{*anything}", error404Middleware);

export default router;
