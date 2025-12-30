import { body, param, query } from "express-validator";

const titleValidator = () =>
  body("title")
    .trim()
    .notEmpty()
    .withMessage("عنوان نباید خالی باشد")
    .isString()
    .withMessage("عنوان باید یک رشته باشد")
    .isLength({ min: 5, max: 60 })
    .withMessage("طول عنوان باید بین 5 تا 60 کاراکتر باشد");

const descriptionValidator = () =>
  body("description")
    .trim()
    .notEmpty()
    .withMessage("توضیحات نباید خالی باشد")
    .isString()
    .withMessage("توضیحات باید یک رشته باشد")
    .isLength({ min: 30, max: 5000 })
    .withMessage("طول توضیحات باید بین 30 تا 5000 کاراکتر باشد");

const budgetLowValidator = () =>
  body("budgetLow")
    .trim()
    .notEmpty()
    .withMessage("کف بودجه نباید خالی باشد")
    .isInt({ min: 500_000, max: 1_000_000_000 })
    .withMessage(
      "کف بودجه باید عددی بین 500،000 ریال تا 1،000،000،000 ریال باشد"
    )
    .toInt();

const budgetHighValidator = () =>
  body("budgetHigh")
    .trim()
    .notEmpty()
    .withMessage("سقف بودجه نباید خالی باشد")
    .isInt({ min: 500_000, max: 1_000_000_000 })
    .withMessage(
      "سقف بودجه باید عددی بین 500،000 ریال تا 1،000،000،000 ریال باشد"
    )
    .toInt();

const jobPostIdValidator = () =>
  param("jobPostId")
    .trim()
    .notEmpty()
    .withMessage("آیدی آگهی کار ضروری است")
    .isInt({ min: 1 })
    .withMessage("آیدی آگهی کار باید یک عدد صحیح مثبت باشد")
    .toInt();

const clientIdValidator = () =>
  query("clientId")
    .trim()
    .notEmpty()
    .withMessage("آیدی کارفرما ضروری است")
    .isInt({ min: 1 })
    .withMessage("آیدی کارفرما باید یک عدد صحیح مثبت باشد")
    .toInt();

export const createJobPostValidator = () => [
  titleValidator(),
  descriptionValidator(),
  budgetLowValidator(),
  budgetHighValidator(),
];

export const getJobPostValidator = () => [
  jobPostIdValidator().optional(),
  clientIdValidator().optional(),
];
