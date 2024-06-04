import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";


const ProtectAdmin = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.adminJwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(decoded.adminCred === process.env.password)
        {
            req.admin = {
                username:"admin@gmail.com"
              }
              next();

        }
      
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized , invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized , no token");
  }
});

export { ProtectAdmin };
