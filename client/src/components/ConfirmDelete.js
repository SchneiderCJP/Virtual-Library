import React from 'react';

const ConfirmDelete = ({ bookTitle, onClose, onConfirm }) => {
    // Return null if no book title is provided
    if (!bookTitle) return null;

    return (
        <div className="deleteModal"> 
            <h3>Are you sure you want to delete:</h3>
            <h2>"{bookTitle}"</h2> {/*Display the title of the book to be deleted*/}
            <div className="deleteButtonsContainer">
                <button className="deleteButton" onClick={onConfirm}>Delete</button> {/*Button to confirm deletion; color changes when hovered*/}
                <button onClick={onClose}>Cancel</button> 
            </div>
        </div>
    );
};

export default ConfirmDelete;
