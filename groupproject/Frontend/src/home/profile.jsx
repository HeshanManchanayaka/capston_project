import React from "react";

function UserProfile() {
  const profileStyles = {
    display: "flex",
  };


  const pictureStyles = {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    marginRight: "50px",
  };

  const detailsStyles = {
    flex: 1,
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const nameStyles = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "8px",
  };

  const emailStyles = {
    fontSize: "16px",
    color: "#555",
  };

  const buttonStyles = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={profileStyles}>
      <img
        src="https://via.placeholder.com/150" // Replace with the actual profile picture URL
        alt="User Profile"
        style={pictureStyles}
      />
      <div style={detailsStyles}>
        <h2>Heshan Manchanayake</h2>
        <p style={emailStyles}>heshanmanchanayake@gmail.com</p>
        <button style={buttonStyles}>Edit Bio</button>
      </div>
    </div>
  );
}

export default UserProfile;
