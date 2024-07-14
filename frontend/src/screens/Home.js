import React from 'react';
import UserForm from '../components/UserForm';
import UserCard from '../components/UserCard';
import '../styles/Home.css';

const Home = ({ handleSubmit, handleTest, userData, numUsers, setNumUsers, setLoading }) => {
  return (
    <div className="home">
      <div className="content">
        <UserForm 
          numUsers={numUsers} 
          setNumUsers={setNumUsers} 
          handleSubmit={handleSubmit} 
          setLoading={setLoading} 
          handleTest={handleTest}
        />
        <div className="user-cards">
          {userData.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
