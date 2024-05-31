import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../features/admin/adminSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginAdmin = () => {
    const email = useRef(null);
    const password = useRef(null);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email.current.value && password.current.value) {
            axios.post('/api/admin/', {
                email: email.current.value,
                password: password.current.value
            }).then((response) => {
                dispatch(login({
                    email: email.current.value,
                    password: password.current.value
                }));

                toast.success("Login Successful");
                navigate('/admin/home');
            }).catch((error) => {
                toast.error("Login Failed");
                console.log("Error:", error.message);
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input ref={email} type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input ref={password} type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginAdmin;
