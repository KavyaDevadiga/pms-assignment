import Project from "#src/models/models.project";
import { CustomError } from "#src/utils/customError";
import httpStatus from "http-status-codes";

export const createProject = async (data) => {
  const project = await Project.create(data);
  return project;
};

export const updateProject = async (id, ownerId, updateData) => {
  const project = await Project.findOneAndUpdate(
    { _id: id, ownerId },
    updateData,
    { new: true }
  );
  if (!project) {
    throw new CustomError(
      "Project not found or you do not have permission to update it.",
      httpStatus.NOT_FOUND
    );
  }
  return project;
};

export const deleteProject = async (id, ownerId) => {
  const project = await Project.findOneAndDelete({ _id: id, ownerId });
  if (!project) {
    throw new CustomError(
      "Project not found or you do not have permission to delete it.",
      httpStatus.NOT_FOUND
    );
  }
  return project;
};

export const getProjectById = async (id, userId) => {
  const project = await Project.find({
    _id: id,
    $or: [{ ownerId: userId }, { assigned_users: userId }],
  }).populate("assigned_users", "name email");
  if (!project) {
    throw new CustomError("Project not found.", httpStatus.NOT_FOUND);
  }
  return project;
};

export const getProjectsByUser = (userId) => {
  return Project.find({
    $or: [{ ownerId: userId }, { assigned_users: userId }],
  }).populate("assigned_users", "name email");
};
