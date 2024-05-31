import React from 'react';
import './login/Navbar.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/admin/adminSlice';

const Navbar = () => {
    const dispatch=useDispatch()

    const handleLogout=()=>{
        dispatch(logout())
    }
    return (
        <nav className="navbar">
            <div className="navbar-heading">Admin Panel</div>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
    );
};

export default Navbar;