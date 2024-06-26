import jwt from 'jsonwebtoken'

const genarateTokenAdmin=(res,adminCred)=>{
    const token=jwt.sign({adminCred},process.env.JWT_SECRET,{expiresIn:'30d'});
    res.cookie('adminJwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV != 'development',
        sameSite:'strict',
        maxAge:30*24*60*60*1000
    })
}


export default genarateTokenAdmin