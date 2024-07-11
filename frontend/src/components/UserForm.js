import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Box,
  IconButton,
  Slide,
  Grow,
  Fab,
  Icon,
  Link
} from '@mui/material';
import { Add, Delete, Logout } from '@mui/icons-material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../styles/UserForm.css';
import '../styles/App.css';
import '../styles/Animations.css';  // Add your animations CSS here

const UserForm = ({ numUsers, setNumUsers, handleSubmit, setLoading }) => {
  const [formFields, setFormFields] = useState([{ company_id: '', username: '', password: '' }]);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const values = [...formFields];
    values[index][event.target.name] = event.target.value;
    setFormFields(values);
  };

  const handleAddFields = () => {
    setNumUsers(numUsers + 1);
    setFormFields([...formFields, { company_id: '', username: '', password: '' }]);
  };

  const handleRemoveFields = (index) => {
    setIsDeleting(true);
    const values = [...formFields];
    values.splice(index, 1);
    setFormFields(values);
    setNumUsers(numUsers - 1);
  };

  const handleAnimationEnd = () => {
    setIsDeleting(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = { num_users: numUsers };
    formFields.forEach((field, index) => {
      data[`company_id_${index}`] = field.company_id;
      data[`username_${index}`] = field.username;
      data[`password_${index}`] = field.password;
    });
    await handleSubmit(data);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <Container maxWidth="md">
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Box sx={{ textAlign: 'center', mb: 4, mt: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Enter your users
          </Typography>
        </Box>
      </Slide>
      <Grow in={true}>
        <Card sx={{ p: 2, backdropFilter: 'blur(30px)', background: 'rgba(255, 255, 255, 0.8)' }}>
          <CardContent>
            <form onSubmit={onSubmit}>
              <Box display="flex" flexDirection={formFields.length > 1 || isDeleting ? "row" : "column"} flexWrap="wrap" justifyContent="center">
                <TransitionGroup component={null}>
                  {formFields.map((field, index) => (
                    <CSSTransition
                      key={index}
                      timeout={500}
                      classNames="fade"
                      onExited={handleAnimationEnd}
                    >
                      <Box m={1} width={formFields.length > 1 || isDeleting ? "45%" : "100%"}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Company ID"
                          name="company_id"
                          value={field.company_id}
                          onChange={(event) => handleInputChange(index, event)}
                          required
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Username"
                          name="username"
                          value={field.username}
                          onChange={(event) => handleInputChange(index, event)}
                          required
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Password"
                          name="password"
                          type="password"
                          value={field.password}
                          onChange={(event) => handleInputChange(index, event)}
                          required
                          sx={{ mb: 2 }}
                        />
                        {index !== 0 && (
                          <Box textAlign="right">
                            <IconButton
                              color="error"
                              onClick={() => handleRemoveFields(index)}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Fab
                  variant="extended"
                  color="success"
                  onClick={handleAddFields}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  Add User
                  <Add/>
                </Fab>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  Submit
                  <Add  />
                </Button>
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleLogout}
                  sx={{ display: 'flex', alignItems: 'center', color: 'red' }}
                >
                  Logout
                  <Logout />
                </Link>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Grow>
    </Container>
  );
};

export default UserForm;
