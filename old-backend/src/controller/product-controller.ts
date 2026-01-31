import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../utils/response-handler";
import {
  createProductService,
  deleteProductByIdService,
  getAllProductsService,
  getProductByIdService,
} from "../models/product-model";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, cost, description, dimensions, img, designerId, typeId } =
      req.body;
    const product = await createProductService(
      title,
      cost,
      description,
      dimensions,
      img,
      designerId,
      typeId
    );
    handleResponse(res, 201, "Product created successfully", product);
  } catch (err) {
    console.error("Create product error:", err);
    next(err);
  }
};

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

export const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const deletedProduct = await deleteProductByIdService(parseInt(id));
    if (!deletedProduct) {
      handleResponse(res, 404, "Dish not found");
      return;
    }
    handleResponse(res, 200, "Product deleted successfully", deletedProduct);
  } catch (err) {
    next(err);
  }
};
