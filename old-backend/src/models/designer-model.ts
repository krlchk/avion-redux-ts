import pool from "../config/db";

export const getAllDesignersService = async () => {
  const result = await pool.query("SELECT * FROM designers");
  return result.rows;
};

export const getDesignerByIdService = async (id: number) => {
  const result = await pool.query("SELECT * FROM designers WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};
