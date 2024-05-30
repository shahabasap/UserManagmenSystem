import React from 'react';
import Navbar from '../Nav';
import './ProfileEdit.css';

const ProfileEditAdmin = () => {
    return (
        <div>
            <Navbar />
            <div className="profile-edit-container">
                <h2>Edit Profile</h2>
                <div className="form-container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" defaultValue="john_doe" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" defaultValue="john@example.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Password</label>
                            <input type="number" id="mobilenumber" name="mobilenumber" />
                        </div>
                        <button className="save-button">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditAdmin;
