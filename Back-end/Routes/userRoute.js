import express from 'express'
const Router=express.Router()
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../Controllers/userController.js'
import { protect } from '../Middleware/authMiddleware.js'





Router.post('/',registerUser)
Router.post('/auth',authUser)
Router.post('/logout',logoutUser)
Router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


export default Router