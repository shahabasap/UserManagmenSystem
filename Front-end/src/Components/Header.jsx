import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout, selectUser } from '../features/user/userSlice';
import axios from 'axios';
import Swal from 'sweetalert2';

function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post('/api/users/logout');
            dispatch(userLogout()); // Dispatch logout action
            Swal.fire({
                icon: 'success',
                title: 'Logged out',
                text: 'You have been successfully logged out!',
            });
        } catch (error) {
            console.error("Logout failed:", error.message);
            Swal.fire({
                icon: 'error',
                title: 'Logout failed',
                text: 'There was an error logging out. Please try again.',
            });
        }
    };

    const confirmLogout = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to log out?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleLogout();
            }
        });
    };

    return (
        <nav className="navbar">
    <div className="navbar-heading">User Management System</div>
    {user ? (
        <div className="navbar-right">
            <Link to="/profile"><button>Profile</button></Link>
            <button onClick={confirmLogout} className="logout-button">Logout</button>
        </div>
    ) : null}
</nav>

    );
}

export default Header;
