import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import '../styles/About.css';

const About = () => {
  return (
    <Container maxWidth="md" className="about-container">
      <main className="about-main">
        <Box sx={{ mt: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            About ShiftOrganizer Synchronizer
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to ShiftOrganizer Synchronizer, a web application developed by Raul Asadov. This project is designed to efficiently scrape shift data from your personal ShiftOrganizer account. The scraped data is displayed on a modern React frontend, with Flask serving as the backend. By leveraging the power of Selenium for web scraping, this application automates the process of logging into ShiftOrganizer and retrieving shift data. This ensures you always have up-to-date information about your shifts.
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Key Features:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Automated Shift Data Retrieval: Uses Selenium to log into ShiftOrganizer and scrape shift data automatically." />
            </ListItem>
            <ListItem>
              <ListItemText primary="User-Friendly Interface: Built with React and Material UI for a smooth and responsive user experience." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Secure Authentication: Provides secure user authentication using JWT-based login." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Multi-User Support: Allows multiple users to retrieve and view their shift data simultaneously." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Background Tasks: Periodic background tasks to clean up old test accounts and keep the database optimized." />
            </ListItem>
          </List>
          <Typography variant="h5" component="h2" gutterBottom>
            Technologies Used:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Frontend: React, Material UI, Axios, Anime.js" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Backend: Flask, SQLAlchemy, Bcrypt, JWT, CORS, Selenium" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Database: SQLite for simplicity and ease of setup" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Automation: Selenium WebDriver for web scraping" />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            This project showcases the integration of modern web technologies to create a functional and user-friendly application for managing shift data. Feel free to explore the code and adapt it to your own needs!
          </Typography>

        </Box>
        
      </main>
      <br/>
          <br/>
          <br/>
          <br/>
    </Container>
  );
};

export default About;
