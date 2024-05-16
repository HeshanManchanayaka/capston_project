import React, { useState } from "react";
import "./register.css";

function Register() {
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    const inputValue = event.target.value;
    // Regular expression to allow only letters
    const onlyLetters = /^[A-Za-z]+$/;
    if (onlyLetters.test(inputValue) || inputValue === "") {
      setName(inputValue);
    }
  };
  return (
    <div className="container">
      <div className="image-section">
        <img src="" alt="Woman practicing yoga" />
      </div>
      <div className="form-section">
        <div className="form-container">
          <div className="back-button">
            <a href="./">&lt; Back</a>
          </div>
          <h2>Create new Account</h2>
          <p>Already Registered? Login</p>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Email Address" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="dof">Date Of Birth</label>
              <input type="date" id="dof" />
            </div>
            <div className="form-group">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="register-btn">
              Register Account
            </button>
            <p>
              Do not have an account? <a href="./Login">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
