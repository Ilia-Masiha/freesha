import { body } from "express-validator";

export const nameValidator = () =>
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .isLength({ min: 1, max: 40 })
    .withMessage("name length can not exceed 40");

export const emailValidator = () =>
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email must be a string")
    .isLength({ max: 320 })
    .withMessage("email length can not exceed 320")
    .isEmail()
    .withMessage("email must be valid");

export const passwordValidator = () =>
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string")
    .isLength({ max: 10_000 })
    .withMessage("Are you serious?")
    .isStrongPassword()
    .withMessage("Password is too weak");

export const registerValidator = () => [
  nameValidator(),
  emailValidator(),
  passwordValidator(),
];
