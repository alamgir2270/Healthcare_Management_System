// config/db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Sequelize connection instance
const sequelize = new Sequelize(
  process.env.DB_NAME,  // Database name (health_db)
  process.env.DB_USER,  // Username (postgres)
  process.env.DB_PASS,  // Password (admin123)
  {
    host: process.env.DB_HOST,  // Host (localhost)
    dialect: "postgres",        // Database type
    logging: false,             // true করলে SQL কুয়েরি লগ দেখাবে
  }
);

// Connect function
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

module.exports = { sequelize, connectDB };
