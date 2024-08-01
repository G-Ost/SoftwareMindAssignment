import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (request: Request, response: Response) => {
  const body = request.body;
  console.log(body);
  User.create(body).then(() => {
    response.sendStatus(200);
  });
};
