# Kelly's Kitchen Web App

A restaurant website with booking, reviews, and contact functionality.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 recommended)

### Database Setup
1. Install MySQL on your local machine if not already installed
2. Create a database named `KellysDatabase`
3. Import the schema from `database.sql`

You can use the provided batch script on Windows:
```
setup-local-db.bat
```

Or manually with MySQL command line:
```
mysql -u root -p
CREATE DATABASE KellysDatabase;
USE KellysDatabase;
source database.sql;
```

### Environment Configuration
1. Copy `.env.example` to `.env`
2. Update the database credentials in `.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=KellysDatabase
   ```
3. Set `DEV_MODE=false` to use the real database
4. Add your Gmail credentials for email functionality:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```
   Note: For Gmail, you need to use an App Password, not your regular password

### Installation
```
npm install
```

### Running the Application
```
npm start
```

For development with auto-reload:
```
npm run dev
```

## Deployment Instructions

### For Azure Static Web Apps
1. Update the `.env` file with your Azure MySQL database credentials
2. Deploy using Azure Static Web Apps CLI or GitHub Actions

### For other hosting providers
1. Ensure Node.js is available on your hosting environment
2. Set up a MySQL database
3. Update the `.env` file with your database credentials
4. Deploy the application files
5. Run `npm install` and `npm start` on your server

## Troubleshooting

### Database Connection Issues
- Verify your MySQL service is running
- Check that the credentials in `.env` are correct
- Ensure your database exists and has the correct schema

### Email Sending Issues
- For Gmail, make sure you're using an App Password
- Verify your email credentials in `.env`

### Development Mode
If you're having trouble with the database connection, you can set `DEV_MODE=true` in your `.env` file to use mock data for development.