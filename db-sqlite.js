const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database file path
const dbPath = path.join(__dirname, 'kellys_kitchen.db');

// Create database connection
const db = new sqlite3.Database(dbPath);

// Initialize database with schema
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    // Create tables
    db.serialize(() => {
      // Menu categories
      db.run(`CREATE TABLE IF NOT EXISTS menu_categories (
        category_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL,
        display_order INTEGER NOT NULL DEFAULT 0
      )`);

      // Menu items
      db.run(`CREATE TABLE IF NOT EXISTS menu_items (
        item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER NOT NULL,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image_path VARCHAR(255),
        is_featured BOOLEAN DEFAULT 0,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES menu_categories(category_id)
      )`);

      // Bookings
      db.run(`CREATE TABLE IF NOT EXISTS bookings (
        booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        booking_date DATE NOT NULL,
        booking_time TIME NOT NULL,
        party_size INTEGER NOT NULL,
        seating_preference VARCHAR(20) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Reviews
      db.run(`CREATE TABLE IF NOT EXISTS reviews (
        review_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL,
        surname VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
        review_text TEXT,
        is_approved BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Newsletter subscribers
      db.run(`CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        subscriber_id INTEGER PRIMARY KEY AUTOINCREMENT,
        email VARCHAR(100) NOT NULL UNIQUE,
        is_active BOOLEAN DEFAULT 1,
        subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Contact messages
      db.run(`CREATE TABLE IF NOT EXISTS contact_messages (
        message_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL,
        surname VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) {
          reject(err);
        } else {
          insertSampleData();
          resolve();
        }
      });
    });
  });
}

// Insert sample data
function insertSampleData() {
  // Insert categories
  db.run(`INSERT OR IGNORE INTO menu_categories (category_id, name, display_order) VALUES 
    (1, 'Breakfast', 1),
    (2, 'Main', 2),
    (3, 'Dessert', 3),
    (4, 'Kids', 4),
    (5, 'Milkshakes', 5)`);

  // Insert menu items
  db.run(`INSERT OR IGNORE INTO menu_items (item_id, category_id, name, description, price, image_path, is_featured) VALUES 
    (1, 1, 'Eggs Benedict', 'Poached eggs on English muffin with cherry tomatoes and hollandaise sauce', 85.00, 'images/eggsben.png', 0),
    (2, 1, 'French Toast', 'French toast with fresh berries', 75.00, 'images/frenchtoast.png', 1),
    (3, 2, 'Gourmet Burger', 'Beef patty with cheese, caramelized onions, lettuce and tomato on a brioche bun', 120.00, 'images/beefburger.png', 1),
    (4, 2, 'Ribeye Steak', 'Grilled ribeye steak with herb butter, roasted vegetables and mashed potatoes', 185.00, 'images/steak.png', 0),
    (5, 3, 'New York Cheesecake', 'Creamy cheesecake with berry compote and whipped cream', 65.00, 'images/cheesecake.png', 0),
    (6, 5, 'Fruity Choco', 'Chocolate milkshake with fresh fruit', 45.00, 'images/FruityChoco.png', 1)`);

  // Insert sample reviews
  db.run(`INSERT OR IGNORE INTO reviews (review_id, name, surname, email, rating, review_text, is_approved) VALUES 
    (1, 'Sarah', 'Johnson', 'sarah@example.com', 5, 'Amazing food and atmosphere! The milkshakes are absolutely divine.', 1),
    (2, 'Michael', 'Smith', 'michael@example.com', 5, 'Best restaurant in Kempton Park! The service is exceptional.', 1)`);
}

// Promisify database methods
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve([rows, {}]);
    });
  });
};

module.exports = {
  db,
  query,
  initializeDatabase
};