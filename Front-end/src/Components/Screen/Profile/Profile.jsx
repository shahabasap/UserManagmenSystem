import React, { useEffect, useRef, useState } from 'react';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Profile = () => {

  const[userData,setData]=useState(null)
  const[image,setImage]=useState(null)

  useEffect(()=>{
    axios.get('/api/users/profile').then((response)=>{
      setData(response.data.user)
    
  }).catch((error)=>{
    console.log(error.message)
  })
  },[])
  const imageUploader=async()=>{
    try {
      
      let imageUrl = "";
      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "userProfile");
       console.log(data);

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/djl33exai/image/upload",
          data
        );



        if (response.data) {
          imageUrl = response.data.url; // Get the URL of the uploaded image
          const DataUpdation = await axios.put("/api/users/profile", {
            imageUrl:imageUrl
          }).then((response)=>{
            console.log(response.data);
          }).catch((error)=>{
            console.log(error.message);
          })
          
        } else {
          console.error("Image upload failed");
          return;
        }
      }
      
    } catch (error) {
      console.log(erro.message);
    }

  }
  
  return (
    
    <div className='Profile-Screen'>
        <div className="middleDiv">
         <div className='profile-contents'>
            <div className="image-flex">
                <img className='profile-image' src={userData?.imageUrl} alt="Profile-image" /><br />
                <input onChange={(e)=>{setImage(e.target.files[0])}} className='upload-name' type="file" />
                <button onClick={imageUploader} className='btn-upload'>upload</button>
              
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
