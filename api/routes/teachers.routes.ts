import { Router } from "express";
import * as teachersController from "../controllers/teachers.controller.ts";

export const teachersRouter = Router();

teachersRouter.get("/", teachersController.getAll);
teachersRouter.get("/:id", teachersController.getById);
teachersRouter.post("/", teachersController.create);
teachersRouter.put("/:id", teachersController.update);
teachersRouter.delete("/:id", teachersController.remove);
