import { pool } from "../db.ts";

export type House = { name: string };

export const findAll = async () => {
  const { rows } = await pool.query<House>(
    "SELECT name FROM houses ORDER BY name",
  );
  return rows;
};

export const findByName = async (name: string) => {
  const { rows } = await pool.query<House>(
    "SELECT name FROM houses WHERE name = $1",
    [name],
  );
  return rows[0];
};
