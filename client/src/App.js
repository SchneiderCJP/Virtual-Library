import './App.css';
import AddBook from './components/AddBook';
import AllBooks from './components/AllBooks';
import { ShowBooks } from './components/ShowBooks';
import { ShowBooksL } from './components/ShowBooksL';
import Modal from './components/Modal'; // Modal component import
import React, { useState, useEffect } from 'react';
import WelcomePopup from './components/WelcomePopup';

function App() {
  // State to manage the visibility of the "Add Book" modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = () => setIsAddModalOpen(true);

  // Close the "Add Book" modal and refresh the page to reflect changes
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    window.location.reload(); // Reload to refresh the data
  }

  // State to manage the visibility of the "All Books" modal
  const [isAllBModalOpen, setIsAllBModalOpen] = useState(false);
  const openAllBModal = () => setIsAllBModalOpen(true);
  const closeAllBModal = () => setIsAllBModalOpen(false);

  // State to track if the screen is large or small
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 900);

  // State to manage the welcome popup visibility
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show the welcome popup only once using localStorage
    const hasShownPopup = localStorage.getItem('hasShownPopup');
    if (!hasShownPopup) {
      setShowPopup(true);
      localStorage.setItem('hasShownPopup', 'true');
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    // Handle screen resize to update isLargeScreen state
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 900);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      {/*Conditionally show the welcome popup*/}
      {showPopup && <WelcomePopup onClose={closePopup} />}

      {/*Conditionally show a different book slide show based on screen size*/}
      {isLargeScreen ? <ShowBooksL /> : <ShowBooks />}

      <div>
        {/*Buttons to open modals for adding and viewing books*/}
        <div className="mainButtons">
          <button onClick={openAddModal}>Add A New Book</button>
          <button onClick={openAllBModal}>View All Books</button>
        </div>
        {/*Text signature*/}
        <p className="signature">Created by: Schneider C. Jean-Pierre</p>

        {/*Modal for adding a new book*/}
        <Modal className="modal" isOpen={isAddModalOpen} onClose={closeAddModal}>
          <AddBook />
        </Modal>

        {/*Modal for viewing all books*/}
        <Modal className="modal" isOpen={isAllBModalOpen} onClose={closeAllBModal}>
          <AllBooks />
        </Modal>
      </div>
    </div>
  );
}

export default App;
