import { body } from "express-validator";

export const nameValidator = () =>
  body("name")
    .trim()
    .notEmpty()
    .withMessage("نام ضروری است")
    .isString()
    .withMessage("نام باید یک رشته باشد")
    .isLength({ min: 6, max: 40 })
    .withMessage("نام کاربری باید بین 6 تا 40 کاراکتر باشد");

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
    .withMessage("رمز عبور ضروری است")
    .isString()
    .withMessage("رمز عبور باید یک رشته باشد")
    .isLength({ max: 10_000 })
    .withMessage("حالت خوبه؟")
    .isStrongPassword()
    .withMessage("رمز عبور ضعیف است");

export const otpValidator = () =>
  body("otp")
    .notEmpty()
    .withMessage("کد تائید ضروری است")
    .isString()
    .withMessage("کد تائید باید یک رشته باشد")
    .isLength({ min: 5, max: 5 })
    .withMessage("کد تائید باید دقیقا 5 کاراکتر باشد");

export const postalCodeValidator = () =>
  body("postalCode")
    .notEmpty()
    .withMessage("کد پستی نمی تواند خالی باشد")
    .isString()
    .withMessage("کد پستی باید یک رشته باشد")
    .isLength({ min: 10, max: 10 })
    .withMessage("کد پستی باید دقیقا 10 کاراکتر باشد")
    .isNumeric()
    .withMessage("کد پستی باید فقط شامل ارقام باشد");

export const homeAddress = () =>
  body("homeAddress")
    .notEmpty()
    .withMessage("آدرس محل سکونت نمی تواند خالی باشد")
    .isString()
    .withMessage("آدرس محل سکونت باید یک رشته باشد")
    .isLength({ max: 500 })
    .withMessage("آدرس محل سکونت نباید بیش از 500 کاراکتر باشد");

export const genderId = () =>
  body("genderId")
    .notEmpty()
    .withMessage("جنسیت نمی تواند خالی باشد")
    .isInt({ gt: 0, lt: 4 })
    .withMessage("جنسیت باید عددی از 1 تا 3 باشد");

export const registerValidator = () => [
  nameValidator(),
  emailValidator(),
  passwordValidator(),
];

export const verifyemailValidator = () => [emailValidator(), otpValidator()];

export const loginValidator = () => [emailValidator(), passwordValidator()];
