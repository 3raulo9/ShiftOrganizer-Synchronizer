import React, { useState, useEffect } from 'react';
import UserForm from '../components/UserForm';
import UserCard from '../components/UserCard';
import '../styles/Home.css';

const Home = ({ handleSubmit, userData, numUsers, setNumUsers }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="content">
          <UserForm numUsers={numUsers} setNumUsers={setNumUsers} handleSubmit={handleSubmit} />
          <div className="user-cards">
            {userData.map((user, index) => (
              <UserCard key={index} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
