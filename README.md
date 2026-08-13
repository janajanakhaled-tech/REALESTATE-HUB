# RealEstate Hub - Property Module

## Description
This project is a REST API for managing real estate properties using Node.js, Express.js, and MongoDB.

## Features
- Create a new property
- Get all properties
- Get a property by ID
- Update property information
- Delete a property
- Upload property images using Multer
- Store uploaded image filename in MongoDB

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer

## How to Run

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the server:

   ```bash
   npm start
   ```

## API Usage Examples

### Create Property
Creates a new property with its information and image.

### Get All Properties
Returns a list of all properties.

### Get Property by ID
Returns one property using its ID.

### Update Property
Updates property information or uploads a new image.

### Delete Property
Deletes a property from the database.

## Author

Jana Khaled Gamal