import express from 'express'
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../Controllers/userController.js'
import { protect } from '../Middleware/authMiddleware.js'
const Router=express.Router()




Router.post('/',registerUser)
Router.post('/auth',authUser)
Router.post('/logout',logoutUser)
Router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


export default Router