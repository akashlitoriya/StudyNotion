const Section = require('../models/section')
const Course = require('../models/course')

exports.createSection = async(req, res) => {
    try{
        //extract data from req.body
        const{sectionName, courseId} = req.body;
        //validating data
        if(!sectionName || !courseId){
            return res.status(404).json({
                success: false,
                message: "Please provide sectionName and courseId while creating new section"
            })
        }

        //creating section
        const newSection = await Section.create({section_Name: sectionName});
        //updateing section id in course
        const UpdatedCourse = await Course.findOneAndUpdate(
            {_id: courseId},
            {
                $push:{
                    courseContent: newSection._id
                }
            },
            {new: true}
            
        ).populate('courseContent')
        .exec();
        //returning response
        return res.status(200).json({
            success: true,
            message: `Section: ${sectionName} successfully created in Course: ${courseId}`,
            course: UpdatedCourse
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to create new section",
            error: err.message
        })
    }
}

exports.updateSection = async(req, res) => {
    try{
        //fetching data
        const {sectionName, sectionId} = req.body;
        //validating data
        if(!sectionName || !sectionId){
            return res.status(401).json({
                success: false,
                message: "Please provide section-name and section-id while updating section"
            })
        }
        //updating section
        const updatedSectionDetails = await Section.findByIdAndUpdate(sectionId, {section_Name: sectionName}, {new: true}).populate('courseContent').exec();
        //returning response
        return res.status(200).json({
            success: true,
            message: `Section: ${sectionId} name updated to ${sectionName} Successfully`
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: "Failed to update the section",
            error: err.message,
        })
    }
}

exports.deleteSection = async(req, res) => {
    try{
        //fetching id of section to be deleted
        const {sectionID} = req.params;
        //validating id
        if(!sectionID){
            return res.status(401).json({
                success: false,
                message: "Please provide section id while deleting section"
            })
        }
        //TODO : Do we need to delete section._id from course object

        const deletedSection = await Section.findByIdAndDelete(sectionID);
        return res.status(201).json({
            success: true,
            message: `Section: ${sectionID} deleted successfully`
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: "Unable to delete section",
            error: err.message
        })
    }
}