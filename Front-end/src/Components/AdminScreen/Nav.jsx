import React from 'react';
import './login/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-heading">Admin Panel</div>
            <button className="logout-button">Logout</button>
        </nav>
    );
};

export default Navbar;