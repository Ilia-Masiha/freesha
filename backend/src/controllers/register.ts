import { NextFunction, Request, Response } from "express-serve-static-core";
import { matchedData, validationResult } from "express-validator";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import path from "node:path";

import * as db from "../database/db.js";
import { redisSet } from "../database/redis.js";
import { generateOtp } from "../helpers/utils.js";
import { messages } from "../helpers/messages.js";

const __filename = fileURLToPath(import.meta.url);

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOtp(to: string, otp: string) {
  let emailContent = readFileSync(
    path.join(__filename, "/../../../misc/otp_email.html"),
    "utf-8"
  );

  emailContent = emailContent.replace("==OTP==", otp);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "فریشا - کد تائید ایمیل",
    html: emailContent,
  };

  await transporter.sendMail(mailOptions);
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const validationError = validationResult(req).array()[0];

  if (validationError) {
    const message = validationError.msg;
    return res.status(400).json({ message });
  }

  const { name, email, password } = matchedData(req);

  const dbResult = await db.emailExists(email);

  if (dbResult.result) {
    const message = messages.usedEmail;
    return res.status(409).json({ message });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const preRegisterInfo = JSON.stringify({ name, email, hashedPassword });
  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 12);

  try {
    await sendOtp(email, otp);
  } catch (error) {
    return next(new Error("Failed to send OTP email"));
  }

  await redisSet(`otp:${email}`, hashedOtp, 5 * 60);
  await redisSet(`pre-register:${email}`, preRegisterInfo, 6 * 60);

  const message = messages.sentOtp;
  return res.status(200).json({ message });
}
