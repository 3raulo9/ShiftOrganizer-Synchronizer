// components/OffCanvas.js
import React from 'react';
import '../styles/OffCanvas.css';

const OffCanvas = ({ isOpen, handleClose, children }) => {
  return (
    <div className={`offcanvas ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={handleClose}>Close</button>
      {children}
    </div>
  );
};

export default OffCanvas;
