import { useState } from 'react'
import './App.css'
import Login from './Components/Screen/Login/LoginPage'
import Register from './Components/Screen/Register/RegisterPage'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from './Components/Screen/Home/Home';
import Welcome from './Components/Screen/Home/Welcome';
import ProfileScreen from './Components/Screen/Profile/ProfileScreen';
import ProfileEdit from './Components/Screen/ProfileEdit/ProfileEdit';
import AdminLoginHome from './Components/AdminScreen/login/adminLoginHome';
import AdminHome from './Components/AdminScreen/AdminHome/AdminHomeScreen';
import ProfileEditAdmin from './Components/AdminScreen/ProfileEdit/ProfileEdit';







function App() {


  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Login />}/>
          <Route exact path='/register' element={<Register />}/>
          <Route exact path='/home' element={< Home />}/>
          <Route exact path='/profile' element={< ProfileScreen />}/>
          <Route exact path='/profileEdit' element={< ProfileEdit />}/>


          <Route exact path='/admin' element={< AdminLoginHome />}/>
          <Route exact path='/admin/home' element={<AdminHome />}/>
          <Route exact path='/admin/profile/:id' element={<ProfileEditAdmin />}/>
        


        </Routes>
      </div>
    </Router>
  )
}

export default App
