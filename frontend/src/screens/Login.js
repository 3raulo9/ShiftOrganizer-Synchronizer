import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UserForm.css';
import '../styles/App.css';

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
                <h2 className="fw-bold mb-5">Login</h2>
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
                    <input type="submit" value="Login" className="btn btn-primary" />
                  </div>
                </form>
                <p>Don't have an account? <span className="link" onClick={() => navigate('/register')}>Register</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
