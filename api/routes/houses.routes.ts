import { Router } from "express";
import * as housesController from "../controllers/houses.controller.ts";

export const housesRouter = Router();

housesRouter.get("/", housesController.getAll);
housesRouter.get("/:name", housesController.getByName);
