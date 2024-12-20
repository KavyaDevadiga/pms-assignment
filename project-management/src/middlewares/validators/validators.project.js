import { body, param } from "express-validator";

export const createProjectValidator = [
  body("title")
    .isString()
    .withMessage("Title is required and must be a string.")
    .notEmpty()
    .withMessage("Title is required."),

  body("description")
    .isString()
    .withMessage("Description is required and must be a string.")
    .notEmpty()
    .withMessage("Description is required."),

  body("start_date")
    .isISO8601()
    .withMessage("Start date must be a valid date.")
    .notEmpty()
    .withMessage("Start date is required."),

  body("end_date")
    .isISO8601()
    .withMessage("End date must be a valid date.")
    .notEmpty()
    .withMessage("End date is required.")
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.start_date)) {
        throw new Error("End date must be after the start date.");
      }
      return true;
    }),
];

export const updateProjectValidator = [
  param("id").isMongoId().withMessage("Invalid project ID."),

  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string.")
    .notEmpty()
    .withMessage("Title is required if provided."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string.")
    .notEmpty()
    .withMessage("Description is required if provided."),

  body("start_date")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date.")
    .notEmpty()
    .withMessage("Start date is required if provided."),

  body("end_date")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date.")
    .notEmpty()
    .withMessage("End date is required if provided.")
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.start_date)) {
        throw new Error("End date must be after the start date.");
      }
      return true;
    }),
];

export const projectIdValidator = [
  param("id").isMongoId().withMessage("Invalid project ID."),
];
