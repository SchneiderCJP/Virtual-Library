import React from 'react';
import { RiCloseLine } from "react-icons/ri"; // Import close icon from react-icons

const Modal = ({ isOpen, onClose, children }) => {
  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="modalOverlay"> {/*Overlay to darken background*/}
      <div className="modalContent">
        <button className="modalClose" onClick={onClose}> {/*Button to close the modal*/}
          <RiCloseLine /> {/*Close icon*/}
        </button>
        {children} {/*Child components or content inside the modal */}
      </div>
    </div>
  );
};

export default Modal;