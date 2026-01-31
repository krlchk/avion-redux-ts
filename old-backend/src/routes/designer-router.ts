import express from "express";
import {
  getAllDesigners,
  getDesignerById,
} from "../controller/designer-controller";

const router = express.Router();

router.get("/designers", getAllDesigners);
router.get("/designers/:id", getDesignerById);

export default router;
