import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import pool from "../config/db";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "The user already exists!" });
    }

    if (!password) {
      return res.status(400).json({ message: "Problems with your password" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1 ,$2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    } else {
      next(new Error("Unknown error"));
    }
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Can not find user with this email!" });
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: "The credentials are invalid" });
    }
    res.json({
      message: "The login has been successful",
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    } else {
      next(new Error("An unexpected error occurred during login"));
    }
  }
};
