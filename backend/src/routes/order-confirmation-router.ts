import express from "express";
import { sendEmail } from "../controller/order-confirm-controller";

const router = express.Router();

router.post(
  "/send-email-order-confitmation",
  sendEmail as express.RequestHandler
);

export default router;
