//send otp

const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/profile')
const otpGenerator = require('otp-generator');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//send otp controller
exports.sendOTP = async(req, res) =>{
    try{
        //reading email from request body
        const {email} = req.body;
        //check if user already exists
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(401).json({
                success: false,
                message: "User already registered"
            })
        }

        //generate otp
        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        //checking if generated otp is unique or not
        let result = await OTP.findOne({otp: otp});
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            result = await OTP.findOne({otp: otp});
        }

        //generated unique otp, so make entry in db
        const otpPayload = {
            email,otp
        }
        const otpEntry = await OTP.create(otpPayload);

        return res.status(201).json({
            success: true,
            message: 'OTP sent successfully',
            otp: otpEntry,
        })


    }catch(err){
        console.log("Error occured while Sending otp");
        return res.status(501).json({
            success: false,
            message: 'Unable to send OTP',
            error: err.message
        })
    }
}

//sign up controller
exports.signUp = async(req, res) => {
    try{
        //extracting data from req body
        const{first_name, last_name,
        email, password, confirmPassword, accountType, contactNumber,otp} = req.body;

        //validating data
        if(!first_name || !last_name || !email || !password || !confirmPassword){
            return res.status(502).json({
                success: false,
                message: "Fill all details"
            })
        }

        //match password
        if(password !== confirmPassword){
            return res.status(403).json({
                success: false,
                message: "Password not matched"
            })
        }

        //checking user already exists or not 
        const checkUser = await User.findOne({email: email});
        if(checkUser){
            return res.status(405).json({
                success: false,
                message: "User already registered"
            })
        }

        //finding most recent password
        const recentOTP = await OTP.find({ email}).sort({createdAt: -1}).limit(1);
        
        //validating otp
        if(recentOTP.length == 0){
            //OTP not found 
            return res.status(404).json({
                success: false,
                message: "OTP not found"
            });
        }else if(otp !== recentOTP[0].otp){
            return res.status(403).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        //hashing password

        const hashedPassword = await brcypt.hash(password, 10);
        const profile = await Profile.create({
            gender: null,
            contactNumber: null,
            dateOfBirth : null,
            about: null
        })
        const userEntry = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg/seeds=${first_name} ${last_name}`,

        })

        //returning resonse
        return res.status(200).json({
            success: true,
            message: "User signed up successfully",
            user: userEntry
        })
    }catch(err){
        console.log("Error occured while signing user");
        return res.status(502).json({
            success: false,
            message: "Unable to signed in",
            error: err.message,
        })
    }
}

//login handler
exports.login = async(req, res) => {
    try{

        //extracting data from request
        const {email, password} = req.body;

        //validating email and password;
        if(!email || !password){
            return res.status(404).json({
                success: false,
                message: "Please fill all fields while login"
            })
        }
        //checking if user exists or not
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(402).json({
                success: false,
                message: `Unable to find user registered with ${email}`
            })
        }

        //matching password
        if(await brcypt.compare(password, user.password)){
            //generate jwt token 
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,{
                expiresIn: '2h',
            });

            user.password = undefined;
            user.token = token;

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("jwtToken", token, options).json({
                success: true,
                token:token,
                user:user,
                message: "User logged in successfully"
            })

        }else{
            return res.status(402).json({
                success: false,
                message: "Incorrect password"
            })
        }

    }catch(err){
        console.log(err);
        return res.status(501).json({
            success: false,
            message: "Unable to logged in",
            error: err.message
        })
    }
}


//change password handler
exports.changePassword = async(req, res) => {
    try{
        //extracting data from requests
        const {password, newPassword, confirmNewPassword} = req.body;
        //validating newPassword and confirmNewPassword
        if(newPassword !== confirmNewPassword){
            return res.status(401).json({
                success: false,
                message: "New Password and confirm must be same"
            })
        }

        //

    }catch(err){

    }
}