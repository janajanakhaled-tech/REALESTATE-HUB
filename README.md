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


## Authentication Module

### Description

The Authentication Module provides user registration and login functionality using Node.js, Express.js, MongoDB, Mongoose, bcryptjs, and JSON Web Tokens (JWT).

It allows users to:
- Create a new account
- Login using email and password
- Receive a JWT token after successful authentication
- Access protected routes using the JWT token

### User Roles

The system currently supports the following roles:

- Customer
- Admin

New users are registered as `customer` by default.

### Authentication Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/v1/auth/signup` | Register a new user |
| POST | `/api/v1/auth/login` | Login an existing user |
| GET | `/api/v1/auth/me` | Access the authenticated user's data |

### Signup

**POST**
`/api/v1/auth/signup`

Example request:

```json
{
  "firstName": "Jana",
  "lastName": "Khaled",
  "email": "jana@gmail.com",
  "password": "12345678",
  "phone": "01012345678"
}