import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import Navbar from '../Nav';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import Swal from SweetAlert

const AdminHome = () => {
    const [users, setUsers] = useState([]);
    const [isModified, setModified] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/admin/userData')
            .then((response) => {
                setUsers(response.data.usersData);
                setModified(false);
            })
            .catch((error) => {
                console.error(error.message);
            });
    }, [isModified]);

    const deleteUser = (userid) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this user. This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`/api/admin/deleteUser/${userid}`)
                    .then((response) => {
                        Swal.fire({
                            title: 'Success!',
                            text: 'User data deleted!',
                            icon: 'success',
                            timer: 3000, // Close alert after 3 seconds
                            showConfirmButton: false // Disable OK button
                        });

                        setModified(true);
                    }).catch((error) => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'User deletion gone wrong!',
                            icon: 'error',
                            timer: 3000, // Close alert after 3 seconds
                            showConfirmButton: false // Disable OK button
                        });
                        console.log(error.message);
                    });
            }
        }).catch((error) => { // Catch block for Swal.fire
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete user. Please try again later.',
                icon: 'error',
                timer: 3000, // Close alert after 3 seconds
                showConfirmButton: false // Disable OK button
            });
            console.error(error.message);
        });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='main-container'>
            <Navbar />
            <div className="admin-container">
                <h2>User Management</h2>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
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
                            {filteredUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobilenum}</td>
                                    <td className='action-here'>
                                        <Link to={`/admin/profile/${user._id}`}>
                                            <button className="edit-button">Edit</button>
                                        </Link>
                                        <button onClick={() => deleteUser(user._id)} className="delete-button">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={() => navigate('/admin/addUser')} className="add-button">Add User</button>
            </div>
        </div>
    );
};

export default AdminHome;
