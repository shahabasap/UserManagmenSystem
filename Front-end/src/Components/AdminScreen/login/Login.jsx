import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { login, selectAdmin } from '../../../features/admin/adminSlice';

const LoginAdmin = () => {
    const email=useRef(null)
    const password=useRef(null)
    
    const navigate=useNavigate()

    const dispatch=useDispatch(selectAdmin)


    const handleLogin=async(e)=>{
                e.preventDefault()
                
                if (email.current.value && password.current.value) {

                    axios.post('/api/admin/',{
                        email:email.current.value,
                        password:password.current.value
                    }).then((response)=>{
                         dispatch(login({
                            email:email.current.value,
                            password:password.current.value
                         }))
                        navigate('/admin/home')

                    }).catch((error)=>{
                        console.log(error.message);
                    })
                }

    }
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
        </div>
    );
};

export default LoginAdmin;