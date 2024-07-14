import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <p>
        Raul Asadov - ShiftOrganizer Synchronizer 2024
        <span className="icon-space"></span>
        <a  href="https://github.com/3raulo9/ShiftOrganizer-Synchronizer" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} className="footer-icon" />
        </a>
        <a href="https://www.linkedin.com/in/raul-asadov/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="footer-icon" />
        </a>
      </p>
      <ul className="nav justify-content-center">
        <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
        <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
      </ul>
    </div>
  );
};

export default Footer;
