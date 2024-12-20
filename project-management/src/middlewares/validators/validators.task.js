import { body, param } from "express-validator";

export const createTaskValidator = [
  body("title")
    .isString()
    .withMessage("Title must be a string.")
    .notEmpty()
    .withMessage("Title is required."),

  body("description")
    .isString()
    .withMessage("Description must be a string.")
    .notEmpty()
    .withMessage("Description is required."),

  body("due_date")
    .isISO8601()
    .withMessage("Due date must be a valid ISO 8601 date.")
    .notEmpty()
    .withMessage("Due date is required."),

  body("assigned_to")
    .isMongoId()
    .withMessage("Assigned user ID must be a valid MongoDB ObjectId.")
    .notEmpty()
    .withMessage("Assigned user is required."),

  body("projectId")
    .isMongoId()
    .withMessage("Project ID must be a valid MongoDB ObjectId.")
    .notEmpty()
    .withMessage("Project ID is required."),
];

export const updateTaskValidator = [
  param("id").isMongoId().withMessage("Invalid task ID."),

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

  body("due_date")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date.")
    .notEmpty()
    .withMessage("Due date is required if provided."),

  body("assigned_to")
    .optional()
    .isMongoId()
    .withMessage("Assigned user ID must be a valid MongoDB ObjectId.")
    .notEmpty()
    .withMessage("Assigned user is required if provided."),
];

export const deleteTaskValidator = [
  param("id").isMongoId().withMessage("Invalid task ID."),
];

export const assignTaskValidator = [
  param("id").isMongoId().withMessage("Invalid task ID."),

  body("assignedTo")
    .isMongoId()
    .withMessage("Assigned user ID must be a valid MongoDB ObjectId.")
    .notEmpty()
    .withMessage("Assigned user is required."),
];

export const getTasksValidator = [
  param("projectId")
    .isMongoId()
    .withMessage("Project ID must be a valid MongoDB ObjectId."),
];
