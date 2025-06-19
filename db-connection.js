// Database connection module for Kelly's Kitchen
const sql = require('mssql');
require('dotenv').config();

// Check if we're in development mode
const devMode = process.env.DEV_MODE === 'true';

// Create a mock pool for local development
const createMockPool = () => {
  console.log('Using mock database for local development');
  return {
    query: async (query, params) => {
      console.log('MOCK DB QUERY:', query, params);
      return [[], {}]; // Return empty result set
    },
    request: () => ({
      input: () => ({}),
      query: async () => ({ recordset: [] })
    })
  };
};

// Create Azure SQL connection pool
const createRealPool = () => {
  try {
    const config = {
      server: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      options: {
        encrypt: true,
        trustServerCertificate: false
      },
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      }
    };
    return new sql.ConnectionPool(config);
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