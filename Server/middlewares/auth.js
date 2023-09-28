const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

//auth
exports.auth = async(req, res, next) => {
    try{
        //extracting token from request;
        const token = req.cookies.jwtToken || req.body.token || req.header("Authorization").replace("Bearer ", "");

        //if token missing
        if(!token){
            return res.status(404).json({
                success: false,
                message: "JWT token is missing"
            })
        }

        //validating token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decode;
        }catch(err){
            return res.status(402).json({
                success: false,
                message: "Error occured while verifying jwt token"
            })
        }
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error occured while authenticating user",
            error : err.message,
        })
    }
}

//isStudent middleware
exports.isStudent = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students only"
            })
        }
        next();
    }catch(err){
        return res.status(401).json({
            success: false,
            message: "User's role cannot be verified"
        })
    }
}

//isInstructor middleware

exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructors only"
            })
        }
        next();
    }catch(err){
        return res.status(401).json({
            success: false,
            message: "User's role cannot be verified"
        })
    }
}

//isAdmin middleware
exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only"
            })
        }
        next();
    }catch(err){
        return res.status(401).json({
            success: false,
            message: "User's role cannot be verified"
        })
    }
}