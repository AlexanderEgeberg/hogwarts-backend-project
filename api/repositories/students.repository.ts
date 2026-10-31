import { pool } from "../db.ts";

export type Student = { id: number; name: string; house: string };
export type StudentInput = Omit<Student, "id">;

export const findAll = async () => {
  const { rows } = await pool.query<Student>(
    "SELECT id, name, house FROM students ORDER BY id",
  );
  return rows;
};

export const findById = async (id: number) => {
  const { rows } = await pool.query<Student>(
    "SELECT id, name, house FROM students WHERE id = $1",
    [id],
  );
  return rows[0];
};

export const create = async ({ name, house }: StudentInput) => {
  const { rows } = await pool.query<Student>(
    "INSERT INTO students (name, house) VALUES ($1, $2) RETURNING id, name, house",
    [name, house],
  );
  return rows[0];
};

export const update = async (id: number, { name, house }: StudentInput) => {
  const { rows } = await pool.query<Student>(
    "UPDATE students SET name = $2, house = $3 WHERE id = $1 RETURNING id, name, house",
    [id, name, house],
  );
  return rows[0];
};

export const remove = async (id: number) => {
  const { rowCount } = await pool.query("DELETE FROM students WHERE id = $1", [
    id,
  ]);
  return rowCount === 1;
};
