import type { Request, Response } from "express";
import { z } from "zod";
import * as teachersRepository from "../repositories/teachers.repository.ts";
import * as coursesRepository from "../repositories/courses.repository.ts";
import * as coursesService from "../services/courses.service.ts";

const id = z.coerce.number().int().positive();

const CourseBody = z.object({
  name: z.string().trim().min(1),
  teacherId: id,
});
const TeacherBody = z.object({ teacherId: id });
const StudentBody = z.object({ studentId: id });

const parseBody = async (body: unknown) => {
  const data = CourseBody.parse(body);
  const teacher = await teachersRepository.findById(data.teacherId);
  if (!teacher) throw 400;
  return data;
};

export const getAll = async (req: Request, res: Response) => {
  res.json(await coursesRepository.findAll());
};

export const getById = async (req: Request, res: Response) => {
  const course = await coursesRepository.findById(id.parse(req.params.id));
  if (!course) throw 404;
  res.json(course);
};

export const create = async (req: Request, res: Response) => {
  const course = await coursesRepository.create(await parseBody(req.body));
  res.status(201).json(course);
};

export const update = async (req: Request, res: Response) => {
  const course = await coursesRepository.update(
    id.parse(req.params.id),
    await parseBody(req.body),
  );
  if (!course) throw 404;
  res.json(course);
};

export const remove = async (req: Request, res: Response) => {
  const removed = await coursesRepository.remove(id.parse(req.params.id));
  if (!removed) throw 404;
  res.sendStatus(204);
};

export const changeTeacher = async (req: Request, res: Response) => {
  const { teacherId } = TeacherBody.parse(req.body);
  const course = await coursesService.changeTeacher(
    id.parse(req.params.id),
    teacherId,
  );
  res.json(course);
};

export const addStudent = async (req: Request, res: Response) => {
  const { studentId } = StudentBody.parse(req.body);
  await coursesService.addStudent(id.parse(req.params.id), studentId);
  res.sendStatus(201);
};

export const removeStudent = async (req: Request, res: Response) => {
  await coursesService.removeStudent(
    id.parse(req.params.id),
    id.parse(req.params.studentId),
  );
  res.sendStatus(204);
};
