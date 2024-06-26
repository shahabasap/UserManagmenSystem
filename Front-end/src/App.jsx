import { useState } from 'react';
import './App.css';
import Login from './Components/Screen/Login/LoginPage';
import Register from './Components/Screen/Register/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Screen/Home/Home';
import Welcome from './Components/Screen/Home/Welcome';
import ProfileScreen from './Components/Screen/Profile/ProfileScreen';
import ProfileEdit from './Components/Screen/ProfileEdit/ProfileEdit';
import AdminLoginHome from './Components/AdminScreen/login/adminLoginHome';
import AdminHome from './Components/AdminScreen/AdminHome/AdminHomeScreen';
import ProfileEditAdmin from './Components/AdminScreen/ProfileEdit/ProfileEdit';
import AddUser from './Components/AdminScreen/AddUser/addUser';
import { useSelector } from 'react-redux';
import { selectUser } from './features/user/userSlice';
import { selectAdmin } from './features/admin/adminSlice';


function App() {
  const user = useSelector(selectUser);
  const admin=useSelector(selectAdmin)

  console.log("user",user);
  console.log("adming",admin);


  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          <Route exact path="/register" element={user ? <Home /> : <Register />} />
          <Route exact path="/home" element={user ? <Home /> : <Login />} />
          <Route exact path="/profile" element={user ? <ProfileScreen /> : <Login />} />
          <Route exact path="/profileEdit" element={user ? <ProfileEdit /> : <Login />} />

          <Route exact path="/admin" element={admin?<AdminHome />:<AdminLoginHome />} />
          <Route exact path="/admin/home" element={admin?<AdminHome />:<AdminLoginHome />} />
          <Route exact path="/admin/profile/:id" element={admin?<ProfileEditAdmin />:<AdminLoginHome />} />
          <Route exact path="/admin/addUser" element={admin?<AddUser />:<AdminLoginHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
