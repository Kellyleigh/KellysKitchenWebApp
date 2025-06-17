# Kelly's Kitchen Restaurant Web App

A restaurant website for Kelly's Kitchen with menu display, table booking, reviews, and contact functionality.

## Database Setup

The application uses MySQL for data storage. Follow these steps to set up the database:

1. Install MySQL Server if you haven't already
2. Create a new database:
   ```sql
   CREATE DATABASE kellys_kitchen;
   ```
3. Run the database schema script:
   ```
   mysql -u your_username -p kellys_kitchen < database.sql
   ```
   Or you can copy and paste the contents of database.sql into your MySQL client.

## Environment Configuration

1. Copy the `.env.example` file to `.env`:
   ```
   cp .env.example .env
   ```
2. Edit the `.env` file with your database credentials and email settings:
   ```
   # Server Configuration
   PORT=3000

   # Database Configuration
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=kellys_kitchen

   # Email Configuration
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password_here
   ```

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

3. Access the website at http://localhost:3000

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