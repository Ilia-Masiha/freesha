import { NextFunction, Request, Response } from "express-serve-static-core";
import { matchedData, validationResult } from "express-validator";
import nodemailer from "nodemailer";

import * as db from "../database/db.js";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOtp(to: string, otp: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Freesha - Your Verification Code",
    html: `
      <div>
        <h3>Email Verification</h3>

        <p><strong>NEVER SHARE THIS CODE WITH ANYONE</strong></p>
        <p>Your OTP code is: <strong>${otp}</strong></p>

        <p>This code will expire in 5 minutes.<br>
           If you didn't request the code, just ignore this email.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function register(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> {
  const validationError = validationResult(req).array()[0];

  if (validationError) {
    const message = validationError.msg;
    return res.status(400).json({ message });
  }

  const { name, email, password } = matchedData(req);

  if (await db.emailExists(email)) {
    const message = "This email is already in use";
    return res.status(409).json({ message });
  }

  return res.sendStatus(201);
}
