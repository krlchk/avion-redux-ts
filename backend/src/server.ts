import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { errorHandling } from "./middleware/error-handling";
import pool from "./config/db";
import productRoutes from "./routes/product-routes";
import userRoutes from "./routes/user-router";
import emailRoute from "./routes/email-router";
import designerRoute from "./routes/designer-router";
import typeRoute from "./routes/type-router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", emailRoute);
app.use("/api", designerRoute);
app.use("/api", typeRoute);

// Error handling
app.use(errorHandling);

// Images
const imagesPath = path.join(__dirname, "images");
app.use("/images", express.static(imagesPath));

// Tets postgress connection
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    console.log("Database name:", result.rows[0].current_database);
    res.send(`The current database name is ${result.rows[0].current_database}`);
  } catch (error) {
    console.error("Error quering database", error);
    res.status(500).send("Error retrieving database name");
  }
});

// Server running
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
