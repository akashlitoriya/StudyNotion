const RatingAndReviews = require('../models/ratingAndReview')
const Course = require('../models/course');

exports.createRating = async(req,res) => {
    try{
        //getting data from body
        const{rating, reviews,courseID} = req.body;
        const{userID} = req.user.id;

        if(!userID || !courseID || !rating){
            return res.status(401).json({
                success: false,
                message: "Please provide all valid fields while writing a new review or rating"
            })
        }
        //check whether user enrolled in course or not
        const courseDetails = await Course.findById(courseID);
        //await Course.findOne({_id: courseID, studentEnrolled:{$eleMatch: {$eq: userID}}})
        if(!courseDetails.studentEnrolled.includes(userID)){
            return res.status(401).json({
                success: false,
                message: "Please first enroll in course then, give rating"
            })
        }

        //if user has already provided some rating
        const alreadyReviewed = await RatingAndReviews.findOne({user: userID, course: courseID});
        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: `User-${userID} already reviewed the course-${courseID}`
            })
        }
        //create new raing 
        const newReview = await RatingAndReviews.create(
            {
                user: userID,
                rating: rating,
                review: reviews,
                course: courseID
            }
        )
        if(!newReview){
            return res.status(402).json({
                success: false,
                message: "Cannot create new review, please try again later"
            })
        }
        //add the rating in course
        const updateCourse = await Course.findByIdAndUpdate(
            courseID,
            {
                $push:{
                    ratingAndReviews: newReview._id
                }
            }
        )
        return res.status(201).json({
            success: true,
            message: 'Successfully reviewed the course'
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: "Failed to create new review"
        })
    }
}

exports.getAverageRating = async(req, res) => {
    try{
        //get courseID form boyd
        const courseID = req.body.courseID;
        //getting average rating
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseID)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: {$avg: "$rating"}
                }
            }
        ]);
        if(result.length > 0){
            return res.status(201).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }
        return res.status(201).json({
            success: true,
            averageRating: 0,
            message: "No rating available for this course"
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: "Error occured while getting average rating for course",
            error: err.message,
        })
    }
}

exports.getAllRating = async(req, res) => {
    try{
        //fetch data
        const allRating = await RatingAndReviews.find({})
                            .sort({rating: "desc"})
                            .populate({
                                path:"user",
                                select: "first_name last_name email image"
                            })
                            .populate({
                                path:'course',
                                select: "name"
                            })
                            .exec();
        return res.status(201).json({
            success: true,
            message: "Successfully fetched all reviews",
            data: allRating
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: "Failed to fetch all Reviews",
            error: err.message
        })
    }
}