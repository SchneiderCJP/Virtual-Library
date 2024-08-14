# Virtual Library Backend 📚

This repository contains the backend for the Virtual Library project, a web application designed to manage a collection of books. The backend is built using Node.js and Express, and it provides RESTful APIs to interact with the book database.

## Description

The Virtual Library backend is responsible for managing book data, including adding, updating, retrieving, and deleting books from a MySQL database. It also includes a feature for searching books using the Open Library API.

### Key Features

- **RESTful API**: Offers endpoints for CRUD operations on books.
- **Search Functionality**: Integrates with the Open Library API to search for books.
- **Rate Limiting**: Protects the API from abuse by limiting the number of requests per IP.
- **Data Caching**: Uses in-memory caching to reduce repeated API calls.
- **Security and Performance**: Includes middleware for CORS, compression, and rate limiting.

## Technologies Used

- **Node.js**
- **Express**
- **MySQL**
- **Axios**
- **Open Library API**
- **dotenv**
- **cors**
- **compression**
- **express-rate-limit**

## Installation and Setup

To run this project locally, follow these steps:

### 1. Clone the Repository:
```bash
git clone https://github.com/SchneiderCJP/Virtual-Library/.git
cd backend
```

### 2. Install Dependencies:
```bash
npm install
```

### 3. Set Up Environment Variables:
Create a `.env` file in the root directory and add the following environment variables:

```bash
# Server Port
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=virtual_library
```
### 4. Run the Server:
```bash
npm start
```

The server will start running on http://localhost:3000.

## API Endpoints

### 1. **Search Books**
   - **Endpoint**: `/search`
   - **Method**: `GET`
   - **Description**: Search for books using the Open Library API.
   - **Query Parameters**:
     - `q` (required): The search query.
     - `page` (optional): The page number for pagination (default: 1).
     - `limit` (optional): The number of results per page (default: 20).

### 2. **Get All Books**
   - **Endpoint**: `/books`
   - **Method**: `GET`
   - **Description**: Retrieve all books from the database.

### 3. **Get Book by ID**
   - **Endpoint**: `/books/:id`
   - **Method**: `GET`
   - **Description**: Retrieve a specific book by its ID.

### 4. **Add a New Book**
   - **Endpoint**: `/books`
   - **Method**: `POST`
   - **Description**: Add a new book to the database.
   - **Body Parameters**:
     - `title` (required): The book title.
     - `author` (required): The book author(s).
     - `cover`: URL to the book's cover image.
     - `description`: A brief description of the book.
     - `date`: The book's publish date.

### 5. **Update a Book**
   - **Endpoint**: `/books/:id`
   - **Method**: `PUT`
   - **Description**: Update an existing book's information.
   - **Body Parameters**: Same as the `Add a New Book` endpoint.

### 6. **Delete a Book**
   - **Endpoint**: `/books/:id`
   - **Method**: `DELETE`
   - **Description**: Delete a book from the database by its ID.

## Contact

For any inquiries or feedback, please contact me at [SchneiderCJP@gmail.com](mailto:schneidercjp@gmail.com).
