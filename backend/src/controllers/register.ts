import { NextFunction, Request, Response } from "express-serve-static-core";
import nodemailer from "nodemailer";

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

export function register(
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  return res.sendStatus(201);
}
