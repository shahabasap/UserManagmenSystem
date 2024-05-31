import React, { useRef, useState } from "react";
import "./RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const RegisterForm = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const mobileNumRef = useRef(null);
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mobileNumError, setMobileNumError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const validateName = () => {
    const name = nameRef.current.value;
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!name || specialChars.test(name)) {
      setNameError("Name is required and should not contain special symbols");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = () => {
    const email = emailRef.current.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    const password = passwordRef.current.value;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError("Password must be at least 8 characters long and contain at least one special character");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateMobileNum = () => {
    const mobileNum = mobileNumRef.current.value;
    if (mobileNum.length !== 10 || isNaN(mobileNum)) {
      setMobileNumError("Mobile number must be 10 digits");
      return false;
    }
    setMobileNumError("");
    return true;
  };

  const handleNameChange = () => {
    validateName();
  };

  const handleEmailChange = () => {
    validateEmail();
  };

  const handlePasswordChange = () => {
    validatePassword();
  };

  const handleMobileNumChange = () => {
    validateMobileNum();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateName() && validateEmail() && validatePassword() && validateMobileNum() && image) {
      try {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "userProfile");
  
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/djl33exai/image/upload",
          formData
        );
  
        if (response.data && response.data.secure_url) {
          setImageUrl(response.data.secure_url);
  
          const DataInsertion = await axios.post('/api/users/', {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            mobilenum: mobileNumRef.current.value,
            imageUrl: response.data.secure_url,
          });
  
          if (DataInsertion) {
            console.log("hi");
            Swal.fire({
              title: 'Success!',
              text: 'User registered successfully!',
              icon: 'success',
              timer: 3000, // Close alert after 3 seconds
              showConfirmButton: false // Disable OK button
            });
            
            navigate('/')
          }
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to register user. Please try again later.',
            icon: 'error',
            timer: 3000, // Close alert after 3 seconds
            timerProgressBar: true,
            showConfirmButton: false
          });
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };
  

  return (
    <div className="signupScreen">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input ref={nameRef} type="text" placeholder="User name" onChange={handleNameChange} />
        {nameError && <p className="error">{nameError}</p>}
        <input ref={emailRef} type="email" placeholder="Email Address" onChange={handleEmailChange} />
        {emailError && <p className="error">{emailError}</p>}
        <input ref={passwordRef} type="password" placeholder="Password" onChange={handlePasswordChange} />
        {passwordError && <p className="error">{passwordError}</p>}
        <input ref={mobileNumRef} type="number" placeholder="Mobile Number" onChange={handleMobileNumChange} />
        {mobileNumError && <p className="error">{mobileNumError}</p>}
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Sign Up</button>
        <h5>
          <Link to="/">
            <span className="signupScreen_link">Sign In now?</span>
          </Link>
        </h5>
      </form>
    </div>
  );
};

export default RegisterForm;
