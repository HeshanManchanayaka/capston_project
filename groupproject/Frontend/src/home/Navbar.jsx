// src/NavBar.js
import  { useState, useEffect } from 'react';
import './Navbar.css';

function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Fetch the login status from the backend
        fetch('http://localhost:5000/api/profile/status')
            .then(response => response.json())
            .then(data => {
                if (data.isLoggedIn) {
                    setIsLoggedIn(true);
                }
            });
    }, []);

    return (
        <nav className="navbar">
            <div className="logo">
                <img src="../../src/assets/home/logo.png" alt="Logo" />
            </div>
            <h3>ZEN FIT YOGA</h3>
            {isLoggedIn && (
                <div className="profile">
                    <img src="/profile.png" alt="Profile" />
                </div>
            )}
        </nav>
    );
}

export default NavBar;
