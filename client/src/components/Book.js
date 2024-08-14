import React, { useState } from 'react';
import ConfirmDelete from './ConfirmDelete';
import axios from 'axios';
import Modal from './Modal';
import UpdateBook from './UpdateBook';
import coverImage from "../assets/coverUnavailable.jpg";
import loadingSpinner from '../assets/loading.gif';

export const Book = ({ id, title, author, cover, date, description }) => {
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isConfirmUpdateOpen, setIsConfirmUpdateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const backendUrl = process.env.BACKEND_URL;

  // Open the confirmation modal for delete
  const openConfirmDelete = () => setIsConfirmDeleteOpen(true);

  // Close the confirmation modal for delete
  const closeConfirmDelete = () => {
    setIsConfirmDeleteOpen(false);
    if (deleted) window.location.reload(); // Reload if deletion confirmed
  };

  // Open the confirmation modal for update
  const openConfirmUpdate = () => setIsConfirmUpdateOpen(true);

  // Close the confirmation modal for update
  const closeConfirmUpdate = () => {
    setIsConfirmUpdateOpen(false);
    if (updated) window.location.reload(); // Reload if update confirmed
  };

  // Handle the book deletion process
  const handleDelete = async () => {
    try {
      await axios.delete(`${backendUrl}/books/${id}`);
      deleted = true;
      closeConfirmDelete();
    } catch (error) {
      // Handle error during book deletion
      console.error('Error deleting the book:', error);
    }
  };

  // Track deletion and update status
  let deleted = false;
  let updated = false;

  return (
    <div>
      <div className="book">
        <img
          className="bookImg"
          src={cover && cover !== "No cover available" ? cover : coverImage}
          alt={`Cover of ${title}`}
          onLoad={() => setIsLoading(false)} // Hide loader when image loads
          onError={() => setIsLoading(false)} // Hide loader if image fails to load
        />
        {isLoading && <img className="loadingSpinner" src={loadingSpinner} alt="Loading..." />} {/*Show loading spinner*/}
        <div className="bookSlideContainer">
          <div className="bookDetails">
            <h1>{title}</h1>
            <h2>By: {author}</h2>
            <h3>{date}</h3>
            <p>{description}</p>
          </div>
          <div className='bookDetailsButtons'>
            <button onClick={openConfirmDelete}>Delete Book</button> {/*Opens the delete confirmation modal*/}
            <button onClick={openConfirmUpdate}>Update Book</button> {/*Opens the update confirmation modal*/}
          </div>
        </div>
      </div>

      {/*Modal for confirming deletion*/}
      <Modal isOpen={isConfirmDeleteOpen} onClose={closeConfirmDelete}>
        <ConfirmDelete
          bookTitle={title}
          onClose={closeConfirmDelete}
          onConfirm={handleDelete}
        />
      </Modal>

      {/*Modal for updating book*/}
      <Modal isOpen={isConfirmUpdateOpen} onClose={closeConfirmUpdate}>
        <UpdateBook id={id} onClose={closeConfirmUpdate} onConfirm={() => { updated = true; }} />
      </Modal>
    </div>
  );
};
