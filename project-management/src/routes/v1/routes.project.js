import * as projectController from "#src/controllers/v1/controllers.project";

import {
  createProjectValidator,
  projectIdValidator,
  updateProjectValidator,
} from "#src/middlewares/validators/validators.project";

import { authenticate } from "#src/middlewares/authenticate";
import { validate } from "#src/middlewares/validator";
import express from "express";

const router = express.Router();

router.post(
  "/",
  authenticate,
  createProjectValidator,
  validate,
  projectController.createProject
);

router.patch(
  "/:id",
  authenticate,
  updateProjectValidator,
  validate,
  projectController.updateProject
);

router.delete(
  "/:id",
  authenticate,
  projectIdValidator,
  validate,
  projectController.deleteProject
);

router.get("/", authenticate, projectController.getUserProjects);

router.get(
  "/:id",
  authenticate,
  projectIdValidator,
  validate,
  projectController.getProject
);

export default router;
