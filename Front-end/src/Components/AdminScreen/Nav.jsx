import React from 'react';
import './login/Navbar.css';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../features/admin/adminSlice';
import Swal from 'sweetalert2';

const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
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
                dispatch(adminLogout());
                Swal.fire({
                    icon: 'success',
                    title: 'Logged out',
                    text: 'You have been successfully logged out!',
                });
            }
        });
    };

    return (
        <nav className="navbar">
            <div className="navbar-heading">Admin Panel</div>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
    );
};

export default Navbar;
