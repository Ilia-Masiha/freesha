import { body, param } from "express-validator";

import { isArrayUnique } from "../helpers/utils.js";

const nameValidator = () =>
  body("name")
    .trim()
    .notEmpty()
    .withMessage("نام ضروری است")
    .isString()
    .withMessage("نام باید یک رشته باشد")
    .isLength({ min: 6, max: 40 })
    .withMessage("نام کاربری باید بین 6 تا 40 کاراکتر باشد");

const emailValidator = () =>
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

const passwordValidator = () =>
  body("password")
    .notEmpty()
    .withMessage("رمز عبور ضروری است")
    .isString()
    .withMessage("رمز عبور باید یک رشته باشد")
    .isLength({ max: 10_000 })
    .withMessage("حالت خوبه؟")
    .isStrongPassword()
    .withMessage("رمز عبور ضعیف است");

const otpValidator = () =>
  body("otp")
    .notEmpty()
    .withMessage("کد تائید ضروری است")
    .isString()
    .withMessage("کد تائید باید یک رشته باشد")
    .isLength({ min: 5, max: 5 })
    .withMessage("کد تائید باید دقیقا 5 کاراکتر باشد");

const userIdValidator = () =>
  param("userId")
    .notEmpty()
    .withMessage("آیدی کاربر ضروری است")
    .isInt({ min: 1 })
    .withMessage("آیدی کاربر باید یک عدد صحیح مثبت باشد")
    .toInt();

const postalCodeValidator = () =>
  body("postalCode")
    .trim()
    .isString()
    .withMessage("کد پستی باید یک رشته باشد")
    .isLength({ min: 10, max: 10 })
    .custom((value: string) => value.length === 0 || value.length === 10)
    .withMessage("کد پستی باید 10 یا 0 کاراکتر باشد")
    .isNumeric()
    .withMessage("کد پستی باید فقط شامل ارقام باشد");

const homeAddressValidator = () =>
  body("homeAddress")
    .trim()
    .isString()
    .withMessage("آدرس محل سکونت باید یک رشته باشد")
    .isLength({ max: 500 })
    .withMessage("آدرس محل سکونت نباید بیش از 500 کاراکتر باشد");

const genderIdValidator = () =>
  body("genderId")
    .notEmpty()
    .withMessage("جنسیت نمی تواند خالی باشد")
    .isInt({ min: 1, max: 3 })
    .withMessage("جنسیت باید عددی صحیح از 1 تا 3 باشد");

const jobTitleValidator = () =>
  body("jobTitle")
    .trim()
    .isString()
    .withMessage("عنوان شغلی باید یک رشته باشد")
    .isLength({ max: 50 })
    .withMessage("عنوان شغلی نباید بیش از 50 کاراکتر باشد");

const bioValidator = () =>
  body("bio")
    .trim()
    .isString()
    .withMessage("بیوگرافی باید یک رشته باشد")
    .isLength({ max: 400 })
    .withMessage("بیوگرافی نباید بیش از 400 کاراکتر باشد");

const birthDateValidator = () =>
  body("birthDate")
    .notEmpty()
    .withMessage("تاریخ تولد نمی تواند خالی باشد")
    .isString()
    .withMessage("تاریخ تولد باید یک رشته باشد")
    .isDate({ format: "YYYY-MM-DD", strictMode: true, delimiters: ["-"] })
    .withMessage("تاریخ تولد باید در فرمت YYYY-MM-DD باشد");

const skillsValidator = () =>
  body("skills")
    .isArray({ min: 0 })
    .withMessage("مهارت ها باید یک آرایه باشد")
    .custom(isArrayUnique)
    .withMessage("مهارت ها نباید تکراری باشند");

const skillsItemsValidator = () =>
  body("skills.*")
    .isString()
    .withMessage("درایه های مهارت ها باید رشته باشند")
    .isLength({ min: 1, max: 25 })
    .withMessage("درایه های مهارت ها باید بین 1 تا 25 کاراکتر باشند");

const languageCodesValidator = () =>
  body("languageCodes")
    .isArray({ min: 0 })
    .withMessage("کد زبان ها باید یک آرایه باشد")
    .custom(isArrayUnique)
    .withMessage("کد زبان ها نباید تکراری باشند");

const languageCodesItemsValidator = () =>
  body("languageCodes.*")
    .isString()
    .withMessage("درایه های کد زبان ها باید رشته باشند")
    .isLength({ min: 2, max: 2 })
    .withMessage("درایه های کد زبان ها باید دقیقا 2 کاراکتر باشند");

export const registerValidator = () => [
  nameValidator(),
  emailValidator(),
  passwordValidator(),
];

export const verifyemailValidator = () => [emailValidator(), otpValidator()];

export const loginValidator = () => [emailValidator(), passwordValidator()];

export const updateUserValidator = () => [
  userIdValidator(),

  nameValidator().optional(),

  postalCodeValidator().optional(),
  homeAddressValidator().optional(),
  genderIdValidator().optional(),
  jobTitleValidator().optional(),
  bioValidator().optional(),
  birthDateValidator().optional(),

  skillsValidator().optional(),
  skillsItemsValidator().optional(),
  languageCodesValidator().optional(),
  languageCodesItemsValidator().optional(),
];
