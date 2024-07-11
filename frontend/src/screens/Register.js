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

const Register = ({ setIsAuthenticated }) => {
  const [formFields, setFormFields] = useState([{ username: '', password: '' }]);
  const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const values = [...formFields];
    values[index][event.target.name] = event.target.value;
    setFormFields(values);
  };

  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const createTestAccount = async () => {
    const randomUsername = generateRandomString(8);
    const randomPassword = generateRandomString(12);
    try {
      // Register the test account
      await axios.post('http://localhost:5000/register', { username: randomUsername, password: randomPassword, is_test_account: true }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Log in the test account
      const response = await axios.post('http://localhost:5000/login', { username: randomUsername, password: randomPassword }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      localStorage.setItem('token', response.data.access_token);
      setIsAuthenticated(true);
      alert('Test account created and logged in successfully, be aware that this account will be deleted in 30 minutes.');
      navigate('/');  // Redirect to home page
    } catch (error) {
      console.error('Error creating or logging in test account:', error);
      alert('Creating or logging in test account failed.');
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', formFields[0], {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed.');
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
              Register
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
                  Register
                </Button>
                <Button variant="contained" color="secondary" onClick={createTestAccount} style={{ marginLeft: '10px' }}>
                  Create Test Account
                </Button>
              </Box>
            </form>
            <Box mt={2} textAlign="center">
              <Typography>

                ?Have an account<br/>
                <MuiLink component="button" onClick={() => navigate('/login')}>
                  Login
                </MuiLink>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
