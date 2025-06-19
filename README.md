# Kelly's Kitchen Restaurant Web App

A restaurant website for Kelly's Kitchen with menu display, table booking, reviews, and contact functionality.

## Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```
   
   For development with auto-reload:
   ```
   npm run dev
   ```

3. Access the website at http://

## Database Structure

The database includes the following tables:

- `menu_categories`: Categories of menu items (Breakfast, Main, Dessert, etc.)
- `menu_items`: Individual menu items with prices and descriptions
- `users`: Customer information
- `bookings`: Table reservations
- `reviews`: Customer reviews and ratings
- `newsletter_subscribers`: Email subscribers for the newsletter
- `contact_messages`: Messages from the contact form
- `promotions`: Special offers and promotions
- `staff`: Admin users for the restaurant management

## API Endpoints

- `/api/menu`: Get all menu items
- `/api/featured-items`: Get featured menu items
- `/api/reviews`: Get approved customer reviews
- `/book-table`: Submit a table booking
- `/submit-review`: Submit a customer review
- `/subscribe`: Subscribe to the newsletter
- `/send-message`: Send a contact message
