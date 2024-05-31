import React, { useState } from 'react';
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { login } from '../../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();

      // Reset error messages
      setEmailError('');
      setPasswordError('');

      // Validation
      if (!email.trim()) {
        setEmailError('Email is required');
        return;
      }

      if (!password.trim()) {
        setPasswordError('Password is required');
        return;
      }

      // Call API for authentication
      const response = await axios.post('/api/users/auth', {
        email,
        password
      });

      const user = response.data;

      if (user) {
        dispatch(login(user));
        navigate('/home');
        toast.success("Logged in Successfully"); // Success toast
      }

    } catch (error) {
      toast.error("Login Failed"); // Error toast
      console.log(error.message);
    }
  };

  return (
    <div className='signupScreen'>
      <form onSubmit={handleLogin}>
        <h1>Sign In</h1>
        <input 
          type="email" 
          placeholder='Email Address' 
          value={email} 
          onChange={handleEmailChange} 
        />
        {emailError && <span className="error">{emailError}</span>}
        <input 
          type="password" 
          placeholder='Password' 
          value={password} 
          onChange={handlePasswordChange} 
        />
        {passwordError && <span className="error">{passwordError}</span>}
        <button type='submit'>Sign In</button>
        <h5>
          <Link to='/register'><span className='signupScreen_link'>Sign Up now?</span></Link>
        </h5>
      </form>
      <ToastContainer /> {/* This renders the ToastContainer at the end of the component */}
    </div>
  );
};

export default LoginForm;
