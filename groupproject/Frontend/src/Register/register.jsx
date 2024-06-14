import { useState,useEffect } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
import "./register.css";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 
  let errorTimeout = null;

  const clearErrorAfterDelay = () => {
    if (errorTimeout) {
      clearTimeout(errorTimeout);
    }
    errorTimeout = setTimeout(() => setError(null), 5000);
  };

  useEffect(() => {
    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout); // Clean up the timeout on component unmount
      }
    };
  }, []);

  const handleNameChange = (event) => {
    const inputValue = event.target.value;
    const validName = /^[A-Za-z\s]+$/;
    if (validName.test(inputValue) || inputValue === '') {
      setName(inputValue);
      setError(null);
    }else {
      setError({ type: 'error', content: 'Name should only contain letters and spaces.' });
      clearErrorAfterDelay();
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword || !dateOfBirth) {
      setError({ type: 'error', content: 'Please fill in all required fields.' });
      clearErrorAfterDelay();
      return;
    }

    if (password !== confirmPassword) {
      setError({ type: 'error', content: 'Passwords do not match.' });
      clearErrorAfterDelay();
      return;
    }

    const newUser = {
      name,
      email,
      password,
      date_of_birth: dateOfBirth,
    };

    try {
      const response = await axios.post('/api/register', newUser);
      console.log('Response:', response.data);
      
      setError({ type: 'success', content: 'Registration successful' });
      clearErrorAfterDelay();
      setTimeout(() => setError(null), 5000); 
      
      
      navigate('/login');

    } catch (error) {
      console.error('Error:', error.response.data.error);
      setError({ type: 'error', content: error.response.data.error });

      setTimeout(() => setError(null), 5000); 
    }
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src="../../public/home/back.jpg" alt="Woman practicing yoga" />
      </div>
      <div className="form-section">
        <div className="form-container">
          <div className="back-button">
            <a href="./">&lt; Back</a>
          </div>
          <h2>Create new Account</h2>
          <p>
            Already Registered? <a href="/Login">Login</a>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dof">Date Of Birth</label>
              <input
                  type="date"
                  id="dof"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  max={new Date().toISOString().split('T')[0]} // Set max date to today
                  required
                />
            </div>
            <button type="submit" className="register-btn">
              Register Account
            </button>
          </form>
          {/* Render alert message if exists */}
          {error && (
            <Alert severity={error.type} onClose={() => setError(null)}>
              {error.content}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
