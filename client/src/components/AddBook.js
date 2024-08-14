import axios from 'axios';
import React, { useState } from 'react';
import coverImage from "../assets/coverUnavailable.jpg";
import searchingSpinner from '../assets/searching.gif'; 

const AddBook = () => {
  // Initial state for the book form
  const initialBookState = {
    title: "",
    author: "",
    cover: "",
    description: "",
    date: ""
  };

  const [book, setBook] = useState(initialBookState);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [addedText, setAddedText] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Fetch search results based on query
  const handleSearch = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(`${backendUrl}/search?q=${searchQuery}`);
      setSearchResults(response.data.slice(0, 20)); // Limit results to 20
    } catch (err) {
      // Handle error during search
      console.error("Error fetching search results:", err);
    }
    setLoading(false); // Stop loading
  };

  // Set book details from search result
  const handleResultClick = (result) => {
    setBook({
      title: result.title || "",
      author: result.author || "",
      cover: result.cover || "",
      description: result.description || "",
      date: result.date || ""
    });
    setSearchResults([]); // Clear search results after selection
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty title and author fields
    if (!book.title || !book.author) {
      setTitleError(!book.title);
      setAuthorError(!book.author);
      setAddedText("Each book must have a title and author.");
      return; // Stop submission if validation fails
    }

    try {
      await axios.post(`${backendUrl}/books`, book); // Add book to the library
      setAddedText(`${book.title} has been added to the library.`);
      setBook(initialBookState); // Reset form
      setTitleError(false);
      setAuthorError(false);
    } catch (err) {
      // Handle error during book addition
      console.error('Error adding the book:', err);
    }
  };

  // Format date for display
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

  // Sets to today's date and time in a readable string format
  const handleTodayClick = () => {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    setBook((prev) => ({ ...prev, date: formattedDate }));
  };

  return (
    <div>
      <h1 className="title">Add New Book</h1>
      <div className="addMenu">
        <div className="addMenuSearch">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>

          <div className="searchesListBox">
            {loading ? (
              <div className="bookSearch">
                <img src={searchingSpinner} alt="Searching Icon" />
                <p>Searching</p>
              </div>
            ) : (
              searchResults.length > 0 && (
                <ul className="searchesList">
                  {searchResults.map((result, index) => (
                    <li key={index} onClick={() => handleResultClick(result)}>
                      {result.title}
                      {/*Loads a no cover available image if the cover is invalid or there is none*/}
                      <img
                        src={result.cover && result.cover !== "No cover available" ? result.cover : coverImage}
                        alt={`Cover for ${result.title}`}
                      />
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>
        </div>
        <div className="addMenuInputs">
          <input
            type="text"
            placeholder="Title"
            onChange={handleChange}
            name="title"
            value={book.title}
            className={titleError ? "error" : ""}
          />
          <input
            type="text"
            placeholder="Author"
            onChange={handleChange}
            name="author"
            value={book.author}
            className={authorError ? "error" : ""}
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
          <div className="dateInputSection">
            <input
              type="text"
              placeholder="Date"
              onChange={handleChange}
              name="date"
              value={book.date}
            />
            <button onClick={handleTodayClick}>Today</button>
          </div>

          <button onClick={handleSubmit}>Add</button>
        </div>
      </div>
      <p className="addMenuNotif">{addedText}</p>
    </div>
  );
};

export default AddBook;
