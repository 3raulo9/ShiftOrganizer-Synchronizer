import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import About from './screens/About';
import './styles/App.css';
import './styles/Loader.css';

function App() {
  const [numUsers, setNumUsers] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/display_shift_data', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setUserData(response.data.user_data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <Header />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home handleSubmit={handleSubmit} userData={userData} numUsers={numUsers} setNumUsers={setNumUsers} setLoading={setLoading} />} />
                <Route path="/about" element={<About />} />
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
