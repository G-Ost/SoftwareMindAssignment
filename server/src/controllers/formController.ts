import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (request: Request, response: Response) => {
  const body = request.body;
  await User.create(body);
  response.sendStatus(200);
};

export const getUsers = async (request: Request, response: Response) => {
  const users = await User.findAll();
  response.json(users).status(200);
};

export const deleteUser = async (request: Request, response: Response) => {
  const users = await User.findAll();
  response.json(users).status(200);
};
