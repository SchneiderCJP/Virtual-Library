import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConfirmDelete from './ConfirmDelete';
import Modal from './Modal';
import UpdateBook from './UpdateBook';
import coverImage from "../assets/coverUnavailable.jpg";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [isConfirmUpdateOpen, setIsConfirmUpdateOpen] = useState(false);
    let updated = false; // Tracks if the book has been updated
    const backendUrl = process.env.BACKEND_URL;

    // Fetch books when it opens
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`${backendUrl}/books`);
                const reverseSet = response.data.reverse(); // Reverse book array to display latest books first
                setBooks(reverseSet);
            } catch (error) {
                setError('An error occurred while fetching books.'); // Error handling
            }
        };

        fetchBooks();
    }, []);

    // Open delete confirmation modal with selected book
    const openConfirmDelete = (book) => {
        setSelectedBook(book);
        setIsConfirmDeleteOpen(true);
    };

    // Close delete confirmation modal
    const closeConfirmDelete = () => {
        setSelectedBook(null);
        setIsConfirmDeleteOpen(false);
    };

    // Open update confirmation modal with selected book
    const openConfirmUpdate = (book) => {
        setSelectedBook(book);
        setIsConfirmUpdateOpen(true);
    };

    // Close update confirmation modal and reload page if book was updated
    const closeConfirmUpdate = () => {
        setSelectedBook(null);
        setIsConfirmUpdateOpen(false);
        if (updated) window.location.reload(); 
    };

    // Handle book deletion
    const handleDelete = async () => {
        try {
            if (selectedBook) {
                await axios.delete(`${backendUrl}/books/${selectedBook.id}`);
                setBooks((prevBooks) => prevBooks.filter((book) => book.id !== selectedBook.id)); // Remove deleted book from all
                closeConfirmDelete();
            }
        } catch (error) {
            // Handle error during book deletion
            console.error('Error deleting the book:', error);
        }
    };

    return (
        <div className="bookLogContainer">
            <h1 className="title">All Books</h1>
            {error && <p>{error}</p>}
            {books.length > 0 && (
                <div className="bookLogList">
                    {books.map((book) => (
                        <li key={book.id}>
                            {/*Sets the book cover to a no cover available image if an image is not inputted or valid */}
                            <img
                                src={book.cover && book.cover !== "No cover available" ? book.cover : coverImage}
                                alt={`Cover of ${book.title}`}
                            />
                            <div className="bookLogInfo">
                                <h2>{book.title}</h2>
                                <h3>By: {book.author}</h3>
                                <p>{book.date}</p>
                            </div>
                            <p className="bookDescription">{book.description}</p>
                            <div className="bookLogButtons">
                                <button onClick={() => openConfirmUpdate(book)}>Update Book</button>
                                <button onClick={() => openConfirmDelete(book)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </div>
            )}

            {/*Modal for confirming deletion*/}
            <Modal isOpen={isConfirmDeleteOpen} onClose={closeConfirmDelete}>
                <ConfirmDelete
                    bookTitle={selectedBook?.title}
                    onClose={closeConfirmDelete}
                    onConfirm={handleDelete}
                />
            </Modal>

            {/*Modal for updating book*/}
            <Modal isOpen={isConfirmUpdateOpen} onClose={closeConfirmUpdate}>
                <UpdateBook
                    id={selectedBook ? selectedBook.id : ""}
                    onClose={closeConfirmUpdate}
                    onConfirm={() => { updated = true; }} // Sets updated to true if update takes place
                />
            </Modal>
        </div>
    );
};

export default AllBooks;
