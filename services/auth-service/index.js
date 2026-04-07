import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "../../shared/db/connection.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/", authRoutes);

const PORT = process.env.PORT || 5001;

// connect DB first
await connectDB();

app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
});