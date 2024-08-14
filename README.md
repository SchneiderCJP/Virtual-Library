# Virtual Library Project 📚

The Virtual Library Project is a web application designed to manage a collection of books. This repository contains both the frontend and backend components of the project.

## Project Structure

- **`client/`**: Contains the frontend code built with React.
- **`backend/`**: Contains the backend code built with Node.js and Express.

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/SchneiderCJP/Virtual-Library/.git
cd virtual-library
```

### 2. Set Up Backend
Navigate to the `backend` directory and follow the setup instructions:
```bash
cd backend

# Install Backend Dependencies
npm install

# Set Up Environment Variables
# Create a .env file in the backend directory with the following content:
# PORT=3000
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password_here
# DB_NAME=virtual_library

# Start the Backend Server
npm start
```
#### Backend README Overview:

For detailed instructions on setting up and using the backend, see the `backend/README.md`.

### 3. Set Up Frontend
Navigate to the `client` directory and follow the setup instructions:

```bash
cd ../client

# Install Frontend Dependencies
npm install

# Set Up Environment Variables
# Create a .env file in the client directory with the following content:
# BACKEND_URL=http://localhost:3000

# Start the Frontend Development Server
npm start
```
#### Frontend README Overview:

For detailed instructions on setting up and using the frontend, see the `client/README.md`.

## Features
- **Frontend**: A responsive React application for interacting with the Virtual Library.
- **Backend**: A RESTful API built with Node.js and Express for managing book data and integrating with the Open Library API.

## Technologies Used
- **Frontend**: React, JavaScript, CSS
- **Backend**: Node.js, Express, MySQL, Axios, Open Library API, dotenv, cors, compression, express-rate-limit

## Contact

For any inquiries or feedback, please contact me at [SchneiderCJP@gmail.com](mailto:schneidercjp@gmail.com).



