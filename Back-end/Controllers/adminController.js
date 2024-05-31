import expressAsyncHandler from "express-async-handler"
import User from "../Models/userModel.js"
import asyncHandler from 'express-async-handler'




// Login page-----------------------




const authAdmin=(req,res)=>{
    try {
        
        const envUserName=process.env.email
        const envPassword=process.env.password
   
        const {email,password}=req.body
        if (email===envUserName && password===envPassword) {
            console.log("correct")
             res.status(200).json({
                email:envUserName
             })
        }
        else{
            res.status(401).json({
                message:"User Credetials are inccorrect"
             })

        }
        
        
    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            message:"Admin credentials are wrong"
        })
        
    }
}

// Fetch userData--------------------------------------------



const userData=async(req,res)=>{
    try {
        console.log("hello");
        const Users=await User.find()
        if (Users) {
            res.status(200).json({usersData:Users})
        }else
        {
            res.status(204).json({
                message:"There is no data found"
            })
        }
        
    } catch (error) {
        console.log(error.message)
        
    }
}

// Add User---------------------------------------------
const AddUser=asyncHandler(async(req,res)=>{

     console.log("add user")
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
// Delete user-----------------------------
const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params
       const user=await User.findById(id)

        const deletedUser=await User.deleteOne({_id:id})
        if (deletedUser) {
            res.status(200).json({
                name:user.name,
                Status:deletedUser
            })
        }
        else{
            res.status(404).json({
                message:"such user is not exist"
            })
        }
        
    } catch (error) {
        console.log(error.message)
        
    }
}

// Get each user data----------------------------------
const user=async(req,res)=>{
    try {
        console.log("hi")
        const {id}=req.params
        const user=await User.findById(id)
        console.log(user,"user")
        if (user) {
            console.log("condition")
            res.status(200).json({
                userid:user._id,
                name:user.name,
                email:user.email,
                mobilenum:user.mobilenum

            })

        }
        else
        {
            res.status(404).json({
                message:"user not found"
            })
        }
        
    } catch (error) {
        console.log(error.message)
        
    }
}

// Update user------------------------------------
const updateUser=async(req,res)=>{
    try {
        const{userid,name,email,mobilenum}=req.body
        const user=await User.findById(userid)
        if (user) {
        user.name=name || user.name
        user.email=email || user.email
        user.mobilenum=mobilenum || user.mobilenum
        const updatedUser =await user.save();
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            mobilenum:updatedUser.mobilenum,

        })
        
    } else {
        res.status(404).json({
            message:"User not found"
        })
        
        
    }

    res.status(200).json({message:'Update User Profile'})
        
    } catch (error) {
        console.log(error.message)
        
    }
}


// Logout--------------------------------

const logout=(req,res)=>{
    try {
        console.log("Hi login")
        
    } catch (error) {
        console.log(error.message)
        
    }
}

export{
    authAdmin,
    logout,
    userData,
    AddUser,
    deleteUser,
    user,
    updateUser
}