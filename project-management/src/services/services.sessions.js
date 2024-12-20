import Session from "#src/models/models.session";
import { CustomError } from "#src/utils/customError";
import httpStatus from "http-status-codes";

export const createSession = async (userId) => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  const session = new Session({
    userId,
    expiresAt,
  });

  await session.save();
  return session;
};

export const invalidateSession = async (sessionId) => {
  const session = await Session.findByIdAndDelete(sessionId);
  if (!session) {
    throw new CustomError("Session not found.", httpStatus.NOT_FOUND);
  }
  return session;
};
