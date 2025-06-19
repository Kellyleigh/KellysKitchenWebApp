// Database connection module for Kelly's Kitchen
const mysql = require('mysql2/promise');
require('dotenv').config();

// Check if we're in development mode
const devMode = process.env.DEV_MODE === 'true';

// Create a mock pool for local development
const createMockPool = () => {
  console.log('Using mock database for local development');
  return {
    query: async (sql, params) => {
      console.log('MOCK DB QUERY:', sql, params);
      return [[], {}]; // Return empty result set
    },
    getConnection: async () => {
      return {
        release: () => {}
      };
    }
  };
};

// Create a connection pool if not in dev mode
const createRealPool = () => {
  try {
    return mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 10000 // 10 second timeout
    });
  } catch (error) {
    console.error('Error creating database pool:', error);
    return null;
  }
};

// Initialize pool based on mode
let pool = devMode ? createMockPool() : createRealPool();
let isUsingMockDb = devMode;

// Test database connection
async function testConnection() {
  // If we're in dev mode, don't even try to connect
  if (devMode) {
    console.log('Development mode enabled, using mock database');
    isUsingMockDb = true;
    return false;
  }
  
  try {
    if (!pool) {
      throw new Error('Database pool not initialized');
    }
    
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
    isUsingMockDb = false;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    
    // Switch to mock database
    console.log('Switching to mock database');
    pool = createMockPool();
    isUsingMockDb = true;
    
    return false;
  }
}

// Check if we're using the mock database
function isMockDatabase() {
  return isUsingMockDb;
}

module.exports = {
  pool,
  testConnection,
  isMockDatabase
};