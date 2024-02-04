# Paytm-clone

This is a basic money transfer app built with Node.js, Express, React, MongoDB and Tailwind CSS.

## Key Features

- User signup and sign-in
- Interactive Dashboard
- Account creation with a random initial balance
- Viewing account balance
- Transferring money between accounts

## Technologies Used

- Node.js
- Express
- React
- MongoDB
- Mongoose
- Tailwind CSS
- JSON Web Tokens (JWT)

## API Endpoints

### User Routes

- `POST /signup`: Create a new user account
- `POST /signin`: Sign in to a user account
- `PUT /`: Update user information
- `GET /me`: Get current user information
- `GET /bulk`: Get a list of users (with optional filtering)

### Account Routes

- `GET /balance`: Get account balance
- `POST /transfer`: Transfer money between accounts

## Additional Notes

- The app uses middleware to protect certain routes that require authentication.
- Transactions are used to ensure data consistency when transferring money.
