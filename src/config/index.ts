import { Sequelize } from "sequelize";
import config, { DatabaseConfig } from "./database.js";

const env = process.env.NODE_ENV || "development";
const dbConfig: DatabaseConfig = config[env];

/**
 * Sequelize instance
 */
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
});

/**
 * Test database connection
 * Note: Database and tables are managed via migrations
 * Run 'npm run db:setup' for first time setup
 */
const testConnection = async (): Promise<boolean> => {
    try {
        await sequelize.authenticate();
        console.log("✓ Database connection has been established successfully.");

        return true;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("✗ Unable to connect to the database:", errorMessage);
        console.error("✗ Please run 'npm run db:setup' to create database and tables.");
        return false;
    }
};

export { sequelize, testConnection };
