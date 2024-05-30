import React, { useRef } from 'react';
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


const LoginForm = () => {
  const email=useRef(null)
  const password=useRef(null)
  const navigate=useNavigate()
 

  const HandleLogin=async(event)=>{
    try {
      event.preventDefault()
        const user=await axios.post('/api/users/auth',{
          email:email.current.value,
          password:password.current.value
        })

        if(user)
          {
            console.log('user login succesfully')
            navigate('/home')
          }
      
    } catch (error) {
      console.log(error.message);
    }
        
  }

  return (
    
    <div className='signupScreen'>
    <form onSubmit={HandleLogin}>
      <h1>Sign In</h1>
      <input ref={email}  type="email" placeholder='Email Address' />
      <input ref={password}  type="password" placeholder='Password' />
      <button type='submit' >Sign In</button>
      <h5>  
     <Link to='/register'> <span className='signupScreen_link' >Sign Up now?</span></Link></h5>
    </form>
  </div> 
  )
}

export default LoginForm
