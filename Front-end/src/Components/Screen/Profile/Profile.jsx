import React, { useEffect, useRef, useState } from 'react';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Profile = () => {

  const[userData,setData]=useState(null)

  useEffect(()=>{
    axios.get('/api/users/profile').then((response)=>{
      setData(response.data.user)
  }).catch((error)=>{
    console.log(error.message)
  })
  },[])
  
  return (
    
    <div className='Profile-Screen'>
        <div className="middleDiv">
         <div className='profile-contents'>
            <div className="image-flex">
                <img className='profile-image' src={userData?.imageUrl} alt="Profile-image" />
            </div>
            <div className="user-details">
                <div><span>Name</span> :{userData?.name}</div> <br />
                <div><span>Email</span>:{userData?.email}</div> <br />
                <div><span>Number</span>:{userData?.mobilenum}</div><br />
                 <Link to='/profileEdit'><button className='edit-button'>Edit</button></Link>
            </div>
            
         </div>
        </div>
    
  </div> 
  )
}

export default Profile
