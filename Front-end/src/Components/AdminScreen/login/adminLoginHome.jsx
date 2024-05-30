// App.jsx
import React from 'react';
import Navbar from '../Nav';
import LoginAdmin from './Login';


const AdminLoginHome = () => {
    return (
        <div>
            <Navbar />
            <LoginAdmin />
        </div>
    );
};

export default AdminLoginHome;
