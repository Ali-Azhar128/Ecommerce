import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";



const protect = asyncHandler(async(req, res, next) => {
    let token;

    token = req.cookies.jwt

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET) //This returns an object of payload
            req.user = await User.findById(decoded.userId).select('-password')
            next()
            
        }catch(e){
            console.log(e)
            res.status(401)
            throw new Error('Not Authorized, token failed')
        }

    }else{
        res.status(401)
        throw new Error('Not Authorized, no token')
    }


})

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as admin')
    }
}

export { protect, admin }

