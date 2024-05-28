import express from 'express'
import dotenv from 'dotenv'
import UserRoutes from './Routes/userRoute.js'
import { errorHandler, notFound } from './Middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const port=process.env.PORT || 5000

connectDB()
const app=express()
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser)
app.use('/api/users',UserRoutes)
app.get('/',(req,res)=>res.send('Server is ready'))

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>console.log(`Server is runnin on port ${port}`))