import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Book } from './Book'; 
import shelfImage from '../assets/shelf.png';
import loadingSpinner from '../assets/loading.gif'; 
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const ShowBooks = () => {
  const [books, setBooks] = useState([]); // State to store the list of books
  const [error, setError] = useState(null); // State to store any error messages
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index for book display
  const [loading, setLoading] = useState(true); // Loading state
  const backendUrl = process.env.BACKEND_URL;

  useEffect(() => {
    // Fetches the list of books it opens
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${backendUrl}/books`); // Fetch books from the backend
        const reversedBooks = response.data.reverse(); // Reverse the array for display so latest book is first displayed
        setBooks(reversedBooks);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError('An error occurred while fetching books.');
        setLoading(false); // Ensure loading is set to false in case of error
      }
    };

    fetchBooks();
  }, []); 

  // Handles moving to the next book
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= books.length ? 0 : newIndex; // Wrap around to the start if at the end
    });
  };

  // Handles moving to the previous book
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? books.length - 1 : newIndex; // Wrap around to the end if at the start
    });
  };

  // Determines which book to display based on the current index
  const getBooksToDisplay = () => {
    if (books.length === 0) return []; // Return an empty array if no books are available
    return [books[currentIndex]]; // Display the current book
  };

  const booksToDisplay = getBooksToDisplay();

  return (
    <div className="booksContainer">
      {loading && <img className="loadingSpinner" src={loadingSpinner} alt="Loading..." />} {/*Show loading spinner*/}
      {error && <p>{error}</p>} {/*Display error message if any*/}
      {!loading && books.length > 0 && (
        <div>
          <div className="books">
            {booksToDisplay.map(book => (
              <Book
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                cover={book.cover}
                date={book.date}
                description={book.description}
              />
            ))}
          </div>
          <img className="shelf" src={shelfImage} alt="Bookshelf to hold books" />
          <div className="bookButtons">
            <button className="nav-button" onClick={handlePrev}>
              <FaArrowLeft /> {/*Previous button*/}
            </button>
            <button className="nav-button" onClick={handleNext}>
              <FaArrowRight /> {/*Next button*/}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
