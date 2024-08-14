import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UpdateBook = ({ id, onClose, onConfirm }) => {
    // Initial state for the book object
    const initialBookState = {
        title: "",
        author: "",
        cover: "",
        description: "",
        date: ""
    };

    const backendUrl = process.env.BACKEND_URL;

    const [book, setBook] = useState(initialBookState); // State to hold book data
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        // Fetches the book details when it opens or when `id` changes
        const fetchBook = async () => {
            if (!id) return; // Exit if no ID is provided

            setLoading(true);
            try {
                const response = await axios.get(`${backendUrl}/books/${id}`);
                const fetchedBook = response.data;

                // Update state with fetched book details
                setBook({
                    title: fetchedBook.title || "",
                    author: fetchedBook.author || "",
                    cover: fetchedBook.cover || "",
                    description: fetchedBook.description || "",
                    date: fetchedBook.date || ""
                });
            } catch (err) {
                console.error("Error fetching book details:", err);
            }
            setLoading(false);
        };

        fetchBook();
    }, [id]);

    // Handles input changes to update the book state
    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Handles form submission to update the book
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${backendUrl}/books/${id}`, book);
            onConfirm(); // Notifies that the update is confirmed
        } catch (err) {
            console.error("Error updating the book:", err);
        }
        onClose(); // Close the modal after submission
    };

    // Formats the date to a readable string format
    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    // Sets the date input to the current date and time
    const handleTodayClick = () => {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        setBook((prev) => ({ ...prev, date: formattedDate }));
    };

    // Show loading text while fetching book data
    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="title">Update Book</h1>
            <div className="updateMenu">
                <input
                    type="text"
                    placeholder="Title"
                    onChange={handleChange}
                    name="title"
                    value={book.title}
                />
                <input
                    type="text"
                    placeholder="Author"
                    onChange={handleChange}
                    name="author"
                    value={book.author}
                />
                <input
                    type="text"
                    placeholder="Description"
                    onChange={handleChange}
                    name="description"
                    value={book.description}
                />
                <input
                    type="text"
                    placeholder="Cover URL"
                    onChange={handleChange}
                    name="cover"
                    value={book.cover}
                />
                <div className="dateUpdateSection">
                    <input
                        type="text"
                        placeholder="Date"
                        onChange={handleChange}
                        name="date"
                        value={book.date}
                    />
                    <button onClick={handleTodayClick}>Today</button>
                </div>
                <button className="formButton" onClick={handleSubmit}>Update</button>
            </div>
        </div>
    );
}

export default UpdateBook;
