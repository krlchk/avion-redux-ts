import express from "express";
import { getAllTypes, getTypeById } from "../controller/type-controller";

const router = express.Router();

router.get("/types", getAllTypes);
router.get("/types/:id", getTypeById);

export default router;
