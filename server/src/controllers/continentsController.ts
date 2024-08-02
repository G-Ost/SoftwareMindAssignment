import { Request, Response } from "express";

const continents = [
  "Afryka",
  "Ameryka Południowa",
  "Ameryka Północna",
  "Antarktyda",
  "Australia",
  "Azja",
  "Europa",
];

export const getContinents = async (request: Request, response: Response) => {
  response.json(continents).status(200);
};
