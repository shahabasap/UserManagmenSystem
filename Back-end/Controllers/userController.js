import asyncHandler from 'express-async-handler'
import User from '../Models/userModel.js'
import genarateToken from '../utils/genarateToken.js';

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public

const authUser=asyncHandler(async(req,res)=>{
  
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(user && (await user.matchPassword(password)))
        {
           
            genarateToken(res,user._id)
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email
            })

        }
        else
        {
            res.status(401)
            throw new Error('Invalid email or password')
        }

    
    // res.status(200).json({message:'Auth user'})
})


// @desc Register a new User
// route POST /api/users/
// @access Public

const registerUser=asyncHandler(async(req,res)=>{


    const{name,email,password,mobilenum,imageUrl}=req.body

    const UserExists=await User.findOne({email})
    if (UserExists) {
        res.status(400)
        throw new Error('User already exist')
    }

   
    const user=await User.create({
        name,
        email,
        password,
        mobilenum,
        imageUrl
    })


    if(user)
        {
            genarateToken(res,user._id)
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                
            })
            
        }else{
            res.status(400);
            throw new Error('Invalied User Data')
        }

  
})

// @desc Logout user
// route get /api/users/logout
// @access Public

const logoutUser=asyncHandler(async(req,res)=>{

     res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
     })
    res.status(200).json({message:'user Loged out'})
})

// @desc Get user profile
// route GET /api/users/profile
// @access private

const getUserProfile=asyncHandler(async(req,res)=>{
    const {_id,name,email,mobilenum,imageUrl}=req.user
const user={
    _id,
    name,
    email,
    mobilenum,
    imageUrl
}

    res.status(200).json({user})
})

// @desc UPDATE user profile
// route PUT /api/users/profile
// @access private

const updateUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    if (user) {
        
        user.name=req.body.name || user.name
        user.email=req.body.email || user.email
        user.mobilenum=req.body.mobilenum || user.mobilenum
        user.imageUrl=req.body.imageUrl || user.imageUrl
        const updatedUser =await user.save();
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            mobilenum:updatedUser.mobilenum,
            imageUrl:updatedUser.imageUrl

        })
    } else {
        res.status(404);
        throw new  Error('User not found')
        
    }

    res.status(200).json({message:'Update User Profile'})
})


export{
    authUser,
    updateUserProfile,
    getUserProfile,
    logoutUser,
    registerUser
}