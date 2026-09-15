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


Authentication Module

The authentication module is responsible for handling user registration and login in the RealEstate Hub project. It uses bcryptjs to securely hash user passwords and JSON Web Tokens (JWT) for authentication.

User Roles

The project currently supports two user roles:

* Customer
* Admin

New users are registered as customer by default.

Authentication Routes

Method	Endpoint	Description
POST	/api/v1/auth/signup	Create a new user account
POST	/api/v1/auth/login	Login using email and password
GET	/api/v1/auth/me	Get the currently authenticated user’s information

Signup

To create a new account, send a POST request to:

/api/v1/auth/signup

Example:

{
  "firstName": "Jana",
  "lastName": "Khaled",
  "email": "jana@gmail.com",
  "password": "12345678",
  "phone": "01012345678"
}

After a successful signup, the API returns a JWT token that can be used to access protected routes.

Login

To login, send a POST request to:

/api/v1/auth/login

Example:

{
  "email": "jana@gmail.com",
  "password": "12345678"
}

The API returns a JWT token when the login information is correct.

If the email or password is incorrect, the API returns an authentication error.

Protected Route

The /api/v1/auth/me route is protected and requires a valid JWT token.

To access it using Postman:

1. Select the GET method.
2. Enter /api/v1/auth/me.
3. Open the Authorization tab.
4. Select Bearer Token.
5. Add the token received from signup or login.
6. Send the request.

The authenticated user’s information will be returned if the token is valid.

Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* bcryptjs
* jsonwebtoken
* Postman

Running the Module

Install the project dependencies:

npm install

Create a .env file and add the required environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

Then start the server:

npm run dev

The authentication APIs can then be tested using Postman. 