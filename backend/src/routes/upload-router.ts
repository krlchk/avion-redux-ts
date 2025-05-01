import express from "express";
import { Request, Response } from "express";
import parser from "../config/multer";

const router = express.Router();

router.post(
  "/upload",
  parser.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ imageUrl: req.file?.path });
  }
);

export default router;
