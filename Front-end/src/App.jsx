import { useState } from 'react'
import './App.css'
import Login from './Components/Screen/Login/LoginPage'
import Register from './Components/Screen/Register/RegisterPage'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from './Components/Screen/Home/Home';






function App() {


  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Login />}/>
          <Route exact path='/register' element={<Register />}/>
          <Route exact path='/home' element={< Home />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
