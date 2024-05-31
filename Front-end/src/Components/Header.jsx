import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/user/userSlice';
import axios from 'axios';
import Swal from 'sweetalert2';

function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post('/api/users/logout');
            dispatch(logout()); // Dispatch logout action
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
        <div className='nav-black'>
            <div className='nav-content'>
                <h1 className='nav-logo'>User Management System</h1>
                {user ? (
                    <div className='nav-right'>
                        <Link to='/profile'><button>Profile</button></Link>
                        <button onClick={confirmLogout}>Logout</button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Header;
