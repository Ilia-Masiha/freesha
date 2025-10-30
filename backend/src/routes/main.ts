import express from "express";

import { error404Middleware } from "../middlewares/response.js";
import registerRouter from "./register.js";
import verifyemailRouter from "./verifyemail.js";

const router = express.Router();

router.use("/register", registerRouter);
router.use("/verifyemail", verifyemailRouter);

router.all("/{*anything}", error404Middleware);

export default router;
