import React, { useRef } from 'react';
import './Welcome.css';
import { Link, useNavigate } from 'react-router-dom';



const Welcome = () => {
  
  return (
    
    <div className='Profile-Screen'>
        <div className="middleDiv">
         <div className='profile-contents'>
            <div className="image-flex">
                <img className='profile-image' src="data:image/jpeg;base64,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" alt="Profile-image" />
            </div>
            <div className="user-details">
                <div><span>Welcome</span> to user management system demo Arun Gosh !!</div> <br />
                
            </div>
            
         </div>
        </div>
    
  </div> 
  )
}

export default Welcome