import { body, param, query } from "express-validator";

import { categories } from "../../helpers/consts.js";
import { isArrayUnique } from "../../helpers/utils.js";

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

const jobPostSlugValidator = () =>
  param("jobPostSlug")
    .trim()
    .notEmpty()
    .withMessage("شناسه آگهی کار ضروری است")
    .isString()
    .withMessage("شناسه آگهی کار باید یک رشته")
    .isLength({ max: 100 })
    .withMessage("طول شناسه آگهی کار نباید بیش از 100 کاراکتر باشد");

const clientIdQueryValidator = () =>
  query("clientId")
    .trim()
    .notEmpty()
    .withMessage("آیدی کارفرما نمی تواند خالی باشد")
    .isInt({ min: 1 })
    .withMessage("آیدی کارفرما باید یک عدد صحیح مثبت باشد")
    .toInt();

const categoryIdQueryValidator = () =>
  query("categoryId")
    .trim()
    .notEmpty()
    .withMessage("آیدی دسته بندی نمی تواند خالی باشد")
    .isInt({ min: 0, max: categories.length - 1 })
    .withMessage(
      `آیدی دسته بندی باید عددی از 0 تا ${categories.length - 1} باشد`
    )
    .toInt();

const orderByQueryValidator = () =>
  query("orderBy")
    .trim()
    .notEmpty()
    .withMessage("مرتب سازی نمی تواند خالی باشد")
    .isString()
    .withMessage("مرتب سازی باید یک رشته باشد");

const budgetLowQueryValidator = () =>
  query("budgetLow")
    .trim()
    .notEmpty()
    .withMessage("کف بودجه نباید خالی باشد")
    .isInt({ min: 500_000, max: 1_000_000_000 })
    .withMessage(
      "کف بودجه باید عددی بین 500،000 ریال تا 1،000،000،000 ریال باشد"
    )
    .toInt();

const budgetHighQueryValidator = () =>
  query("budgetHigh")
    .trim()
    .notEmpty()
    .withMessage("سقف بودجه نباید خالی باشد")
    .isInt({ min: 500_000, max: 1_000_000_000 })
    .withMessage(
      "سقف بودجه باید عددی بین 500،000 ریال تا 1،000،000،000 ریال باشد"
    )
    .toInt();

const deadlineValidator = () =>
  body("deadline")
    .trim()
    .notEmpty()
    .withMessage("ددلاین ضروری است")
    .isString()
    .withMessage("ددلاین باید یک رشته باشد")
    .isDate({ format: "YYYY-MM-DD", strictMode: true, delimiters: ["-"] })
    .withMessage("ددلاین باید در فرمت YYYY-MM-DD باشد");

const categoryIdValidator = () =>
  body("categoryId")
    .notEmpty()
    .withMessage("آیدی دسته بندی ضروری است")
    .isInt({ min: 0, max: categories.length - 1 })
    .withMessage(
      `آیدی دسته بندی باید عددی از 0 تا ${categories.length - 1} باشد`
    )
    .toInt();

const requiredSkillsValidator = () =>
  body("requiredSkills")
    .isArray({ min: 0 })
    .withMessage("مهارت های مورد نیاز باید یک آرایه باشد")
    .custom(isArrayUnique)
    .withMessage("مهارت های مورد نیاز نباید تکراری باشند");

const requiredSkillsItemsValidator = () =>
  body("requiredSkills.*")
    .trim()
    .isString()
    .withMessage("درایه های مهارت های مورد نیاز باید رشته باشند")
    .isLength({ min: 1, max: 30 })
    .withMessage(
      "درایه های مهارت های مورد نیاز باید بین 1 تا 30 کاراکتر باشند"
    );

const tagsValidator = () =>
  body("tags")
    .isArray({ min: 0 })
    .withMessage("تگ ها باید یک آرایه باشد")
    .custom(isArrayUnique)
    .withMessage("تگ ها نباید تکراری باشند");

const tagsItemsValidator = () =>
  body("tags.*")
    .trim()
    .isString()
    .withMessage("درایه های تگ ها باید رشته باشند")
    .isLength({ min: 1, max: 30 })
    .withMessage("درایه های تگ ها باید بین 1 تا 30 کاراکتر باشند")
    .customSanitizer((tagItem: string) => tagItem.toLowerCase());

export const createJobPostValidator = () => [
  titleValidator(),
  descriptionValidator(),
  budgetLowValidator(),
  budgetHighValidator(),
  deadlineValidator(),
  categoryIdValidator(),

  requiredSkillsValidator(),
  requiredSkillsItemsValidator(),
  tagsValidator(),
  tagsItemsValidator(),
];

export const getJobPostValidator = () => [jobPostSlugValidator()];

export const getJobPostsValidator = () => [
  clientIdQueryValidator().optional(),
  categoryIdQueryValidator().optional(),
  orderByQueryValidator().optional(),
  budgetLowQueryValidator().optional(),
  budgetHighQueryValidator().optional(),
];
