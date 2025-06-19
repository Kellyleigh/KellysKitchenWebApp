-- Initialize Kelly's Kitchen Database with sample data
-- Run this script on your Azure MySQL database

USE kellysdatabase;

-- Clear existing data (optional - remove if you want to keep existing data)
-- DELETE FROM menu_items;
-- DELETE FROM menu_categories;

-- Insert menu categories if they don't exist
INSERT IGNORE INTO menu_categories (category_id, name, display_order) VALUES
(1, 'Breakfast', 1),
(2, 'Main', 2),
(3, 'Dessert', 3),
(4, 'Kids', 4),
(5, 'Milkshakes', 5);

-- Insert sample menu items
INSERT IGNORE INTO menu_items (item_id, category_id, name, description, price, image_path, is_featured, is_active) VALUES
-- Breakfast items
(1, 1, 'Eggs Benedict', 'Poached eggs on English muffin with cherry tomatoes and hollandaise sauce', 85.00, 'images/eggsben.png', FALSE, TRUE),
(2, 1, 'French Toast', 'French toast with fresh berries', 75.00, 'images/frenchtoast.png', TRUE, TRUE),
(3, 1, 'Full English', 'Eggs, bacon, sausage, beans, toast and grilled tomato', 95.00, 'images/fullenglishbreak.png', FALSE, TRUE),
(4, 1, 'Pancake Stack', 'Fluffy pancakes with maple syrup and fresh berries', 65.00, 'images/pancakes.png', FALSE, TRUE),

-- Main items
(5, 2, 'Ribeye Steak', 'Grilled ribeye steak with herb butter, roasted vegetables and mashed potatoes', 185.00, 'images/steak.png', FALSE, TRUE),
(6, 2, 'Gourmet Burger', 'Beef patty with cheese, caramelized onions, lettuce and tomato on a brioche bun', 120.00, 'images/beefburger.png', TRUE, TRUE),
(7, 2, 'Creamy Pasta', 'Fettuccine with mushroom cream sauce, parmesan and fresh herbs', 95.00, 'images/pasta.png', TRUE, TRUE),
(8, 2, 'Grilled Salmon', 'Fresh salmon fillet with lemon butter sauce and seasonal vegetables', 165.00, 'images/salmon.png', FALSE, TRUE),

-- Dessert items
(9, 3, 'New York Cheesecake', 'Creamy cheesecake with berry compote and whipped cream', 65.00, 'images/cheesecake.png', FALSE, TRUE),
(10, 3, 'Chocolate Fondant', 'Warm chocolate cake with molten center and vanilla ice cream', 75.00, 'images/fondant.png', FALSE, TRUE),
(11, 3, 'Tiramisu', 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone', 60.00, 'images/tiramisu.png', FALSE, TRUE),
(12, 3, 'Ice Cream Sundae', 'Three scoops of ice cream with chocolate sauce, nuts and cherries', 55.00, 'images/sundae.png', FALSE, TRUE),

-- Kids items
(13, 4, 'Chicken Nuggets', 'Crispy chicken nuggets with fries and ketchup', 45.00, 'images/chickennuggs.png', FALSE, TRUE),
(14, 4, 'Mac & Cheese', 'Creamy macaroni and cheese with garlic bread', 40.00, 'images/macncheese.png', FALSE, TRUE),
(15, 4, 'Mini Pizza', 'Small cheese and tomato pizza with choice of toppings', 50.00, 'images/minipizza.png', FALSE, TRUE),
(16, 4, 'Fish Fingers', 'Breaded fish fingers with mashed potatoes and peas', 45.00, 'images/fishfingers.png', FALSE, TRUE),

-- Milkshakes
(17, 5, 'Fruity Choco', 'Chocolate milkshake with fresh fruit', 45.00, 'images/FruityChoco.png', TRUE, TRUE),
(18, 5, 'Crunchy Toffee', 'Toffee milkshake with crunchy toppings', 45.00, 'images/CrunchyToffee.png', TRUE, TRUE),
(19, 5, 'Choco Overload', 'Rich chocolate milkshake with chocolate toppings', 50.00, 'images/Chocoverload.png', TRUE, TRUE),
(20, 5, 'Vanilla Biscuit', 'Vanilla milkshake with cookie crumbles', 45.00, 'images/VanillaBiscuit.png', TRUE, TRUE);

-- Insert sample reviews
INSERT IGNORE INTO reviews (review_id, name, surname, email, rating, review_text, is_approved, is_featured) VALUES
(1, 'Sarah', 'Johnson', 'sarah@example.com', 5, 'Amazing food and atmosphere! The milkshakes are absolutely divine. Will definitely be coming back!', TRUE, TRUE),
(2, 'Michael', 'Smith', 'michael@example.com', 5, 'Best restaurant in Kempton Park! The service is exceptional and the food is consistently great.', TRUE, TRUE);

SELECT 'Database initialized successfully!' as status;