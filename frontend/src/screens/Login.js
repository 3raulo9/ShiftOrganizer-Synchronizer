import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Link as MuiLink
} from '@mui/material';

const Login = ({ setIsAuthenticated }) => {
  const [formFields, setFormFields] = useState([{ username: '', password: '' }]);
  const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const values = [...formFields];
    values[index][event.target.name] = event.target.value;
    setFormFields(values);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formFields[0], {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      localStorage.setItem('token', response.data.access_token);
      setIsAuthenticated(true);
      navigate('/');  // Redirect to home page
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed.');
    }
  };

  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        style={{
          backgroundImage: "url('https://www.shiftorganizer.com/wp-content/uploads/2017/10/Shift_dark.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Card style={{ width: '100%', maxWidth: '500px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom textAlign="center">
              Login
            </Typography>
            <form onSubmit={onSubmit}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={formFields[0].username}
                  onChange={(event) => handleInputChange(0, event)}
                  required
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formFields[0].password}
                  onChange={(event) => handleInputChange(0, event)}
                  required
                />
              </Box>
              <Box textAlign="center">
                <Button variant="contained" color="primary" type="submit">
                  Login
                </Button>
              </Box>
            </form>
            <Box mt={2} textAlign="center">

                ?Don't have an account
                <Typography>                <MuiLink component="button" onClick={() => navigate('/register')}>
                  Register
                </MuiLink><br/>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
