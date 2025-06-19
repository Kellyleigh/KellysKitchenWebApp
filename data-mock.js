// Mock data for local development

// Menu categories
const categories = [
  { category_id: 1, name: 'Breakfast', display_order: 1 },
  { category_id: 2, name: 'Main', display_order: 2 },
  { category_id: 3, name: 'Dessert', display_order: 3 },
  { category_id: 4, name: 'Kids', display_order: 4 },
  { category_id: 5, name: 'Milkshakes', display_order: 5 }
];

// Menu items
const menuItems = [
  // Breakfast
  { 
    item_id: 1, 
    category_id: 1, 
    name: 'Eggs Benedict', 
    description: 'Poached eggs on English muffin with cherry tomatoes and hollandaise sauce',
    price: 85.00, 
    image_path: 'images/eggsben.png',
    is_featured: false,
    is_active: true,
    category_name: 'Breakfast'
  },
  { 
    item_id: 2, 
    category_id: 1, 
    name: 'French Toast', 
    description: 'French toast with fresh berries',
    price: 75.00, 
    image_path: 'images/frenchtoast.png',
    is_featured: true,
    is_active: true,
    category_name: 'Breakfast'
  },
  
  // Main
  { 
    item_id: 5, 
    category_id: 2, 
    name: 'Ribeye Steak', 
    description: 'Grilled ribeye steak with herb butter, roasted vegetables and mashed potatoes',
    price: 185.00, 
    image_path: 'images/steak.png',
    is_featured: false,
    is_active: true,
    category_name: 'Main'
  },
  { 
    item_id: 6, 
    category_id: 2, 
    name: 'Gourmet Burger', 
    description: 'Beef patty with cheese, caramelized onions, lettuce and tomato on a brioche bun',
    price: 120.00, 
    image_path: 'images/beefburger.png',
    is_featured: true,
    is_active: true,
    category_name: 'Main'
  },
  
  // Dessert
  { 
    item_id: 9, 
    category_id: 3, 
    name: 'New York Cheesecake', 
    description: 'Creamy cheesecake with berry compote and whipped cream',
    price: 65.00, 
    image_path: 'images/cheesecake.png',
    is_featured: false,
    is_active: true,
    category_name: 'Dessert'
  },
  
  // Milkshakes
  { 
    item_id: 17, 
    category_id: 5, 
    name: 'Fruity Choco', 
    description: 'Chocolate milkshake with fresh fruit',
    price: 45.00, 
    image_path: 'images/FruityChoco.png',
    is_featured: true,
    is_active: true,
    category_name: 'Milkshakes'
  }
];

// Reviews
const reviews = [
  { 
    review_id: 1, 
    name: 'Sarah', 
    surname: 'Johnson', 
    email: 'sarah@example.com',
    phone: '0123456789',
    rating: 5, 
    review_text: 'Amazing food and atmosphere! The milkshakes are absolutely divine. Will definitely be coming back!',
    is_approved: true,
    is_featured: true,
    created_at: '2023-10-15T14:30:00Z'
  },
  { 
    review_id: 2, 
    name: 'Michael', 
    surname: 'Smith', 
    email: 'michael@example.com',
    phone: '0123456788',
    rating: 5, 
    review_text: 'Best restaurant in Kempton Park! The service is exceptional and the food is consistently great.',
    is_approved: true,
    is_featured: true,
    created_at: '2023-10-20T18:45:00Z'
  }
];

module.exports = {
  categories,
  menuItems,
  reviews,
  
  // Helper function to get featured menu items
  getFeaturedItems: () => menuItems.filter(item => item.is_featured),
  
  // Helper function to get approved reviews
  getApprovedReviews: () => reviews.filter(review => review.is_approved)
};