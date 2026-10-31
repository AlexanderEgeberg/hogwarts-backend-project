import type { Request, Response } from "express";
import * as housesRepository from "../repositories/houses.repository.ts";

export const getAll = async (req: Request, res: Response) => {
  res.json(await housesRepository.findAll());
};

export const getByName = async (
  req: Request<{ name: string }>,
  res: Response,
) => {
  const house = await housesRepository.findByName(req.params.name);
  if (!house) throw 404;
  res.json(house);
};
