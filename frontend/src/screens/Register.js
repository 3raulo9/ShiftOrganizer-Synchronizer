import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UserForm.css';
import '../styles/App.css';

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
      await axios.post('http://localhost:5000/register', { username: randomUsername, password: randomPassword }, {
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
      alert('Test account created and logged in successfully.');
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
    <div className="container">
      <section className="text-center">
        <div
          className="p-5 bg-image"
          style={{ backgroundImage: "url('https://www.shiftorganizer.com/wp-content/uploads/2017/10/Shift_dark.jpg')", height: '300px' }}
        ></div>
        <div className="card mx-4 mx-md-5 shadow-5-strong" style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
          <div className="card-body py-5 px-md-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <h2 className="fw-bold mb-5">Register</h2>
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <div className="input-container">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formFields[0].username}
                        onChange={(event) => handleInputChange(0, event)}
                        required
                      />
                      <label htmlFor="username" className="label">Username</label>
                      <div className="underline"></div>
                    </div>
                    <div className="input-container">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formFields[0].password}
                        onChange={(event) => handleInputChange(0, event)}
                        required
                      />
                      <label htmlFor="password" className="label">Password</label>
                      <div className="underline"></div>
                    </div>
                  </div>
                  <div className="btn-container">
                    <input type="submit" value="Register" className="btn btn-primary" />
                    <div className="tooltip-container">
                      <button type="button" onClick={createTestAccount} className="btn btn-secondary ml-2">Create Test Account</button>
                      <span className="tooltip-text">For testing the API</span>
                    </div>
                  </div>
                </form>
                <p>Have an account? <span className="link" onClick={() => navigate('/login')}>Login</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
