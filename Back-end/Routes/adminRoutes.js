import express from 'express'
import { authAdmin, logout,userData,AddUser,deleteUser,user,updateUser } from '../Controllers/adminController.js'
const Router=express.Router()

Router.post('/',authAdmin)
Router.get('/userData',userData)
Router.post('/AddUser',AddUser)
Router.get('/deleteUser/:id',deleteUser)
Router.get('/user/:id',user)
Router.put('/updateUser',updateUser)
Router.post('/logout',logout)


export default Router