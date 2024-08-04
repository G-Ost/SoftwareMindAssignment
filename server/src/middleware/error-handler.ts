import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-error";

const errorHandlerMiddleware = (
  error: CustomAPIError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || "Something went wrong try again later";
  return response.status(statusCode).json({ message });
};

export default errorHandlerMiddleware;
