import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/user/userSlice';
import axios from 'axios';

function Header() {
    const user=useSelector(selectUser)
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post('/api/users/logout');
            dispatch(logout()); // Dispatch logout action
            console.log("Logout successful");
        } catch (error) {
            console.error("Logout failed:", error.message);
            // Handle error - display a message to the user, etc.
        }
    };
         console.log(user);
    return ( 
        <div className='nav-black'>
            <div className='nav-content'>
                <h1 className='nav-logo'>User Management System</h1>
                {user?<div className='nav-right'>
                    <Link to='/profile'><button>Profile</button></Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>:null}
            </div>
        </div>
    );
}

export default Header;
