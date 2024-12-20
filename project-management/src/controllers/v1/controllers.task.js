import * as taskService from "#src/services/services.task";

import { errorResponse, successResponse } from "#src/utils/response";

import { StatusCodes } from "http-status-codes";

export const createTask = async (req, res, next) => {
  try {
    const { title, description, due_date, assigned_to, projectId } = req.body;
    const userId = req.locals.user.id;

    const task = await taskService.createTask(
      {
        title,
        description,
        due_date,
        assigned_to,
        projectId,
      },
      userId
    );
    successResponse(
      res,
      "Task created successfully.",
      task,
      StatusCodes.CREATED
    );
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.locals.user.id;
    const task = await taskService.updateTask(id, req.body, userId);

    if (!task) {
      return errorResponse(res, "Task not found.", null, StatusCodes.NOT_FOUND);
    }

    successResponse(res, "Task updated successfully.", task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userId = req.locals.user.id;
    const task = await taskService.deleteTask(id);

    const isOwner = await taskService.isProjectOwner(task.projectId, userId);

    if (!isOwner) {
      return errorResponse(
        res,
        "Only the project owner can delete tasks.",
        null,
        StatusCodes.FORBIDDEN
      );
    }

    if (!task) {
      return errorResponse(res, "Task not found.", null, StatusCodes.NOT_FOUND);
    }

    successResponse(res, "Task deleted successfully.", task);
  } catch (error) {
    next(error);
  }
};

export const assignTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;
    const userId = req.locals.user.id;

    const task = await taskService.getTaskById(id);
    if (!task) {
      return errorResponse(res, "Task not found.", null, StatusCodes.NOT_FOUND);
    }

    const isOwner = await taskService.isProjectOwner(task.projectId, userId);
    if (!isOwner) {
      return errorResponse(
        res,
        "Only the project owner can assign tasks.",
        null,
        StatusCodes.FORBIDDEN
      );
    }

    const updatedTask = await taskService.assignTask(id, assignedTo);

    successResponse(res, "Task assigned successfully.", updatedTask);
  } catch (error) {
    next(error);
  }
};

export const getTasksByProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.locals.user.id;
    const tasks = await taskService.getTasksByProjectId(projectId, userId);

    successResponse(
      res,
      "Tasks retrieved successfully.",
      tasks,
      StatusCodes.OK
    );
  } catch (error) {
    next(error);
  }
};
