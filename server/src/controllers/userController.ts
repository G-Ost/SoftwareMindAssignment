import { Request, Response } from "express";
const User = require("../models/User");
const createUser = async (request: Request, response: Response) => {
  const body = request.body;
  console.log(body);
  User.create(body).then(() => {
    response.sendStatus(200);
  });
};

module.exports = { createUser };
