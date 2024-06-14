import { useState } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
import "./login.css";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage({ type: 'error', content: 'Please fill in all required fields.' });
      return;
    }

    const loginData = { email, password };

    try {
      const response = await axios.post('/api/login', loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const { token, email, userType } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);

        setMessage({ type: 'success', content: 'Login successful' });
        setTimeout(() => setMessage(null), 5000);

        setEmail('');
        setPassword('');

        // Navigate based on user type
        if (userType === 'admin') {
          navigate('/LandingPage');
        } else if (userType === 'instructor') {
          navigate('/instructor/instructor');
        } else {
          navigate('/profile');
        }
      } else {
        setMessage({ type: 'error', content: 'Login failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', content: 'Login failed' });
      setTimeout(() => setMessage(null), 5000);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src="../assets/home/side.png" alt="Woman practicing yoga" />
      </div>
      <div className="form-section">
        <div className="form-container">
          <div className="back-button">
            <a href="./">&lt; Back</a>
          </div>
          <h2>Account Login</h2>
          <p>
            If you are already a member you can login<br /> with your email address and password.
          </p>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="register-btn">
              Login Account
            </button>
            <p>
              Do not have an account? <a href="./Register">Sign up here</a>
            </p>
          </form>

          {message && (
            <Alert severity={message.type} onClose={() => setMessage(null)}>
              {message.content}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
