import express from "express";
import apiRoutes from "./api.js";

const router = express.Router();

// Mount API routes
router.use("/api", apiRoutes);

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Teacher-Student Management API is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
