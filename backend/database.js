import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv'; // Import dotenv to load environment variables from .env file

// Load environment variables from .env file
dotenv.config();

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
    host: process.env.DB_HOST,       // Database host
    user: process.env.DB_USER,       // Database user, e.g., 'root'
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_NAME,   // Name of the database to connect to
});

export default pool;
