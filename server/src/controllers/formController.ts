import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (request: Request, response: Response) => {
  const body = request.body;
  const { name, lastName, continent, birthDate } = body;

  const isNameProvided = !!name;

  if (!isNameProvided) {
    return response.status(400).send("Name is required.");
  }

  const isExtraConditionMet =
    continent !== "Europa" || (lastName !== undefined && lastName.length > 1);

  if (!isExtraConditionMet) {
    return response
      .status(400)
      .send("Europians needs to have last name at least 2 characters long.");
  }

  const isBrithDateValid =
    birthDate === undefined ||
    new Date().getTime() - new Date(birthDate).getTime() >= 0;

  if (!isBrithDateValid) {
    return response.status(400).send("User's birthdate is in the future.");
  }
  await User.create(body);
  return response.sendStatus(200);
};

export const getUsers = async (request: Request, response: Response) => {
  const users = await User.findAll();
  response.json(users).status(200);
};

export const getUser = async (request: Request, response: Response) => {
  const userId = request.params.id;
  if (userId) {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      response.json(user).status(200);
      return;
    }
  }
  response.status(404).send("No user with the given id was found.");
};

export const deleteUser = async (request: Request, response: Response) => {
  const userId = request.params.id;
  if (userId) {
    await User.destroy({ where: { id: userId } });
    response.sendStatus(200);
    return;
  }
  response.status(404).send("No user with the given id was found.");
};
