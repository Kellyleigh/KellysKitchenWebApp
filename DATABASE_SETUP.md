# Kelly's Kitchen Database Setup Guide

## Overview
Your website is now configured to use Azure Static Web Apps with Data API builder to connect to your MySQL database. Here's what has been updated:

## Files Modified
1. **booking.js** - Now uses `/rest/Bookings` endpoint
2. **review.js** - Now uses `/rest/Reviews` endpoint  
3. **newsletter.js** - Now uses `/rest/NewsletterSubscribers` endpoint
4. **menu-loader.js** - New file to load menu items from `/rest/MenuItems`
5. **menu.html** - Updated to include new scripts
6. **test-db.html** - New test page to verify database connectivity

## Database Setup Steps

### 1. Initialize Your Database
Run the `init-database.sql` script on your Azure MySQL database to populate it with sample data:

```sql
-- Connect to your Azure MySQL database and run:
mysql -h kellysserver.mysql.database.azure.com -u Kellyleigh -p kellysdatabase < init-database.sql
```

### 2. Verify SWA Configuration
Your `swa-cli.config.json` is already configured correctly with:
- MySQL connection string from environment variable
- REST and GraphQL endpoints enabled
- Proper entity permissions for anonymous users

### 3. Environment Variables
Make sure your Azure Static Web App has the environment variable:
```
DATABASE_CONNECTION_STRING=Server=kellysserver.mysql.database.azure.com;Port=3306;Database=kellysdatabase;Uid=Kellyleigh;Pwd=Needback51!;SslMode=Required;
```

### 4. Test the Database Connection
1. Deploy your updated files to Azure Static Web Apps
2. Visit `https://kellyskitchen-gmgsh5eqaqf9gyg3.southafricanorth-01.azurewebsites.net/test-db.html`
3. Click each test button to verify:
   - Menu items can be loaded
   - Bookings can be created
   - Reviews can be submitted
   - Newsletter subscriptions work

## API Endpoints Now Available

### Menu Items
- **GET** `/rest/MenuItems` - Get all menu items
- **GET** `/rest/MenuItems/item_id/{id}` - Get specific menu item

### Bookings  
- **POST** `/rest/Bookings` - Create new booking
- **GET** `/rest/Bookings` - Get all bookings (if permissions allow)

### Reviews
- **POST** `/rest/Reviews` - Submit new review
- **GET** `/rest/Reviews` - Get all reviews

### Newsletter
- **POST** `/rest/NewsletterSubscribers` - Subscribe to newsletter

## How It Works

1. **Static Web Apps Data API** automatically creates REST endpoints based on your database schema
2. **swa-cli.config.json** defines which tables are exposed and what permissions are required
3. **Frontend JavaScript** now calls these REST endpoints instead of your custom server
4. **Database operations** happen directly through Azure's managed service

## Benefits

- ✅ No need to manage a separate backend server
- ✅ Automatic scaling and high availability
- ✅ Built-in security and authentication
- ✅ Direct database access through REST/GraphQL APIs
- ✅ Reduced complexity and maintenance

## Troubleshooting

If the database isn't working:

1. **Check Environment Variables**: Ensure `DATABASE_CONNECTION_STRING` is set in your Azure Static Web App configuration
2. **Verify Database Access**: Make sure your Azure MySQL server allows connections from Azure services
3. **Test Endpoints**: Use the test page to identify which specific endpoints are failing
4. **Check Logs**: Review Azure Static Web Apps logs for any error messages

## Next Steps

1. Deploy the updated files to your Azure Static Web App
2. Run the database initialization script
3. Test all functionality using the test page
4. Your website should now be fully functional with database integration!