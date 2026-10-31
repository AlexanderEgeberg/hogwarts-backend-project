import express, { type Express } from "express";
import cors from "cors";
import { errorHandler } from "./services/error.ts";
import { housesRouter } from "./routes/houses.routes.ts";
import { studentsRouter } from "./routes/students.routes.ts";
import { teachersRouter } from "./routes/teachers.routes.ts";
import { coursesRouter } from "./routes/courses.routes.ts";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/houses", housesRouter);
app.use("/students", studentsRouter);
app.use("/teachers", teachersRouter);
app.use("/courses", coursesRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
