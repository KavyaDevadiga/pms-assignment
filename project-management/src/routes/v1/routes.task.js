import * as taskController from "#src/controllers/v1/controllers.task";

import {
  assignTaskValidator,
  createTaskValidator,
  deleteTaskValidator,
  getTasksValidator,
  updateTaskValidator,
} from "#src/middlewares/validators/validators.task";

import { authenticate } from "#src/middlewares/authenticate";
import { validate } from "#src/middlewares/validator";
import express from "express";

const router = express.Router();

router.post(
  "/assignments/:id",
  authenticate,
  assignTaskValidator,
  validate,
  taskController.assignTask
);
router.get(
  "/:projectId",
  authenticate,
  getTasksValidator,
  validate,
  taskController.getTasksByProjectId
);
router.post(
  "/",
  authenticate,
  createTaskValidator,
  validate,
  taskController.createTask
);
router.patch(
  "/:id",
  authenticate,
  updateTaskValidator,
  validate,
  taskController.updateTask
);
router.delete(
  "/:id",
  authenticate,
  deleteTaskValidator,
  validate,
  taskController.deleteTask
);

export default router;
