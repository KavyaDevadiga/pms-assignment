import * as projectService from "#src/services/services.project";

import { errorResponse, successResponse } from "#src/utils/response";

import { StatusCodes } from "http-status-codes";

export const createProject = async (req, res, next) => {
  try {
    const { name, description, start_date, end_date, assigned_users, title } =
      req.body;
    const ownerId = req.locals.user.id;

    const project = await projectService.createProject({
      name,
      description,
      ownerId,
      start_date,
      end_date,
      assigned_users,
      title,
    });
    successResponse(
      res,
      "Project created successfully.",
      project,
      StatusCodes.CREATED
    );
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ownerId = req.locals.user.id;

    const project = await projectService.updateProject(id, ownerId, req.body);

    if (!project) {
      return errorResponse(
        res,
        "Project not found or unauthorized.",
        null,
        StatusCodes.NOT_FOUND
      );
    }

    successResponse(res, "Project updated successfully.", project);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ownerId = req.locals.user.id;

    const project = await projectService.deleteProject(id, ownerId);

    if (!project) {
      return errorResponse(
        res,
        "Project not found or unauthorized.",
        null,
        StatusCodes.NOT_FOUND
      );
    }

    successResponse(res, "Project deleted successfully.", project);
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.locals.user.id;
    const project = await projectService.getProjectById(id, userId);

    if (!project || project.length === 0) {
      return errorResponse(
        res,
        "Project not found.",
        null,
        StatusCodes.NOT_FOUND
      );
    }

    successResponse(res, "Project retrieved successfully.", project);
  } catch (error) {
    next(error);
  }
};

export const getUserProjects = async (req, res, next) => {
  try {
    const userId = req.locals.user._id;
    const projects = await projectService.getProjectsByUser(userId);

    if (!projects || projects.length === 0) {
      return successResponse(
        res,
        "No projects found for this user.",
        [],
        StatusCodes.OK
      );
    }

    successResponse(res, "Projects fetched successfully.", projects);
  } catch (error) {
    next(error);
  }
};
