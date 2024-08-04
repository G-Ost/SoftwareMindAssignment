import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import CustomAPIError from "../errors/custom-error";
import { StatusCodes } from "http-status-codes";

// Create user
export const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body;
  const { name, lastName, continent, birthDate } = body;

  const isNameProvided = !!name;

  if (!isNameProvided) {
    next(new CustomAPIError("Name is required.", StatusCodes.BAD_REQUEST));
    return;
  }

  const isExtraConditionMet =
    continent !== "Europa" || (lastName !== undefined && lastName.length > 1);

  if (!isExtraConditionMet) {
    next(
      new CustomAPIError(
        "Europians needs to have last name at least 2 characters long.",
        StatusCodes.BAD_REQUEST
      )
    );
    return;
  }

  const isBrithDateValid =
    birthDate === undefined ||
    new Date().getTime() - new Date(birthDate).getTime() >= 0;

  if (!isBrithDateValid) {
    next(
      new CustomAPIError(
        "User's birthdate is in the future.",
        StatusCodes.BAD_REQUEST
      )
    );
    return;
  }
  try {
    await User.create(body);
    response.sendStatus(200);
  } catch (error) {
    console.error("Error on user create:", error);
    next(
      new CustomAPIError(
        "Could not create user.",
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
};

// getUsers
export const getUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const users = await User.findAll();
    response.status(200).json(users);
  } catch (error) {
    console.error("Error on user deletion:", error);
    next(
      new CustomAPIError("Could ger users.", StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

// getUser
export const getUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.id;
  if (!userId) {
    next(new CustomAPIError("User id is required.", StatusCodes.BAD_REQUEST));
    return;
  }

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      next(
        new CustomAPIError(
          "No user with the given id was found.",
          StatusCodes.NOT_FOUND
        )
      );
      return;
    }
    response.status(200).json(user);
  } catch (error) {
    console.error("Error on user fetch:", error);
    next(
      new CustomAPIError(
        "Could not get user.",
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
};

// deleteUser
export const deleteUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.id;
  if (!userId) {
    next(new CustomAPIError("User id is required.", StatusCodes.BAD_REQUEST));
    return;
  }
  try {
    const result = await User.destroy({ where: { id: userId } });
    if (result === 0) {
      next(
        new CustomAPIError(
          "No user with the given id was found.",
          StatusCodes.NOT_FOUND
        )
      );
      return;
    }
    response.sendStatus(200);
  } catch (error) {
    console.error("Error on user deletion:", error);
    next(
      new CustomAPIError(
        "Could not delete user.",
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
};
