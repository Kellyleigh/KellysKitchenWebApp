-- Kelly's Kitchen Restaurant Database Schema

-- Create the database
CREATE DATABASE KellysDatabase;
USE KellysDatabase;

-- Menu Categories Table
CREATE TABLE menu_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    display_order INT NOT NULL DEFAULT 0
);

-- Menu Items Table
CREATE TABLE menu_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_path VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES menu_categories(category_id)
);

-- Users Table (for customers)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table Bookings
CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    party_size INT NOT NULL,
    seating_preference ENUM('inside', 'outside', 'kids_play_area') NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Reviews Table
CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
    subscriber_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL
);

-- Contact Messages
CREATE TABLE contact_messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Special Offers/Promotions
CREATE TABLE promotions (
    promotion_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    discount_percent DECIMAL(5, 2),
    discount_amount DECIMAL(10, 2),
    promo_code VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Staff Table (for admin access)
CREATE TABLE staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('admin', 'manager', 'staff') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data for menu categories
INSERT INTO menu_categories (name, display_order) VALUES
('Breakfast', 1),
('Main', 2),
('Dessert', 3),
('Kids', 4),
('Milkshakes', 5);

-- Insert sample menu items based on your website
INSERT INTO menu_items (category_id, name, description, price, image_path, is_featured) VALUES
-- Breakfast items
(1, 'Eggs Benedict', 'Poached eggs on English muffin with cherry tomatoes and hollandaise sauce', 85.00, 'images/eggsben.png', FALSE),
(1, 'French Toast', 'French toast with fresh berries', 75.00, 'images/frenchtoast.png', TRUE),
(1, 'Full English', 'Eggs, bacon, sausage, beans, toast and grilled tomato', 95.00, 'images/fullenglishbreak.png', FALSE),
(1, 'Pancake Stack', 'Fluffy pancakes with maple syrup and fresh berries', 65.00, 'images/pancakes.png', FALSE),

-- Main items
(2, 'Ribeye Steak', 'Grilled ribeye steak with herb butter, roasted vegetables and mashed potatoes', 185.00, 'images/steak.png', FALSE),
(2, 'Gourmet Burger', 'Beef patty with cheese, caramelized onions, lettuce and tomato on a brioche bun', 120.00, 'images/beefburger.png', TRUE),
(2, 'Creamy Pasta', 'Fettuccine with mushroom cream sauce, parmesan and fresh herbs', 95.00, 'images/pasta.png', TRUE),
(2, 'Grilled Salmon', 'Fresh salmon fillet with lemon butter sauce and seasonal vegetables', 165.00, 'images/salmon.png', FALSE),

-- Dessert items
(3, 'New York Cheesecake', 'Creamy cheesecake with berry compote and whipped cream', 65.00, 'images/cheesecake.png', FALSE),
(3, 'Chocolate Fondant', 'Warm chocolate cake with molten center and vanilla ice cream', 75.00, 'images/fondant.png', FALSE),
(3, 'Tiramisu', 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone', 60.00, 'images/tiramisu.png', FALSE),
(3, 'Ice Cream Sundae', 'Three scoops of ice cream with chocolate sauce, nuts and cherries', 55.00, 'images/sundae.png', FALSE),

-- Kids items
(4, 'Chicken Nuggets', 'Crispy chicken nuggets with fries and ketchup', 45.00, 'images/chickennuggs.png', FALSE),
(4, 'Mac & Cheese', 'Creamy macaroni and cheese with garlic bread', 40.00, 'images/macncheese.png', FALSE),
(4, 'Mini Pizza', 'Small cheese and tomato pizza with choice of toppings', 50.00, 'images/minipizza.png', FALSE),
(4, 'Fish Fingers', 'Breaded fish fingers with mashed potatoes and peas', 45.00, 'images/fishfingers.png', FALSE),

-- Milkshakes
(5, 'Fruity Choco', 'Chocolate milkshake with fresh fruit', 45.00, 'images/FruityChoco.png', TRUE),
(5, 'Crunchy Toffee', 'Toffee milkshake with crunchy toppings', 45.00, 'images/CrunchyToffee.png', TRUE),
(5, 'Choco Overload', 'Rich chocolate milkshake with chocolate toppings', 50.00, 'images/Chocoverload.png', TRUE),
(5, 'Vanilla Biscuit', 'Vanilla milkshake with cookie crumbles', 45.00, 'images/VanillaBiscuit.png', TRUE);

-- Insert sample staff member (admin)
-- Note: In production, use proper password hashing
INSERT INTO staff (username, password_hash, first_name, last_name, email, role) VALUES
('admin', '$2y$10$example_hashed_password', 'Admin', 'User', 'admin@kellyskitchen.com', 'admin');

-- Insert sample reviews
INSERT INTO reviews (name, surname, email, rating, review_text, is_approved, is_featured) VALUES
('Sarah', 'Johnson', 'sarah@example.com', 5, 'Amazing food and atmosphere! The milkshakes are absolutely divine. Will definitely be coming back!', TRUE, TRUE),
('Michael', 'Smith', 'michael@example.com', 5, 'Best restaurant in Kempton Park! The service is exceptional and the food is consistently great.', TRUE, TRUE);