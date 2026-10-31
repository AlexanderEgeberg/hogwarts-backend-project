import { Router } from "express";
import * as studentsController from "../controllers/students.controller.ts";

export const studentsRouter = Router();

studentsRouter.get("/", studentsController.getAll);
studentsRouter.get("/:id", studentsController.getById);
studentsRouter.post("/", studentsController.create);
studentsRouter.put("/:id", studentsController.update);
studentsRouter.delete("/:id", studentsController.remove);
