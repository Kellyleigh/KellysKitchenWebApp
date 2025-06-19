const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import database connection
const { pool, testConnection, isMockDatabase } = require('./db-connection');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('.')); // Serve static files from current directory

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Newsletter subscription endpoint
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    // Send confirmation email to subscriber
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Kelly\'s Kitchen Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a4a4a;">Thank you for subscribing to Kelly's Kitchen Newsletter!</h2>
          <p>Dear Subscriber,</p>
          <p>Thank you for joining our newsletter! We're excited to share our latest updates, special offers, and delicious recipes with you.</p>
          <p>You'll be the first to know about:</p>
          <ul>
            <li>New menu items</li>
            <li>Special promotions and discounts</li>
            <li>Upcoming events</li>
            <li>Seasonal recipes</li>
          </ul>
          <p>If you have any questions, feel free to contact us at <a href="mailto:enquiries@kellyskitchen.com">enquiries@kellyskitchen.com</a>.</p>
          <p>Best regards,<br>The Kelly's Kitchen Team</p>
        </div>
      `
    });

    // Store subscriber in database if available
    if (!isMockDatabase()) {
      await pool.query(
        'INSERT INTO newsletter_subscribers (email) VALUES (?)',
        [email]
      );
    }

    res.status(200).json({ success: true, message: 'Subscription successful!' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ success: false, message: 'Failed to subscribe. Please try again later.' });
  }
});

// Table booking endpoint
app.post('/book-table', async (req, res) => {
  const { name, email, phone, date, time, partySize, seatingPreference } = req.body;
  
  // Validate required fields
  if (!name || !email || !phone || !date || !time || !partySize || !seatingPreference) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  try {
    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Table Reservation at Kelly\'s Kitchen',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a4a4a;">Your Reservation is Confirmed!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for choosing Kelly's Kitchen. Your table reservation has been confirmed with the following details:</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Party Size:</strong> ${partySize} guests</p>
            <p><strong>Seating:</strong> ${seatingPreference}</p>
          </div>
          <p>If you need to modify or cancel your reservation, please contact us at least 2 hours before your booking time.</p>
          <p>Phone: 010-1234567</p>
          <p>Email: <a href="mailto:enquiries@kellyskitchen.com">enquiries@kellyskitchen.com</a></p>
          <p>We look forward to serving you!</p>
          <p>Best regards,<br>The Kelly's Kitchen Team</p>
        </div>
      `
    });

    // Send notification to restaurant
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to restaurant email
      subject: 'New Table Reservation',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h3>New Reservation Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Party Size:</strong> ${partySize}</p>
          <p><strong>Seating Preference:</strong> ${seatingPreference}</p>
        </div>
      `
    });

    // Store booking in database if available
    if (!isMockDatabase()) {
      await pool.query(
        'INSERT INTO bookings (name, email, phone, booking_date, booking_time, party_size, seating_preference) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, email, phone, date, time, partySize, seatingPreference]
      );
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Booking confirmed!' 
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process booking. Please try again later.' 
    });
  }
});

// Review submission endpoint
app.post('/submit-review', async (req, res) => {
  const { name, surname, email, phone, rating, review } = req.body;
  
  // Validate required fields
  if (!name || !surname || !email || !rating) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name, surname, email and rating are required' 
    });
  }

  try {
    // Send thank you email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Your Review at Kelly\'s Kitchen',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a4a4a;">Thank You for Your Feedback!</h2>
          <p>Dear ${name} ${surname},</p>
          <p>Thank you for taking the time to share your experience at Kelly's Kitchen. Your feedback is invaluable to us as we strive to provide the best dining experience for all our guests.</p>
          <p>We appreciate your ${rating}-star rating and your comments.</p>
          ${review ? `<p><em>"${review}"</em></p>` : ''}
          <p>We hope to welcome you back soon!</p>
          <p>Best regards,<br>The Kelly's Kitchen Team</p>
        </div>
      `
    });

    // Send notification to restaurant
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to restaurant email
      subject: 'New Customer Review',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h3>New Review Details:</h3>
          <p><strong>Name:</strong> ${name} ${surname}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Rating:</strong> ${rating} stars</p>
          ${review ? `<p><strong>Comments:</strong> "${review}"</p>` : '<p><strong>Comments:</strong> No additional comments provided.</p>'}
        </div>
      `
    });

    // Store review in database if available
    if (!isMockDatabase()) {
      await pool.query(
        'INSERT INTO reviews (name, surname, email, phone, rating, review_text) VALUES (?, ?, ?, ?, ?, ?)',
        [name, surname, email, phone, rating, review]
      );
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Review submitted successfully!' 
    });
  } catch (error) {
    console.error('Review submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit review. Please try again later.' 
    });
  }
});

// Contact form endpoint
app.post('/send-message', async (req, res) => {
  const { name, surname, email, phone, message } = req.body;
  
  // Validate required fields
  if (!name || !surname || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name, surname, email and message are required' 
    });
  }

  try {
    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We\'ve Received Your Message - Kelly\'s Kitchen',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a4a4a;">Thank You for Contacting Us!</h2>
          <p>Dear ${name} ${surname},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p>Here's a copy of your message:</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><em>"${message}"</em></p>
          </div>
          <p>If you need immediate assistance, please call us at 010-1234567.</p>
          <p>Best regards,<br>The Kelly's Kitchen Team</p>
        </div>
      `
    });

    // Send notification to restaurant
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to restaurant email
      subject: 'New Contact Form Message',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h3>New Message Details:</h3>
          <p><strong>Name:</strong> ${name} ${surname}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Message:</strong> "${message}"</p>
        </div>
      `
    });

    // Store message in database if available
    if (!isMockDatabase()) {
      await pool.query(
        'INSERT INTO contact_messages (name, surname, email, phone, message) VALUES (?, ?, ?, ?, ?)',
        [name, surname, email, phone, message]
      );
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Test database connection on startup
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database host: ${process.env.DB_HOST}`);
  console.log(`Development mode: ${process.env.DEV_MODE === 'true' ? 'ON' : 'OFF'}`);
  
  // Test database connection
  const dbConnected = await testConnection();
  if (dbConnected) {
    console.log('Database connection successful');
  } else {
    if (process.env.DEV_MODE === 'true') {
      console.log('Running in local development mode with mock database');
    } else {
      console.log('WARNING: Failed to connect to database. Check your database settings in .env file.');
      console.log('To use mock data for development, set DEV_MODE=true in your .env file.');
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  const dbStatus = isMockDatabase() ? 'mock' : 'connected';
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running', 
    database: dbStatus 
  });
});

// Get menu items endpoint
app.get('/api/menu', async (req, res) => {
  try {
    if (isMockDatabase()) {
      // Return mock data for local development
      return res.status(200).json({ 
        success: true, 
        data: [
          { item_id: 1, name: 'Eggs Benedict', price: 85.00, category_name: 'Breakfast' },
          { item_id: 2, name: 'French Toast', price: 75.00, category_name: 'Breakfast' },
          { item_id: 3, name: 'Gourmet Burger', price: 120.00, category_name: 'Main' }
        ],
        mock: true
      });
    }
    
    const [rows] = await pool.query(`
      SELECT m.*, c.name as category_name 
      FROM menu_items m
      JOIN menu_categories c ON m.category_id = c.category_id
      WHERE m.is_active = TRUE
      ORDER BY c.display_order, m.name
    `);
    
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch menu items' });
  }
});

// Get featured menu items endpoint
app.get('/api/featured-menu', async (req, res) => {
  try {
    if (isMockDatabase()) {
      // Return mock data for local development
      return res.status(200).json({ 
        success: true, 
        data: [
          { item_id: 2, name: 'French Toast', price: 75.00, category_name: 'Breakfast', is_featured: true },
          { item_id: 3, name: 'Gourmet Burger', price: 120.00, category_name: 'Main', is_featured: true }
        ],
        mock: true
      });
    }
    
    const [rows] = await pool.query(`
      SELECT m.*, c.name as category_name 
      FROM menu_items m
      JOIN menu_categories c ON m.category_id = c.category_id
      WHERE m.is_featured = TRUE AND m.is_active = TRUE
      ORDER BY c.display_order, m.name
    `);
    
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching featured menu:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch featured menu items' });
  }
});

// Get approved reviews endpoint
app.get('/api/reviews', async (req, res) => {
  try {
    if (isMockDatabase()) {
      // Return mock data for local development
      return res.status(200).json({ 
        success: true, 
        data: [
          { 
            review_id: 1, 
            name: 'Sarah', 
            surname: 'Johnson', 
            rating: 5, 
            review_text: 'Amazing food and atmosphere! The milkshakes are absolutely divine.',
            created_at: new Date().toISOString()
          },
          { 
            review_id: 2, 
            name: 'Michael', 
            surname: 'Smith', 
            rating: 5, 
            review_text: 'Best restaurant in Kempton Park! The service is exceptional.',
            created_at: new Date().toISOString()
          }
        ],
        mock: true
      });
    }
    
    const [rows] = await pool.query(`
      SELECT * FROM reviews
      WHERE is_approved = TRUE
      ORDER BY created_at DESC
      LIMIT 10
    `);
    
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'An unexpected error occurred on the server' 
  });
});

module.exports = app; // Export for testing purposes