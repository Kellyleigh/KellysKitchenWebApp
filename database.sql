-- Kelly's Kitchen Restaurant Database Schema (SQL Server Version)

-- Create the database
CREATE DATABASE KellysKitchenDatabase;
GO
USE KellysKitchenDatabase;
GO

-- Menu Categories Table
CREATE TABLE menu_categories (
    category_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    display_order INT NOT NULL DEFAULT 0
);

-- Menu Items Table
CREATE TABLE menu_items (
    item_id INT IDENTITY(1,1) PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_path VARCHAR(255),
    is_featured BIT DEFAULT 0,
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (category_id) REFERENCES menu_categories(category_id)
);

-- Users Table (for customers)
CREATE TABLE users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Table Bookings
CREATE TABLE bookings (
    booking_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    party_size INT NOT NULL,
    seating_preference VARCHAR(20) NOT NULL CHECK (seating_preference IN ('inside', 'outside', 'kids_play_area')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    notes TEXT,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Reviews Table
CREATE TABLE reviews (
    review_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    is_approved BIT DEFAULT 0,
    is_featured BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
    subscriber_id INT IDENTITY(1,1) PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    is_active BIT DEFAULT 1,
    subscribed_at DATETIME DEFAULT GETDATE(),
    unsubscribed_at DATETIME NULL
);

-- Contact Messages
CREATE TABLE contact_messages (
    message_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    is_read BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE()
);

-- Special Offers/Promotions
CREATE TABLE promotions (
    promotion_id INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    discount_percent DECIMAL(5, 2),
    discount_amount DECIMAL(10, 2),
    promo_code VARCHAR(20),
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Staff Table (for admin access)
CREATE TABLE staff (
    staff_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'manager', 'staff')),
    is_active BIT DEFAULT 1,
    last_login DATETIME NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
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
(1, 'Eggs Benedict', 'Poached eggs on English muffin with cherry tomatoes and hollandaise sauce', 85.00, 'images/eggsben.png', 0),
(1, 'French Toast', 'French toast with fresh berries', 75.00, 'images/frenchtoast.png', 1),
(1, 'Full English', 'Eggs, bacon, sausage, beans, toast and grilled tomato', 95.00, 'images/fullenglishbreak.png', 0),
(1, 'Pancake Stack', 'Fluffy pancakes with maple syrup and fresh berries', 65.00, 'images/pancakes.png', 0),

-- Main items
(2, 'Ribeye Steak', 'Grilled ribeye steak with herb butter, roasted vegetables and mashed potatoes', 185.00, 'images/steak.png', 0),
(2, 'Gourmet Burger', 'Beef patty with cheese, caramelized onions, lettuce and tomato on a brioche bun', 120.00, 'images/beefburger.png', 1),
(2, 'Creamy Pasta', 'Fettuccine with mushroom cream sauce, parmesan and fresh herbs', 95.00, 'images/pasta.png', 1),
(2, 'Grilled Salmon', 'Fresh salmon fillet with lemon butter sauce and seasonal vegetables', 165.00, 'images/salmon.png', 0),

-- Dessert items
(3, 'New York Cheesecake', 'Creamy cheesecake with berry compote and whipped cream', 65.00, 'images/cheesecake.png', 0),
(3, 'Chocolate Fondant', 'Warm chocolate cake with molten center and vanilla ice cream', 75.00, 'images/fondant.png', 0),
(3, 'Tiramisu', 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone', 60.00, 'images/tiramisu.png', 0),
(3, 'Ice Cream Sundae', 'Three scoops of ice cream with chocolate sauce, nuts and cherries', 55.00, 'images/sundae.png', 0),

-- Kids items
(4, 'Chicken Nuggets', 'Crispy chicken nuggets with fries and ketchup', 45.00, 'images/chickennuggs.png', 0),
(4, 'Mac & Cheese', 'Creamy macaroni and cheese with garlic bread', 40.00, 'images/macncheese.png', 0),
(4, 'Mini Pizza', 'Small cheese and tomato pizza with choice of toppings', 50.00, 'images/minipizza.png', 0),
(4, 'Fish Fingers', 'Breaded fish fingers with mashed potatoes and peas', 45.00, 'images/fishfingers.png', 0),

-- Milkshakes
(5, 'Fruity Choco', 'Chocolate milkshake with fresh fruit', 45.00, 'images/FruityChoco.png', 1),
(5, 'Crunchy Toffee', 'Toffee milkshake with crunchy toppings', 45.00, 'images/CrunchyToffee.png', 1),
(5, 'Choco Overload', 'Rich chocolate milkshake with chocolate toppings', 50.00, 'images/Chocoverload.png', 1),
(5, 'Vanilla Biscuit', 'Vanilla milkshake with cookie crumbles', 45.00, 'images/VanillaBiscuit.png', 1);


-- Insert sample staff member (admin)
-- Note: In production, use proper password hashing
INSERT INTO staff (username, password_hash, first_name, last_name, email, role) VALUES
('admin', '$2y$10$example_hashed_password', 'Admin', 'User', 'admin@kellyskitchen.com', 'admin');

-- Insert sample reviews
INSERT INTO reviews (name, surname, email, rating, review_text, is_approved, is_featured) VALUES
('Sarah', 'Johnson', 'sarah@example.com', 5, 'Amazing food and atmosphere! The milkshakes are absolutely divine. Will definitely be coming back!', 1, 1),
('Michael', 'Smith', 'michael@example.com', 5, 'Best restaurant in Kempton Park! The service is exceptional and the food is consistently great.', 1, 1);