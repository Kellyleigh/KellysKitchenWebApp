// Database connection module for Kelly's Kitchen
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'https://gentle-bay-0e08bd410.6.azurestaticapps.net',
  user: process.env.DB_USER || 'kelly.fourie1@gmail.com',
  password: process.env.DB_PASSWORD || 'Kellyfourie1612!',
  database: process.env.DB_NAME || 'KellysKitchenDatabase',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

module.exports = {
  pool,
  testConnection
};