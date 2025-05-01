import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../utils/response-handler";
import {
  getAllProductsService,
  getProductByIdService,
} from "../models/product-model";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProductsService();
    handleResponse(res, 201, "Products fetched successfully", products);
  } catch (err) {
    next(err);
  }
};
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const product = await getProductByIdService(parseInt(id));
    if (!product) return handleResponse(res, 404, "Product not found");
    handleResponse(res, 201, "Product fetched successfully", product);
  } catch (err) {
    next(err);
  }
};
