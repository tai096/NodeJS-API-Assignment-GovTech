import dotenv from "dotenv";
import app from "./app.js";
import { testConnection } from "./config/index.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

// Start server
const startServer = async () => {
  try {
    // Test database connection
    const isConnected = await testConnection();

    if (!isConnected) {
      console.error("Failed to connect to database. Please check your configuration.");
      process.exit(1);
    }

    // Start listening
    app.listen(PORT, () => {
      console.log(`✓ Server is running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`✓ API endpoints available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
