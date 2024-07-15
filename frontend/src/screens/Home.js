import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import UserCard from '../components/UserCard';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../styles/Home.css';

const Home = ({ handleSubmit, handleTest, userData, numUsers, setNumUsers, setLoading }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

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
        {userData.length > 0 && !isDrawerOpen && (
          <IconButton 
            onClick={toggleDrawer(true)} 
            className="drawer-toggle-button"
            style={{ position: 'fixed', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1000 }}
          >
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
        )}
        {isDrawerOpen && (
          <IconButton 
            onClick={toggleDrawer(false)} 
            className="drawer-toggle-button"
            style={{ position: 'fixed', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1000 }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        )}
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{ style: { width: '1300px' } }} // Set the width to desired size
        >
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            style={{ padding: 16 }}
          >
            <div className="user-cards">
              {userData.map((user, index) => (
                <UserCard key={index} user={user} />
              ))}
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Home;
