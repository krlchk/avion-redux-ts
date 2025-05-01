import pool from "../config/db";
import { IProduct } from "../controller/checkout-controller";

export const createOrderService = async (
  name: string,
  surname: string,
  email: string,
  phone: number,
  address: string,
  comment: string,
  items: { amount: number; product: IProduct }[]
) => {
  const result = await pool.query(
    "INSERT INTO orders (name, surname, email, phone, address, comment, items, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING id",
    [name, surname, email, phone, address, comment, JSON.stringify(items)]
  );
  return result.rows[0];
};
