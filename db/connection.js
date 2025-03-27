require('dotenv').config();
const { Pool } = require('pg');

// Create a new pool instance with your PostgreSQL configuration.
const pool = new Pool({
  user: process.env.USER,           // Database user
  host: 'localhost',          // Database host
  database: process.env.DATABASE,         // Your database name
  password: process.env.PASSWORD,   // Database password
  port: 5432,                 // Database port
});

module.exports = pool;