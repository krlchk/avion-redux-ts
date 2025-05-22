import pool from "../config/db";

export const createProductService = async (
  title: string,
  cost: number,
  description: string,
  dimensions: { depth: string; width: string; height: string },
  img: string,
  designerId: number,
  typeId: number
) => {
  const result = await pool.query(
    "INSERT INTO products (title, cost, description, dimensions, img, designer_id, type_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [title, cost, description, dimensions, img, designerId, typeId]
  );
  return result.rows;
};

export const getAllProductsService = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};

export const getProductByIdService = async (id: number) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

export const deleteProductByIdService = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
