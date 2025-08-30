import jwt from "jsonwebtoken"
import "dotenv/config"


export  async function authenticate(req,res,next){
    const headers = req.headers.authorization 
    const token = headers?.split(" ")[1]
    if(!token){
        res.status(401).json({message:"No token provided"})
    }
    try{
      const secret_code = process.env.MY_SECRET
      const isVerify = jwt.verify(token,secret_code)
      req.user = isVerify
      console.log("User is Verified", isVerify)
      next()
    }
    catch(e){
        res.status(401).json({message:"Invalid Token"})
    }
}