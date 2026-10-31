import { pool } from "../db.ts";

export type Teacher = { id: number; name: string; house: string };
export type TeacherInput = Omit<Teacher, "id">;

export const findAll = async () => {
  const { rows } = await pool.query<Teacher>(
    "SELECT id, name, house FROM teachers ORDER BY id",
  );
  return rows;
};

export const findById = async (id: number) => {
  const { rows } = await pool.query<Teacher>(
    "SELECT id, name, house FROM teachers WHERE id = $1",
    [id],
  );
  return rows[0];
};

export const create = async ({ name, house }: TeacherInput) => {
  const { rows } = await pool.query<Teacher>(
    "INSERT INTO teachers (name, house) VALUES ($1, $2) RETURNING id, name, house",
    [name, house],
  );
  return rows[0];
};

export const update = async (id: number, { name, house }: TeacherInput) => {
  const { rows } = await pool.query<Teacher>(
    "UPDATE teachers SET name = $2, house = $3 WHERE id = $1 RETURNING id, name, house",
    [id, name, house],
  );
  return rows[0];
};

export const remove = async (id: number) => {
  const { rowCount } = await pool.query("DELETE FROM teachers WHERE id = $1", [
    id,
  ]);
  return rowCount === 1;
};
