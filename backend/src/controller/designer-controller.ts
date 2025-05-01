import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../utils/response-handler";
import {
  getAllDesignersService,
  getDesignerByIdService,
} from "../models/designer-model";

export const getAllDesigners = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const designers = await getAllDesignersService();
    handleResponse(res, 201, "Designers fetched successfully", designers);
  } catch (err) {
    next(err);
  }
};
export const getDesignerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const designer = await getDesignerByIdService(parseInt(id));
    if (!designer) return handleResponse(res, 404, "Designer not found");
    handleResponse(res, 201, "Designer fetched successfully", designer);
  } catch (err) {
    next(err);
  }
};
