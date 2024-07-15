import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY <= 0 || currentScrollY < lastScrollY.current) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <nav
      className={`navbar navbar-dark bg-dark ${
        showHeader ? "navbar-visible" : "navbar-hidden"
      }`}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="mb-0 logo">Synchronizer</h1>
          <Link to="/">
            <img
              src="https://www.shiftorganizer.com/wp-content/uploads/2017/03/logo.png"
              alt="ShiftOrganizer"
              height="35"
              className="logo-img"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
