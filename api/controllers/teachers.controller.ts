import type { Request, Response } from "express";
import { z } from "zod";
import * as housesRepository from "../repositories/houses.repository.ts";
import * as teachersRepository from "../repositories/teachers.repository.ts";

const Id = z.coerce.number().int().positive();

const TeacherBody = z.object({
  name: z.string().trim().min(1),
  house: z.string().min(1),
});

const parseBody = async (body: unknown) => {
  const data = TeacherBody.parse(body);
  const house = await housesRepository.findByName(data.house);
  if (!house) throw 400;
  return data;
};

export const getAll = async (req: Request, res: Response) => {
  res.json(await teachersRepository.findAll());
};

export const getById = async (req: Request, res: Response) => {
  const teacher = await teachersRepository.findById(Id.parse(req.params.id));
  if (!teacher) throw 404;
  res.json(teacher);
};

export const create = async (req: Request, res: Response) => {
  const teacher = await teachersRepository.create(await parseBody(req.body));
  res.status(201).json(teacher);
};

export const update = async (req: Request, res: Response) => {
  const teacher = await teachersRepository.update(
    Id.parse(req.params.id),
    await parseBody(req.body),
  );
  if (!teacher) throw 404;
  res.json(teacher);
};

export const remove = async (req: Request, res: Response) => {
  const removed = await teachersRepository.remove(Id.parse(req.params.id));
  if (!removed) throw 404;
  res.sendStatus(204);
};
