import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import About from './screens/About';
import Register from './screens/Register';
import Login from './screens/Login';
import Loader from './components/Loader'; // Import the Loader component
import './styles/App.css';
import './styles/Loader.css';

function App() {
  const [numUsers, setNumUsers] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post('https://shiftorganizer-synchronizer.onrender.com/display_shift_data', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUserData(response.data.user_data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleTest = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('https://shiftorganizer-synchronizer.onrender.com/display_shift_data_test', {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUserData(response.data.user_data);
    } catch (error) {
      console.error('Error fetching test data:', error);
    }
    setLoading(false);
  };

  return (
    <Router>
      <div className="app">
        {loading ? (
          <div className="loader-container">
            <Loader /> {/* Use the Loader component */}
          </div>
        ) : (
          <>
            <Header />
            <div className="content-wrap">
              <Routes>
                <Route path="/" element={isAuthenticated ? <Home handleSubmit={handleSubmit} handleTest={handleTest} userData={userData} numUsers={numUsers} setNumUsers={setNumUsers} setLoading={setLoading} /> : <Navigate to="/login" />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              </Routes>
            </div>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
