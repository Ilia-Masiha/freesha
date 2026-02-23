import express from "express";

import {
  createJobPostValidator,
  getJobPostValidator,
  getJobPostsValidator,
} from "../middlewares/validation/job_posts.js";
import { verifyUser } from "../middlewares/auth.js";
import {
  createJobPost,
  getJobPost,
  getJobPosts,
} from "../controllers/job_posts.js";

const router = express.Router();

router.get("/", getJobPostsValidator(), getJobPosts);
router.get("/:jobPostSlug", getJobPostValidator(), getJobPost);

router.post("/", verifyUser, createJobPostValidator(), createJobPost);

export default router;
