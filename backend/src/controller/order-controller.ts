import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../utils/response-handler";
import { createOrderService } from "../models/order-model";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, surname, email, phone, address, comment, items } = req.body;

    if (!name || !email || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const newOrder = await createOrderService(
      name,
      surname,
      email,
      phone,
      address,
      comment,
      items
    );

    if (!newOrder) return handleResponse(res, 404, "Problems with order");
    handleResponse(res, 201, "Order created", newOrder.id);
  } catch (err) {
    handleResponse(res, 500, "Error creating order");
    next(err);
  }
};
