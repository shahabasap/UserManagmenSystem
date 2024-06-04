import express from 'express'
import { authAdmin, logout,userData,AddUser,deleteUser,user,updateUser } from '../Controllers/adminController.js'
import { ProtectAdmin } from '../Middleware/authAdminMiddleware.js'
const Router=express.Router()

Router.post('/',authAdmin)
Router.get('/userData',ProtectAdmin,userData)
Router.post('/AddUser',ProtectAdmin,AddUser)
Router.get('/deleteUser/:id',ProtectAdmin,deleteUser)
Router.get('/user/:id',ProtectAdmin,user)
Router.put('/updateUser',ProtectAdmin,updateUser)
Router.get('/logout',logout)


export default Router