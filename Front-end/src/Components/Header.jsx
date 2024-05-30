import React,{useState,useEffect} from 'react';
import './Header.css'
import { Link } from 'react-router-dom';


function Header() {
   
    return ( 
        <div className='nav-black'>
        <div className='nav-content '>
        <h1  className='nav-logo'>User Management System </h1>
        <div className='nav-right'>
            <Link to='/profile'><button>Profile</button></Link>
        </div>
       
        </div>
        </div>
    
);
}

export default Header;