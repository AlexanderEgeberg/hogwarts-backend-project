import { Router } from "express";
import * as coursesController from "../controllers/courses.controller.ts";

export const coursesRouter = Router();

coursesRouter.get("/", coursesController.getAll);
coursesRouter.get("/:id", coursesController.getById);
coursesRouter.post("/", coursesController.create);
coursesRouter.put("/:id", coursesController.update);
coursesRouter.delete("/:id", coursesController.remove);
coursesRouter.put("/:id/teacher", coursesController.changeTeacher);
coursesRouter.post("/:id/students", coursesController.addStudent);
coursesRouter.delete("/:id/students/:studentId", coursesController.removeStudent);
