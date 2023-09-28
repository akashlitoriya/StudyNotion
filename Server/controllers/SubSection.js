const SubSection = require('../models/subSection')
const Section = require('../models/section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

exports.createSubSection = async(req, res) => {
    try{
        //extracting data 
        const{sectionID, title, description, timeDuration} = req.body;
        const video = req.files.video;
        //validating data
        if(!sectionID || !title || !description || !timeDuration) {
            return res.status(401).json({
                success: true,
                message: "Please provide all required details while creating new sub-section"
            })
        }
        //uploading video to cloudinary
        const uploadResponse = await uploadImageToCloudinary(video, process.env.CLOUDINARY_FOLDER);
        //creating subsection
        const subSectionDetails = await SubSection.create({
            title: title,
            description: description,
            videoURL: uploadResponse.secure_url
        })
        //add subsection id in sections
        const updateSectionDetails = await Section.findByIdAndUpdate(sectionID,
            {$push:{
                subSection: subSectionDetails._id
            }},
            {new: true}
        )
        return res.status(201).json({
            success: true,
            message: `Subsection created successfully`
        })

    }catch(err){
        return res.status(501).json({
            success:false,
            message: "Failed to create new subsection"
        })
    }
}

exports.updateSubSection = async(req, res) => {
    try{
        //fetching data 
        const{subsectionID, subSectionName, subSectionDescription} = req.body;
        //validating information
        if(!subsectionID ||  !subSectionName || !subSectionDescription){
            return res.status(401).json({
                success: false,
                message: "Please provide all details while updating subsection"
            })
        }
        //updating subsection
        const updatedSubSection = await SubSection.findByIdAndUpdate(subsectionID,
            {
                title: subSectionName,
                description: subSectionDescription
            },
            {new: true}
        )

        //return response
        return res.status(201).json({
            success: true,
            message: "Subsection updated successfully"
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: "Failed to update the subsection",
            error: err.message
        })
    }
}


exports.deleteSubSection = async(req, res) => {
    try{
        const{subSectionID} = req.params;

        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionID);
        return res.status(201).json({
            success: true,
            message: "SubSection deleted SuccessFully"
        })
    }catch(err){
        return res.status(501).json({
            success: false,
            message: "Failed to delete subsection"
        })
    }
}