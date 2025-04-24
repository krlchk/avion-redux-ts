import express, { Request, Response } from "express";
import { sendMail } from "../middleware/email-sendler";
import { sendEmail } from "../controller/email-controller";

const router = express.Router();

router.post("/send-email", sendEmail as express.RequestHandler);

export default router;