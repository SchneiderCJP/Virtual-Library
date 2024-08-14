import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Book } from './Book';
import shelfImage from '../assets/shelf.png';
import loadingSpinner from '../assets/loading.gif'; 
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const ShowBooksL = () => {
  const [books, setBooks] = useState([]); // State to store the list of books
  const [error, setError] = useState(null); // State to store any error messages
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index for book display
  const [loading, setLoading] = useState(true); // Loading state
  const backendUrl = process.env.BACKEND_URL;

  useEffect(() => {
    // Fetches the list of books when it opens
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

  // Handles moving to the next set of books
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= books.length - 2 ? 0 : newIndex; // Wrap around if necessary
    });
  };

  // Handles moving to the previous set of books
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? books.length - 3 : newIndex; // Wrap around if necessary
    });
  };

  // Determines which books to display based on the current index
  const getBooksToDisplay = () => {
    if (books.length < 3) {
      return books; // Show all books if fewer than 3
    }
    const startIndex = currentIndex;
    return [
      books[startIndex % books.length],
      books[(startIndex + 1) % books.length],
      books[(startIndex + 2) % books.length],
    ];
  };

  const booksToDisplay = getBooksToDisplay();

  return (
    <div className="booksContainerL">
      {loading && <img className="loadingSpinner" src={loadingSpinner} alt="Loading..." />} {/*Display loading spinner*/}
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
