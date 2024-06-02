import { useState } from "react";
import "./register.css";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");

  

  const handleNameChange = (event) => {
    const inputValue = event.target.value;
    const validName = /^[A-Za-z\s]+$/;
    if (validName.test(inputValue) || inputValue === "") {
      setName(inputValue);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      name,
      email,
      password,
      date_of_birth: dateOfBirth,
    };

    try {
      const response = await axios.post("http://localhost:5000/register", newUser);
      console.log("Response:", response.data);
      setError("");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src="../../public/home/back.jpg" alt="Woman ticing yoga" />
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
              <label htmlFor="dof">Date Of Birth</label>
              <input
                type="date"
                id="dof"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="register-btn">
              Register Account
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Register;
