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

const getContinents = async (request: Request, response: Response) => {
  response.json(continents).status(200);
};

module.exports = { getContinents };
