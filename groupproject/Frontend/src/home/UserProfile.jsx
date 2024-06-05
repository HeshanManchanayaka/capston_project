import  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './User.css'; // Assuming you have a CSS file for styling

const UserProfile = () => {
  return (
    <div className="container">
      <div className="row gutters">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <UserProfileCard />
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <PersonalDetailsCard />
        </div>
      </div>
    </div>
  );
};

const UserProfileCard = () => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="account-settings">
          <div className="user-profile">
            <div className="user-avatar">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Maxwell Admin"
              />
            </div>
            <h5 className="user-name">Yuki Hayashi</h5>
            <h6 className="user-email">yuki@Maxwell.com</h6>
          </div>
          <div className="about">
            <h5>About</h5>
            <p>
              Im Yuki. Full Stack Designer I enjoy creating user-centric,
              delightful and human experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PersonalDetailsCard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [dobError, setDobError] = useState('');

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);

    const namePattern = /^[A-Za-z\s]+$/;

    if (!namePattern.test(newName)) {
      setNameError('Please enter a valid name (letters and spaces only)');
    } else {
      setNameError('');
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(newEmail)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);

    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(newPhone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
    } else {
      setPhoneError('');
    }
  };

  const handleDobChange = (e) => {
    const newDob = e.target.value;
    setDob(newDob);

    // Get today's date
    const today = new Date();
    // Calculate the date 5 years ago from today
    const fiveYearsAgo = new Date(today);
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

    // Convert the selected date to a Date object
    const selectedDate = new Date(newDob);

    // Check if the selected date is more than 5 years ago
    if (selectedDate > fiveYearsAgo) {
      setDobError('Please select a date of birth that is 5 years ago or earlier');
    } else {
      setDobError('');
    }
  };

  // Format the minimum date as YYYY-MM-DD for the date input field
  const maxDate = `${new Date().getFullYear() - 5}-${
    (new Date().getMonth() + 1).toString().padStart(2, '0')
  }-${new Date().getDate().toString().padStart(2, '0')}`;

  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h6 className="mb-2 text-primary">Personal Details</h6>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                className={`form-control ${nameError ? 'is-invalid' : ''}`}
                id="fullName"
                placeholder="Enter full name"
                value={name}
                onChange={handleNameChange}
              />
              {nameError && (
                <div className="invalid-feedback">{nameError}</div>
              )}
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                id="email"
                placeholder="Enter email ID"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className={`form-control ${phoneError ? 'is-invalid' : ''}`}
                id="phone"
                placeholder="Enter phone number"
                value={phone}
                onChange={handlePhoneChange}
              />
              {phoneError && (
                <div className="invalid-feedback">{phoneError}</div>
              )}
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                className={`form-control ${dobError ? 'is-invalid' : ''}`}
                id="dob"
                placeholder="Enter date of birth"
                value={dob}
                onChange={handleDobChange}
                max={maxDate}
              />
              {dobError && (
                <div className="invalid-feedback">{dobError}</div>
              )}
            </div>
          </div>
        </div>
        <br />
        <div className="row gutters">
          <div className="text-right">
            <button
              type="button"
              id="delete"
              name="delete"
              className="btn btn-secondary"
            >
              Delete
            </button>
            <button
              type="button"
              id="update"
              name="update"
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
