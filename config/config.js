const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables from .env file

// Define configurations for different environments
const env = process.env.NODE_ENV || "development"; // Determine the current environment
const config = {
  development: {
    username: process.env.DB_USER, // Database username from environment variables
    password: process.env.DB_PASSWORD, // Database password from environment variables
    database: process.env.DB_NAME, // Database name from environment variables
    host: process.env.DB_HOST, // Database host from environment variables
    dialect: "postgres", // Database dialect (PostgreSQL)
    dialectOptions: {
      ssl: false, // Disable SSL for local development
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // Require SSL connection
        rejectUnauthorized: false, // Note: setting this to false can be insecure in production
      },
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT || 5432, // Database port, with a default fallback
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true, // Ensure SSL connection is securely configured
      },
    },
  },
};

// Create a new Sequelize instance with the environment-specific configuration
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect,
    dialectOptions: config[env].dialectOptions,
    logging: false, // Disable logging for cleaner output during development
  }
);

module.exports = sequelize; // Export the configured Sequelize instance
