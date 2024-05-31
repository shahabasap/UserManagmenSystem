import React, { useEffect, useState } from 'react';
import Navbar from '../Nav';
import './ProfileEdit.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileEditAdmin = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [userid, setUserid] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobilenum, setMobileNum] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileNumError, setMobileNumError] = useState('');

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

    const validateName = () => {
        if (!name.trim() || /[!@#$%^&*(),.?":{}|<>]/.test(name)) {
            setNameError("Username should not contain special symbols");
            return false;
        }
        setNameError("");
        return true;
    };

    const validateEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError("Invalid email address");
            return false;
        }
        setEmailError("");
        return true;
    };

    const validateMobileNum = () => {
        if (mobilenum.length !== 10 || isNaN(mobilenum)) {
            setMobileNumError("Mobile number must be 10 digits");
            return false;
        }
        setMobileNumError("");
        return true;
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (isEditing) {
            if (validateName() && validateEmail() && validateMobileNum()) {
                const updatedUser = { userid, email, name, mobilenum };
                axios.put(`/api/admin/updateUser`, updatedUser)
                    .then((response) => {
                        toast.success("Data updated")
                        setIsEditing(false); // Disable edit mode after saving
                        // Optionally, redirect or show a success message
                    })
                    .catch((error) => {
                        toast.error("Data not updated")
                        console.log(error.message);
                    });
            }
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
                                onBlur={validateName}
                                readOnly={!isEditing}
                            />
                            {nameError && <p className="error">{nameError}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                onBlur={validateEmail}
                                readOnly={!isEditing}
                            />
                            {emailError && <p className="error">{emailError}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile Number</label>
                            <input 
                                type="number" 
                                id="mobilenumber" 
                                name="mobilenumber" 
                                value={mobilenum}
                                onChange={(e) => setMobileNum(e.target.value)} 
                                onBlur={validateMobileNum}
                                readOnly={!isEditing}
                            />
                            {mobileNumError && <p className="error">{mobileNumError}</p>}
                        </div>
                        <button className="save-button" type="submit">
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                        <Link to='/admin/home'><span className='Back-track'>Back</span></Link>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default ProfileEditAdmin;
