const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require('../mail/template/EmailVerificationTemplate');

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
        expire: 5*60,
    },
    otp:{
        type: String,
        required: true,
    }
})

async function sendVerificationMail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification mail from StudyNotion", emailTemplate(otp));
        console.log("Email sent Successfully : ", mailResponse);
    }catch(err){
        console.log(`Error occured while sending verification mail...`);
        throw(err);
    }
}

otpSchema.pre("save", async function(next){
    await sendVerificationMail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", otpSchema)