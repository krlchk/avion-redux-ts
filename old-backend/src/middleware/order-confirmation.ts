import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderConfirmation = async (
  toEmail: string,
  customerName: string
) => {
  const mailOptions = {
    from: `"Avion 🛋️" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Thank you for your order!",
    text: `Hello ${customerName},\n\nThank you for shopping at Avion!\n\nWe've received your order and it's currently being processed. You'll receive another email once it has been shipped.\n\nBest regards,\nAvion Furniture Team`,
    html: `
      <h2>Thank you for your order, ${customerName}!</h2>
      <p>We're happy to let you know that we've received your order and it's currently being processed.</p>
      <p>🛒 You’ll receive another email when it has shipped.</p>
      <br />
      <p>Best regards,</p>
      <p><b>Avion Furniture Team</b></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation sent to ${toEmail}`);
  } catch (err) {
    console.error("Failed to send order confirmation email:", err);
  }
};
