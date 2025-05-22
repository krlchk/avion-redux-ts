import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
} from "../controller/product-controller";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post("/create-product", createProduct);
router.delete("/delete-product/:id", deleteProductById);

export default router;
