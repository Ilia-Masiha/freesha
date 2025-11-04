import { body } from "express-validator";

export const nameValidator = () =>
  body("name")
    .trim()
    .notEmpty()
    .withMessage("نام ضروری است")
    .isString()
    .withMessage("نام باید یک رشته باشد")
    .isLength({ min: 1, max: 40 })
    .withMessage("نام نباید بیش از 40 کاراکتر باشد");

export const emailValidator = () =>
  body("email")
    .trim()
    .notEmpty()
    .withMessage("ایمیل ضروری است")
    .isString()
    .withMessage("ایمیل باید یک رشته باشد")
    .isLength({ max: 320 })
    .withMessage("ایمیل نباید بیش از 320 کاراکتر باشد")
    .isEmail()
    .withMessage("ایمیل باید معتبر باشد");

export const passwordValidator = () =>
  body("password")
    .notEmpty()
    .withMessage("پسورد ضروری است")
    .isString()
    .withMessage("پسورد باید یک رشته باشد")
    .isLength({ max: 10_000 })
    .withMessage("حالت خوبه؟")
    .isStrongPassword()
    .withMessage("پسورد ضعیف است");

export const otpValidator = () =>
  body("otp")
    .notEmpty()
    .withMessage("کد تائید ضروری است")
    .isString()
    .withMessage("کد تائید باید یک رشته باشد")
    .isLength({ min: 5, max: 5 })
    .withMessage("کد تائید باید دقیقا 5 کاراکتر باشد");

export const registerValidator = () => [
  nameValidator(),
  emailValidator(),
  passwordValidator(),
];

export const verifyemailValidator = () => [emailValidator(), otpValidator()];

export const loginValidator = () => [emailValidator(), passwordValidator()];
