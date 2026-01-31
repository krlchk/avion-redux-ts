import { Request, Response, NextFunction } from "express";
import { sendOrderConfirmation } from "../middleware/order-confirmation";

export const sendEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  try {
    await sendOrderConfirmation(email, name);
    res.json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
    next(err);
  }
};
