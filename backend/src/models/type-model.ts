import pool from "../config/db";

export const getAllTypesService = async () => {
  const result = await pool.query("SELECT * FROM types");
  return result.rows;
};

export const getTypeByIdService = async (id: number) => {
  const result = await pool.query("SELECT * FROM types WHERE id = $1", [id]);
  return result.rows[0];
};
