import React, { useEffect, useState } from 'react';
import Navbar from '../Nav';
import './ProfileEdit.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileEditAdmin = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [userid, setUserid] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobilenum, setMobileNum] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        axios.get(`/api/admin/user/${id}`)
            .then((response) => {
                setEmail(response.data.email);
                setName(response.data.name);
                setMobileNum(response.data.mobilenum);
                setUser(response.data);
                setUserid(response.data.userid);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [id]);

    const handleSave = (e) => {
        e.preventDefault();
        if (isEditing) {
            const updatedUser = { userid, email, name, mobilenum };
            axios.put(`/api/admin/updateUser`, updatedUser)
                .then((response) => {
                    console.log('User updated:', response.data);
                    setIsEditing(false); // Disable edit mode after saving
                    // Optionally, redirect or show a success message
                })
                .catch((error) => {
                    console.log(error.message);
                });
        } else {
            setIsEditing(true); // Enable edit mode
        }
    };

    return (
        <div>
            <Navbar />
            <div className="profile-edit-container">
                <h2>Edit Profile</h2>
                <div className="form-container">
                    <form onSubmit={handleSave}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile Number</label>
                            <input 
                                type="number" 
                                id="mobilenumber" 
                                name="mobilenumber" 
                                value={mobilenum}
                                onChange={(e) => setMobileNum(e.target.value)} 
                                readOnly={!isEditing}
                            />
                        </div>
                        <button className="save-button" type="submit">
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditAdmin;
