// import { NextFunction , Request, Response } from "express"
import jwt from "jsonwebtoken"

const verifyToken = (req, res, next)=>{
    const token =req.cookies["auth_token"]
    if(!token){
        return res.status(401).json({message : "unauthorized"})
    }
    try{
        const decoded = jwt.verify(token , "GXoIQwI81xDQSoYonjGHBXeBjcmK1pZo")
        req.userId = (decoded ).userId
        next()

    }
    catch(error)
    {
        return res.status(401).json({message : "unauthorized"})
       

    }
}

export default verifyToken