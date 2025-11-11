#!/usr/bin/env node
"use strict";

/**
 * Script to create database before running migrations
 * This ensures the database exists before sequelize-cli tries to connect
 */

require("dotenv").config();
const mysql = require("mysql2/promise");

const createDatabase = async () => {
  const env = process.env.NODE_ENV || "development";
  const dbName = process.env.DB_NAME || "teacher_student_db";
  const dbHost = process.env.DB_HOST || "localhost";
  const dbPort = parseInt(process.env.DB_PORT || "3306");
  const dbUser = process.env.DB_USER || "root";
  const dbPassword = process.env.DB_PASSWORD || "";

  let connection;

  try {
    // Connect to MySQL server (without database)
    connection = await mysql.createConnection({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
    });

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);

    console.log(`✓ Database '${dbName}' created or already exists.`);
    console.log(`✓ Environment: ${env}`);
  } catch (error) {
    console.error("✗ Error creating database:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

createDatabase();
