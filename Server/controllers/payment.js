const razorpay = require('../config/razorpay');
const User = require('../models/User')
const Course = require('../models/course')
const mailSender = require('../utils/mailSender')
//const {courseEnrollmentEmail} = require('');
const { default: mongoose } = require('mongoose');

exports.capturePayment = async(req, res) => {
    try{
        //getting course id from body
        const{courseID} = req.body;
        //user id from req
        const userID = req.user.id;
        //validating data
        if(!courseID || !userID){
            return res.status(401).json({
                success:false,
                message: "Please provide courseID and UserID while buying new course"
            })
        }
        //course details
        let course;
        try{
            course = await Course.findById(courseID);
            if(!course){
                return res.status(401).json({
                    success: false,
                    message:`Couldn't find course having id: ${courseID}`
                })
            }
            //checking whether user is already enrolled in course or not
            const uID = new mongoose.Types.ObjectId(userID); //in course we have user id in object type, but in req we have user id as string
            if(course.studentEnrolled.includes(uID)){
                return res.status(402).json({
                    success: false,
                    message: `User - ${uID} already enrolled in course - ${courseID}`
                })
            }

        }catch(err){
            return res.status(403).json({
                success: false,
                message:"Error occured while fetching data of course for paymentCapture",
                error: err.message
            })
        }
        const amount = course.price;
        const currency = "INR";
        const options = {
            amount : amount * 100,
            currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseID: courseID,
                userID
            }
        };

        try{
            //initializing the razorpay payment,
            const paymentResponse = razorpay.orders.create(options);
            console.log("Payment Response: ", paymentResponse);
            return res.status(200).json({
                success: true,
                Course_Name: course.name,
                Course_Description: course.description,
                thumbnail: course.thumbnail,
                orderID: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            })
        }catch(err){
            return res.status(301).json({
                success: false,
                message: "Error occured while capturing payment",
                error: err.message
            })
        }
    }catch(err){
        return res.status(401).json({
            success: false,
            message: "Unable to capture payment",
            error: err.message,
        })
    }
}


exports.verifySignature = async(req, res) => {
    const webhookSecret = "123456";
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if(signature === digest){
        console.log('Signature matched - Payment is authorized')
        const{courseID, userID} = req.body.payload.payment.entity.notes;
        //fullfiling action
        try{
            const enrolledCourse = await Course.findByIdAndUpdate(courseID, 
                {
                    $push:{
                        studentEnrolled:userID
                    }
                },
                {new: true}
            )
            if(!enrolledCourse){
                return res.status(405).json({
                    success: false,
                    message: "Unable to find course while verifing signature"
                })
            }
            console.log(enrolledCourse)
            const enrollStudent = await User.findByIdAndUpdate(userID,
                {
                    $push:{
                        courses:courseID
                    }
                },
                {new: true}
            )
            console.log(enrollStudent)
            const mailResponse = await mailSender(
                enrollStudent.email,
                "Congratulations - You have enrolled successfully",
                "Congratulations - You have enrolled successfully",
            )
            return res.status(200).json({
                success: false,
                message:"Successfully verified the payment signature"
            })
        }catch(err){
            return res.status(403).json({
                success: false,
                message: "Unable to complete actions after payment"
            })
        }
        
    }else{
        console.log("Signature don't matched");
    }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }