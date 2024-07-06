import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import UserCard from '../components/UserCard';
import '../styles/Home.css';

const Home = ({ handleSubmit, userData, numUsers, setNumUsers }) => {
  return (
    <div className="home">
      <UserForm numUsers={numUsers} setNumUsers={setNumUsers} handleSubmit={handleSubmit} />
      <div className="user-cards">
        {userData.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Home;
