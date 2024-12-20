import Project from "#src/models/models.project";
import Task from "#src/models/models.task";
import { CustomError } from "#src/utils/customError";
import createError from "http-errors";
import httpStatus from "http-status-codes";

export const createTask = async (data, userId) => {
  const { projectId } = data;

  const project = await Project.findOne({ _id: projectId, ownerId: userId });

  if (!project) {
    throw new CustomError(
      "You are not authorized to add tasks to this project.",
      httpStatus.NOT_FOUND
    );
  }
  const task = await Task.create(data);
  return task;
};

export const updateTask = async (id, updateData, userId) => {
  const task = await Task.findById(id);

  if (!task) {
    throw createError(404, "Task not found.");
  }

  const project = await Project.findOne({ _id: task.projectId });

  if (!project) {
    throw createError(404, "Project associated with the task not found.");
  }

  if (project.ownerId.toString() === userId.toString()) {
    return await Task.findByIdAndUpdate(id, updateData, { new: true });
  }

  if (task.assigned_to.toString() === userId.toString()) {
    const allowedStatuses = ["In Progress", "Completed"];
    if (updateData.status && allowedStatuses.includes(updateData.status)) {
      return await Task.findByIdAndUpdate(
        id,
        { status: updateData.status },
        { new: true }
      );
    } else {
      throw createError(
        403,
        "You are only allowed to update the status to 'In Progress' or 'Completed'."
      );
    }
  }

  throw createError(403, "You are not authorized to update this task.");
};

export const deleteTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    throw new CustomError("Task not found.", httpStatus.NOT_FOUND);
  }
  return task;
};

export const getTaskById = async (id) => {
  const task = await Task.findById(id);
  if (!task) {
    throw new CustomError("Task not found.", httpStatus.NOT_FOUND);
  }
  return task;
};

export const assignTask = async (taskId, assignedTo) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new CustomError("Task not found.", httpStatus.NOT_FOUND);
  }

  task.assignedTo = assignedTo;
  await task.save();

  return task;
};

export const isProjectOwner = async (projectId, userId) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new CustomError("Project not found.", httpStatus.NOT_FOUND);
  }

  return project.ownerId.toString() === userId.toString();
};

export const getTasksByProjectId = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, ownerId: userId });

  if (!project) {
    throw createError(
      httpStatus.FORBIDDEN,
      "You are not authorized to view tasks for this project."
    );
  }

  const tasks = await Task.aggregate([
    {
      $match: { projectId: project._id },
    },
    {
      $lookup: {
        from: "projects",
        localField: "projectId",
        foreignField: "_id",
        as: "projectDetails",
      },
    },
    {
      $unwind: "$projectDetails",
    },
    {
      $lookup: {
        from: "users",
        localField: "assigned_to",
        foreignField: "_id",
        as: "assignedUserDetails",
      },
    },
    {
      $unwind: {
        path: "$assignedUserDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        due_date: 1,
        status: 1,
        assigned_to: 1,
        assignedUserDetails: {
          name: "$assignedUserDetails.name",
          email: "$assignedUserDetails.email",
        },
        createdAt: 1,
        updatedAt: 1,
        project: "$projectDetails.title",
      },
    },
  ]);

  return tasks;
};
