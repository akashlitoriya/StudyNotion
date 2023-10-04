const User = require("../models/User");
const mailSender = require('../utils/mailSender');
const crypto = require('crypto')
const bcrypt = require('bcrypt')

exports.resetPasswordToken = async(req, res) =>{
    try{
        //get email form request body
        const email = req.body.email;
        //check if user exists with email
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: `No user is registered using ${email}`,
            })
        }

        //generating token
        const token = crypto.randomUUID();
        //updating user with token and tokenExpires
        const updateUser = await User.findOneAndUpdate({email: email},{token: token, resetPasswordExpires: Date.now()+5*60*1000}, {new:true});
        //creating url for resetPassword
        const url = `http://localhost:3000/update-password/${token}`
        //sending mail with url to reset password
        const mail = await mailSender(
            email,
            "Password Reset Link",
            `Password reset link : ${url}`
        )
        //response
        return res.status(200).json({
            success: true,
            message: "Password reset mail sent successfully"
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to sent password reset mail",
            error: err.message,
        })
    }
}

// reset password handler
exports.resetPassword = async(req, res) => {
    try{
        //get data from reqbody -- frontend will sent token in request body
        const {password, confirmPassword, token} = req.body;
        //matching password
        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Entered passwords are not matching. Please enter password correctly"
            })
        }
        //validating token
        const user = await User.findOne({token: token});
        if(!user){
            return res.status(402).json({
                success: false,
                message: "Invalid token. Please try again"
            })
        }

        //checking expiry of token
        if(Date.now() > user.resetPasswordExpires){
            return res.status(403).json({
                success: false,
                message: "Token expired. Please try again"
            })
        }
        //hash the password
        const hashed = await bcrypt.hash(password, 10);
        // update password in db
        const updatedUser = await User.findOneAndUpdate(
            {token: token},
            {password: hashed},
            {new: true}
        );
        //return response
        return res.status(200).json({
            success: true,
            message: "Password has been updated successfully"
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: "Failed to reset password",
            error: err.message,
        })
    }
}