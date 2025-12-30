import express from "express";

import {
  createJobPostValidator,
  getJobPostValidator,
} from "../middlewares/validation/job_posts.js";
import { verifyUser } from "../middlewares/auth.js";
import { createJobPost, getJobPost } from "../controllers/job_posts.js";

const router = express.Router();

router.get("/", getJobPostValidator(), getJobPost);
router.get("/:jobPostId", getJobPostValidator(), getJobPost);

router.post("/", verifyUser, createJobPostValidator(), createJobPost);

export default router;
