import React,{useState,useEffect} from 'react';
import './Header.css'


function Header() {
   
    return ( 
        <div className='nav-black'>
        <div className='nav-content '>
        <h1  className='nav-logo'>User Management System </h1>
        <div className='nav-right'>
            <button>Profile</button>
        </div>
       
        </div>
        </div>
    
);
}

export default Header;