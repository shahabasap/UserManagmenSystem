import React, { useRef, useState } from "react";
import Navbar from '../Nav';
import "./addUser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const AddUser = () => {
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const mobilenum = useRef(null);
    const [image, setImage] = useState(null);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [mobileNumError, setMobileNumError] = useState("");
    const navigate = useNavigate();

    const validateName = () => {
        const nameValue = name.current.value;
        if (!nameValue.trim() || nameValue.includes("@")) {
            setNameError("Name is required and should not contain '@'");
            return false;
        }
        setNameError("");
        return true;
    };

    const validateEmail = () => {
        const emailValue = email.current.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) {
            setEmailError("Invalid email address");
            return false;
        }
        setEmailError("");
        return true;
    };

    const validatePassword = () => {
        const passwordValue = password.current.value;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordPattern.test(passwordValue)) {
            setPasswordError("Password must be at least 8 characters long and contain at least one special character");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const validateMobileNum = () => {
        const mobileNumValue = mobilenum.current.value;
        if (mobileNumValue.length !== 10 || isNaN(mobileNumValue)) {
            setMobileNumError("Mobile number must be 10 digits");
            return false;
        }
        setMobileNumError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateName() && validateEmail() && validatePassword() && validateMobileNum() && image) {
            try {
                let imageUrl = "";
                if (!imageUrl) {
                    const data = new FormData();
                    data.append("file", image);
                    data.append("upload_preset", "userProfile");

                    const response = await axios.post(
                        "https://api.cloudinary.com/v1_1/djl33exai/image/upload",
                        data
                    );

                    if (response.data && response.data.url) {
                        imageUrl = response.data.url;
                    } else {
                        console.error("Image upload failed");
                        return;
                    }
                }

                const DataInsertion = await axios.post('/api/admin/AddUser', {
                    name: name.current.value,
                    email: email.current.value,
                    password: password.current.value,
                    mobilenum: mobilenum.current.value,
                    imageUrl: imageUrl,
                });

                if (DataInsertion) {
                    Swal.fire({
                        icon: 'success',
                        title: 'User Added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/admin');
                }
            } catch (error) {
                console.error("Error:", error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="signupScreen">
                <form onSubmit={handleSubmit}>
                    <h1>Add User</h1>
                    <input ref={name} type="text" placeholder="User name" onChange={validateName} />
                    {nameError && <p className="error">{nameError}</p>}
                    <input ref={email} type="email" placeholder="Email Address" onChange={validateEmail} />
                    {emailError && <p className="error">{emailError}</p>}
                    <input ref={password} type="password" placeholder="Password" onChange={validatePassword} />
                    {passwordError && <p className="error">{passwordError}</p>}
                    <input ref={mobilenum} type="number" placeholder="Mobile Number" onChange={validateMobileNum} />
                    {mobileNumError && <p className="error">{mobileNumError}</p>}
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    <button type="submit">Add User</button>
                    <Link to='/admin/home'><span className="Back-track">Back</span></Link>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
