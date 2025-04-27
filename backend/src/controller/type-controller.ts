import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../utils/response-handler";
import { getAllTypesService, getTypeByIdService } from "../models/type-model";

export const getAllTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const types = await getAllTypesService();
    handleResponse(res, 201, "Types fetched successfully", types);
  } catch (err) {
    next(err);
  }
};
export const getTypeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const type = await getTypeByIdService(parseInt(id));
    if (!type) return handleResponse(res, 404, "Type not found");
    handleResponse(res, 201, "Type fetched successfully", type);
  } catch (err) {
    next(err);
  }
};
