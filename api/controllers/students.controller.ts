import type { Request, Response } from "express";
import { z } from "zod";
import * as housesRepository from "../repositories/houses.repository.ts";
import * as studentsRepository from "../repositories/students.repository.ts";

const Id = z.coerce.number().int().positive();

const StudentBody = z.object({
  name: z.string().trim().min(1),
  house: z.string().min(1),
});

const parseBody = async (body: unknown) => {
  const data = StudentBody.parse(body);
  const house = await housesRepository.findByName(data.house);
  if (!house) throw 400;
  return data;
};

export const getAll = async (req: Request, res: Response) => {
  res.json(await studentsRepository.findAll());
};

export const getById = async (req: Request, res: Response) => {
  const student = await studentsRepository.findById(Id.parse(req.params.id));
  if (!student) throw 404;
  res.json(student);
};

export const create = async (req: Request, res: Response) => {
  const student = await studentsRepository.create(await parseBody(req.body));
  res.status(201).json(student);
};

export const update = async (req: Request, res: Response) => {
  const student = await studentsRepository.update(
    Id.parse(req.params.id),
    await parseBody(req.body),
  );
  if (!student) throw 404;
  res.json(student);
};

export const remove = async (req: Request, res: Response) => {
  const removed = await studentsRepository.remove(Id.parse(req.params.id));
  if (!removed) throw 404;
  res.sendStatus(204);
};
