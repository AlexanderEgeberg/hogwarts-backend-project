import { pool } from "../db.ts";

type Person = { id: number; name: string };

export type Course = { id: number; name: string; teacherId: number };
export type CourseInput = { name: string; teacherId: number };

export const findAll = async () => {
  const { rows } = await pool.query<Course>(
    `SELECT id, name, teacher_id AS "teacherId" FROM courses ORDER BY id`,
  );
  return rows;
};

export const findById = async (id: number) => {
  const { rows } = await pool.query<Course>(
    `SELECT id, name, teacher_id AS "teacherId" FROM courses WHERE id = $1`,
    [id],
  );
  if (!rows[0]) return null;

  const { rows: students } = await pool.query<Person>(
    `SELECT s.id, s.name FROM students s
     INNER JOIN course_students cs ON cs.student_id = s.id
     WHERE cs.course_id = $1 ORDER BY s.id`,
    [id],
  );
  return { ...rows[0], students };
};

export const create = async ({ name, teacherId }: CourseInput) => {
  const { rows } = await pool.query<Course>(
    `INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING id, name, teacher_id AS "teacherId"`,
    [name, teacherId],
  );
  return rows[0];
};

export const update = async (id: number, { name, teacherId }: CourseInput) => {
  const { rows } = await pool.query<Course>(
    `UPDATE courses SET name = $2, teacher_id = $3 WHERE id = $1 RETURNING id, name, teacher_id AS "teacherId"`,
    [id, name, teacherId],
  );
  return rows[0];
};

export const remove = async (id: number) => {
  const { rowCount } = await pool.query("DELETE FROM courses WHERE id = $1", [
    id,
  ]);
  return rowCount === 1;
};

export const setTeacher = async (id: number, teacherId: number) => {
  const { rows } = await pool.query<Course>(
    `UPDATE courses SET teacher_id = $2 WHERE id = $1 RETURNING id, name, teacher_id AS "teacherId"`,
    [id, teacherId],
  );
  return rows[0];
};

export const addStudent = async (courseId: number, studentId: number) => {
  const { rowCount } = await pool.query(
    "INSERT INTO course_students (course_id, student_id) VALUES ($1, $2)",
    [courseId, studentId],
  );
  return rowCount === 1;
};

export const removeStudent = async (courseId: number, studentId: number) => {
  const { rowCount } = await pool.query(
    "DELETE FROM course_students WHERE course_id = $1 AND student_id = $2",
    [courseId, studentId],
  );
  return rowCount === 1;
};
