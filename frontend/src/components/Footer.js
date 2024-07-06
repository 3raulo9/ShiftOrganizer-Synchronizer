import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <p>Raul Asadov - ShiftOrganizer Synchronizer 2024</p>
      <ul className="nav justify-content-center">
        <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
        <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
      </ul>
    </div>
  );
};

export default Footer;
