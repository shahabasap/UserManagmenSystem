import React from 'react';
import './AdminHome.css';
import Navbar from '../Nav';

const AdminHome = () => {
    return (
        <div className='main-container'>
        <Navbar />
            <div className="admin-container">
                <h2>User Management</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Display user data */}
                            <tr>
                                <td>John Doe</td>
                                <td>john@example.com</td>
                                <td>john@example.com</td>
                                <td>
                                    <button className="edit-button">Edit</button>
                                    <button className="delete-button">Delete</button>
                                </td>
                            </tr>
        
                            {/* Add more rows for other users */}
                        </tbody>
                    </table>
                </div>
                <button className="add-button">Add User</button>
            </div>
        </div>
    );
};

export default AdminHome;
