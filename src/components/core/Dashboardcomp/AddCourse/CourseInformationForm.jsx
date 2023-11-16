import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import Requirement from './Requirement';
import Tags from './Tags';
import ImageUploadPreview from './ImageUploadPreview';
import { updateCourseDetails } from '../../../../services/operations/courseAPI';
import { createCourse } from '../../../../services/operations/courseAPI';
import { setCourse, setStep } from '../../../../slices/courseSlice';
import {toast} from 'react-hot-toast'
import { getAllCategories } from '../../../../services/operations/categoryAPI';
const CourseInformationForm = () => {
    const{register, handleSubmit, setValue, getValues, reset, formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const{course, editCourse} = useSelector((state) => state.course)
    const [loading, setLoading] = useState();
    const [courseCategories, setCourseCategories] = useState([]);
    const {token} = useSelector((state) => state.auth);

    
    useEffect(() => {
        const getCategories = async() => {
            const response = await getAllCategories();
            if(response){
                setCourseCategories(response);
            }
        }

        if(editCourse){
            setValue("courseTitle", course.courseName)
            setValue("courseDescription", course.courseDescription)
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tags)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue('courseImage', course.thumbnail)
        }

        getCategories();
    }, [])

    
    const isFormUpdate = () => {
        const currentValue = getValues();
        if(currentValue.courseTitle != course.courseName || currentValue.courseDescription !== course.courseDescription
            || currentValue.coursePrice !== course.coursePrice || currentValue.courseBenefits !== course.whatYouWillLearn
            || currentValue.courseCategory._id !== course.category._id
            )
            return true;
        else 
            return false;
    }
    const onSubmit = async(data) => {
        
        if(editCourse){
            if(isFormUpdate()){
                const currentValues = getValues();
                const formData = new FormData();
                formData.append("courseId", course._id);
                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", currentValues.courseTitle);
                }
                if(currentValues.courseDescription !== course.courseDescription){
                    formData.append("courseDescription", currentValues.courseDescription);
                }
                if(currentValues.coursePrice !== course.coursePrice){
                    formData.append("price", currentValues.coursePrice);
                }
                if(currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", currentValues.courseBenefits);
                }
                if(currentValues.courseCategory._id !== course.category._id){
                    formData.append("category", currentValues.courseCategory._id);
                }
                if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions", currentValues.courseRequirements);
                }
                if(currentValues.courseImage[0]){
                    formData.append("thumbnail", currentValues.courseImage[0]);
                }
                if(currentValues.courseTags.toString() !== course.tags.toString()){
                    formData.append("tags", currentValues.courseTags);
                }
                setLoading(true);
                const toastLoading = toast.loading("Updating Course Details");
                const response = await updateCourseDetails(formData, token);
                toast.dismiss(toastLoading);
                setLoading(false);
                if(response){
                    dispatch(setCourse(response.data));
                    toast.success("Course Details Updated Successfully");
                    dispatch(setStep(2));
                }
            }else{
                toast.error("No changes made to the course details");
            }
            return;
        }
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseDescription);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("thumbnail", data.courseImage);
        formData.append("tag", data.courseTags);
        setLoading(true);
        const toastLoading = toast.loading("Adding Course Details");
        const response = await createCourse(formData, token);
        

        
        dispatch(setCourse(response));
        dispatch(setStep(2));
        toast.dismiss(toastLoading);
        setLoading(false);
        
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
        {/* Course Title  */}
        <div className='flex flex-col gap-1'>
            <label htmlFor='courseTitle' className='text-sm text-richblack-5'>Course Title<sup className='text-pink-400 text-lg'>*</sup></label>
            <input 
                id='courseTitle'
                className='p-3 bg-richblack-700 text-richblack-400 rounded-lg border-b-2 border-richblack-600'
                {...register("courseTitle", {required:true})}
                placeholder='Enter Course Title'
            />
            {
                errors.courseTitle && (
                    <div>Course Title is required</div>
                )
            }

        </div>
            {/* Course Description  */}
        <div className='flex flex-col gap-1'>
            <label htmlFor='courseDescription' className='text-sm text-richblack-5'>Course Description<sup className='text-pink-400 text-lg'>*</sup></label>
            <textarea
                id='courseDescription'
                rows={3} 
                className='p-3 bg-richblack-700 text-richblack-400 rounded-lg border-b-2 border-richblack-600'
                {...register("courseDescription", {required:true})}
                placeholder='Enter Course Description'
            />
            {
                errors.courseDescription && (
                    <div>Course Description is required</div>
                )
            }

        </div>
            {/* Course Price  */}
        <div className='flex flex-col gap-1'>
            <label htmlFor='coursePrice' className='text-sm text-richblack-5'>Course Price<sup className='text-pink-400 text-lg'>*</sup></label>
            <input
                 id='coursePrice'
                className='p-3 bg-richblack-700 text-richblack-400 rounded-lg border-b-2 border-richblack-600'
                {...register("coursePrice", {required:true})}
                placeholder='Enter Course Price'
            />
            {
                errors.coursePrice && (
                    <div>Course Price is required</div>
                )
            }

        </div>
                {/* Course Category  */}
        <div className='flex flex-col gap-1'>
            <label htmlFor='courseCategory' className='text-sm text-richblack-5'>Course Category<sup className='text-pink-400 text-lg'>*</sup></label>
            <select id='courseCategory' {...register("courseCategory",{required:true})} defaultValue={""} className='p-3 bg-richblack-700 rounded-lg border-b-2 border-richblack-600'>
                <option value={""} disabled className='bg-richblack-700 text-richblack-200 rounded-lg'>Choose a category</option>
                {
                    courseCategories.map((item)=>(
                        <option key={item?._id} value={item?._id} className='bg-richblack-700 text-richblack-200 rounded-lg'>{item?.name}</option>
                    ))
                }
            </select>
            {
                errors.courseCategory && (
                    <div>Course Category is required</div>
                )
            }

        </div>

            {/* Course Benefits  */}
        <div className='flex flex-col gap-1'>
            <label htmlFor='courseBenefits' className='text-sm text-richblack-5'>Benefits of the coure<sup className='text-pink-400 text-lg'>*</sup></label>
            <textarea
                rows={3}
                 id='courseBenefits'
                className='p-3 bg-richblack-700 text-richblack-400 rounded-lg border-b-2 border-richblack-600'
                {...register("courseBenefits", {required:true})}
                placeholder='Enter Course Benefits'
            />
            {
                errors.courseBenefits && (
                    <div>Course Benefits is required</div>
                )
            }

        </div>

        {/* Course Requirements  */}
        <Requirement 
            name="courseRequirements"
            label="Requirement/Instructions"
            register = {register}
            getValue = {getValues}
            setValue = {setValue}
            errors = {errors}
        />

        {/* Course Thumbnail  */}
        <ImageUploadPreview
            name="courseImage"
            label="Course Thumbnail"
            register = {register}
            getValue = {getValues}
            setValue = {setValue}
            errors = {errors}
        />

        {/* Course Tags  */}
        <Tags 
            name={"courseTags"}
            type={"text"}
            label={"Tags"}
            register={register}
            getValue={getValues}
            setValue={setValue}
            errors={errors}
        />


        {/* Course Buttons  */}
        <div className='flex gap-3 justify-end'>
            <button className='px-5 py-3 rounded-lg border-[1px] border-richblack-600 bg-richblack-700'>Continue Without Saving</button>
            <button className='px-5 py-3 rounded-lg bg-yellow-25 text-richblack-900 font-inter font-semibold' type='submit'>{editCourse?"Save Changes" : `Next >`}</button>
        </div>
    </form>
  )
}

export default CourseInformationForm
