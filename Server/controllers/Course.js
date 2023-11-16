const Course = require('../models/course')
const Category = require('../models/category')
const User = require('../models/User')

const {uploadImageToCloudinary} = require('../utils/imageUploader')
require('dotenv').config();

exports.createCourse = async(req, res) =>{
    try{
        //extracting data from req body
        const {courseName, courseDescription, whatYouWillLearn, price, tag, category} = req.body;
        //extractionf file
        const thumbnail = req.files.thumbnail;
        //validating data and file
        if(!courseName|| !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category){
            return res.status(401).json({
                success: false,
                message: "Please will all details while creating new course"
            })
        }
        //tag validation
        const categoryEntry = await Category.findOne({_id: category});
        if(!categoryEntry){
            return res.status(402).json({
                success: false,
                message: "Invalid Category, please enter valid Category"
            })
        }
        //getting instructor data
        const userId = req.user.id;
        const instructor = await User.findOne({_id:userId});
        if(!instructor){
            return res.status(404).json({
                success:false,
                message: "Instructor not found, please provide valid instructor id while creating new course"
            })
        }
        //image upload on cloudinary
        const imageUploadResponse = await uploadImageToCloudinary(thumbnail, process.env.CLOUDINARY_FOLDER);
        //creating entry in db
        const courseDetails = await Course.create({
            name: courseName,
            description: courseDescription,
            price: price,
            instructor: instructor._id,
            whatYouWillLearn: whatYouWillLearn,
            thumbnail: imageUploadResponse.secure_url,
            category: categoryEntry._id,
            tag: tag,
        })

        const updateInstructor = await User.findOneAndUpdate(
            {_id: instructor._id},
            {
                $push:{
                    courses: courseDetails._id,
                }
            },
            {new: true}
        );

        await Category.findByIdAndUpdate(
            {_id: categoryEntry._id},
            {
                $push:{
                    course: courseDetails._id
                }
            },
            {new: true}
        )

        return res.status(200).json({
            success: true,
            message: "New Course Added Successfully",
            course: courseDetails
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: "Unable to add new course",
            error: err.message
        })
    }
}


//controller for getting all courses
exports.getAllCourses = async(req, res) => {
    try{
        const allCourses = await Course.find({},{
            name:true,
            description: true,
            price: true,
            instructor: true,
            tag: true,
            studentEnrolled: true,
            category: true,
        }).populate(instructor).exec();

        return res.status(200).json({
            success: true,
            message: "Successfully fetched all course data",
            courses: allCourses
        })
    }catch(err){
        res.status(501).json({
            success: false,
            message: "Unable to get all courses details",
            error: err.message
        })
    }
}


exports.getCourseDetails = async(req, res) => {
    try{
        //extract course id from body
        const{courseId} = req.body;
        if(!courseId){
            return res.status(401).json({
                success:false,
                message: "Please provide course id while accessing course"
            })
        }

        const courseDetails = await Course.find({_id:courseId})
                                .populate(
                                    {
                                        path: "instructor",
                                        populate:{
                                            path: "additionalDetails"
                                        }
                                    }
                                )
                                .populate({
                                    path: "courseContent",
                                    populate: {
                                        path: "subSection"
                                    }
                                })
                                .populate("ratingAndReviews")
                                .populate("category")
                                .exec();
        
        if(!courseDetails){
            return res.status(402).json({
                success: false,
                message:`No course available for course id : ${courseId}`
            })
        }

        return res.status(201).json({
            success: true,
            message: "Successfully fetched course details",
            courseDetails: courseDetails
        })
                                
    }catch(err){
        return res.status(501).json({
            success: false,
            message: "Failed to fetch course details",
            error: err.message
        })
    }
}

exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}

exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
}
  // Delete the Course
exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnroled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
}