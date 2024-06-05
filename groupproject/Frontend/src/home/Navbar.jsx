
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: 'user',
        password: 'password',
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="navbar-buttons">
        {isLoggedIn ? (
          <img src="profile-icon.png" alt="Profile" className="profile-icon" />
        ) : (
          <button className="login-button" onClick={handleLogin}>
            <Link to="./login">Login</Link>
          </button>
        )}
        {!isLoggedIn && (
          <button className="register-button">
            <Link to="./register">Register</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
