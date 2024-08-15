import express from 'express';
import axios from 'axios';
import supabase from './database.js';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';


const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(compression()); // Compress responses to optimize performance

// Rate limiting middleware to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// In-memory cache for search results to reduce API calls
const cache = {};

// Search for books using the Open Library API
app.get('/search', async (req, res) => {
    const query = req.query.q;
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;

    // Validate the query parameter
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required.' });
    }

    // Check if the result is already cached
    const cacheKey = `${query}-page${page}-limit${limit}`;
    if (cache[cacheKey]) {
        console.log('Serving from cache');
        return res.json(cache[cacheKey]);
    }

    try {
        // Fetch data from Open Library API
        const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`, {
            timeout: 5000 // Set timeout to 5 seconds
        });
        const books = response.data.docs;

        // Map API response to a simplified format
        const results = books.map(book => ({
            title: book.title,
            author: book.author_name ? book.author_name.join(', ') : 'Unknown',
            cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'No cover available',
            description: book.first_sentence ? book.first_sentence.join(' ') : 'No description available',
            date: book.publish_date ? book.publish_date.join(', ') : 'No release date available'
        }));

        // Store results in cache
        cache[cacheKey] = results;

        // Respond with the search results
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data from Open Library.' });
    }
});

// Retrieve a specific book by ID
app.get('/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('books')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        if (!data) {
            return res.status(404).json({ error: 'Book not found.' });
        }
        res.json(data);
    } catch (error) {
        console.error('Error fetching the book:', error);
        res.status(500).json({ error: 'An error occurred while fetching the book.' });
    }
});

// Add a new book to the database
app.post('/books', async (req, res) => {
    const { title, author, cover, description, date } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required.' });
    }

    try {
        const { data, error } = await supabase
            .from('books')
            .insert([{ title, author, cover, description, date }]);
        if (error) throw error;
        res.status(201).json({ id: data[0].id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the book.' });
    }
});

// Update an existing book's information
app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, cover, description, date } = req.body;

    try {
        const { data, error } = await supabase
            .from('books')
            .update({ title, author, cover, description, date })
            .eq('id', id);
        if (error) throw error;
        if (data.length === 0) {
            return res.status(404).json({ error: 'Book not found.' });
        }
        res.json({ message: 'Book updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the book.' });
    }
});

// Delete a book from the database
app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('books')
            .delete()
            .eq('id', id);
        if (error) throw error;
        if (data.length === 0) {
            return res.status(404).json({ error: 'Book not found.' });
        }
        res.json({ message: 'Book deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the book.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
