import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "../../shared/db/connection.js";
import workspaceRoutes from "./src/routes/workspaceRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/", workspaceRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Workspace Service running 🧠");
});

const PORT = process.env.PORT || 5002;

// connect DB FIRST
await connectDB();

app.listen(PORT, () => {
  console.log(`Workspace service running on port ${PORT}`);
});