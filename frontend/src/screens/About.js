import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, AppBar, Toolbar, Link, Grid } from '@mui/material';
import '../styles/About.css';

const About = () => {
  return (
    <Container maxWidth="md" className="container_about">

      <main>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            About ShiftOrganizer Synchronizer 2024
          </Typography>
          <Typography variant="body1" paragraph>
            ShiftOrganizer Synchronizer 2024 is an unofficial application crafted by Raul Asadov. Our mission is to streamline and enhance the shift organizing experience by enabling synchronization across multiple users and various places of work.
          </Typography>
          <Typography variant="body1" paragraph>
            In a dynamic work environment where teams operate across different locations, our application facilitates the synchronization of shifts, making collaboration and coordination seamless. By leveraging advanced technologies, ShiftOrganizer Synchronizer 2024 empowers users to efficiently manage and organize their work schedules, ensuring optimal coverage and minimizing scheduling conflicts.
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Key Features:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Multi-User Synchronization: Connect and synchronize shifts from two or more users across different workplaces." />
            </ListItem>
            <ListItem>
              <ListItemText primary="User-Friendly Interface: Enjoy an intuitive interface designed for ease of use, allowing users to effortlessly navigate and manage their shift data." />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            Join us in revolutionizing the way shifts are organized and synchronized. ShiftOrganizer Synchronizer 2024 is not just a tool; it's a commitment to enhancing workplace efficiency and collaboration.
          </Typography>
        </Box>
      </main>

    </Container>
  );
};

export default About;
