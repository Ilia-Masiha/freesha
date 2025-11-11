import express from "express";

import { updateUser } from "../controllers/users.js";

const router = express.Router();

router.post("/:userId", updateUser);

export default router;
