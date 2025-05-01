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

export const sendMail = async (toEmail: string) => {
  const mailOptions = {
    from: `"Avion 🛋️" <${process.env.USER}>`,
    to: toEmail,
    subject: "Unlock Exclusive Furniture Deals - Join Our Club Today!",
    text: `Dear Customer,
    
    We're excited to invite you to join our exclusive club and enjoy special benefits! By signing up for our newsletter, you'll be the first to know about:
    
    ✨ Exclusive offers on our latest furniture collections  
    🔥 Early access to sales and limited-time promotions  
    🏬 Pop-up store events and insider news  
    
    Don't miss out on the chance to elevate your home with stylish, high-quality furniture at the best prices.
    
    Sign up now and start enjoying your exclusive benefits today!  
    
    Best regards,  
    Furniture Club Team`,
    html: `
          <h2>Unlock Exclusive Furniture Deals - Join Our Club Today!</h2>
          <p>Dear Customer,</p>
          <p>We're excited to invite you to join our <b>exclusive club</b> and enjoy special benefits!</p>
          <ul>
            <li>✨ <b>Exclusive offers</b> on our latest furniture collections</li>
            <li>🔥 <b>Early access</b> to sales and limited-time promotions</li>
            <li>🏬 <b>Pop-up store events</b> and insider news</li>
          </ul>
          <p>Don't miss out on the chance to elevate your home with stylish, high-quality furniture at the best prices.</p>
          <p><b>Sign up now</b> and start enjoying your exclusive benefits today!</p>
          <p>Best regards,</p>
          <p><b>Furniture Club Team</b></p>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email has been sent to ${toEmail}!`);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
