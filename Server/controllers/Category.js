const Category = require('../models/category');

exports.createCategory = async(req, res) => {
    try{
        //extracting data from body
        const {name, desc}  = req.body;
        //validating 
        if(!name || !desc) {
            return res.status(404).json({
                success: false,
                message: "Fill all details while creating a new Category"
            })
        }

        //checking if tag already exists or not
        const category = await Category.findOne({name: name});
        if(category){
            return res.status(501).json({
                success: false,
                message: `Category already exists for ${python}`
            })
        }
        const newCategory = await Category.create({name:name, description: desc});
        return res.status(200).json({
            success: true,
            message: "Category successfully created",
            category: newCategory
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to create Category",
            error: err.message
        })
    }
}

exports.getAllCategory = async(req, res) => {
    try{
        //getting all tags;
        const getAllCategory = await Category.find({},{name: true, description: true});
        return res.status(200).json({
            success: true,
            Categories: getAllCategory,
            message: "Successfully get all the Category"
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to fetch all the Category",
            error : err.message
        })
    }
}

exports.categoryPageDetails = async(req, res) => {
    try{
        const{categoryID} = req.body;
        const selectedCourse = await Tag.findById(categoryID)
                                    .populate("course")
                                    .exec();
        
        //validation
        if(!selectedCourse){
            return res.status(401).json({
                success: false,
                message: "No courses available for Category"
            })
        }

        const otherCourses = await Category.find({
            _id: {$ne: categoryID}
        })
        .populate("course")
        .exec();

        //write code for getting top selling course

        return res.status(201).json({
            success: true,
            message: 'Successfully fetched all courses for category',
            data: {
                selectedCourse,
                otherCourses
            }
        })
    }
    catch(err){
        return res.status(501).json({
            success: false,
            message: 'Unable to fetched course related to category'
        })
    }
}