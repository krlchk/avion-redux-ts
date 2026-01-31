import express from "express";
import { createOrder } from "../controller/order-controller";

const router = express.Router();

router.post("/create", createOrder as express.RequestHandler);

export default router;
