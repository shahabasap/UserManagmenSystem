import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import Navbar from '../Nav';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const [users, setUsers] = useState([]);
    const[isModified,setModified]=useState(false)
    const navigate=useNavigate()

    useEffect(() => {
        axios.get('/api/admin/userData')
            .then((response) => {
                setUsers(response.data.usersData);
                setModified(false)
            })
            .catch((error) => {
                console.error(error.message);
            });
            
    }, [isModified]);

    const deleteUser=(userid)=>{
        axios.get(`/api/admin/deleteUser/${userid}`)
        .then((response)=>{
           console.log("response ",response.data)
           setModified(true)
        }).catch((error)=>{
            console.log(error.message);
        })

    }

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
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobilenum}</td>
                                    <td>
                                      <Link to={`/admin/profile/${user._id}`}><button className="edit-button">Edit</button></Link>
                                      <button onClick={() => deleteUser(user._id)} className="delete-button">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={()=>
                    navigate('/admin/addUser')
                } className="add-button">Add User</button>
            </div>
        </div>
    );
};

export default AdminHome;
