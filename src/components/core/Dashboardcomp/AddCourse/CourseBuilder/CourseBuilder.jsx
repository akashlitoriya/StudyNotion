import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import IconButton from '../../../../common/IconButton'
import {BiPlusCircle} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import{BiSolidRightArrow} from 'react-icons/bi'
import {setStep, setEditCourse, setCourse} from '../../../../../slices/courseSlice';
import {toast} from 'react-hot-toast'
import { createSection } from '../../../../../services/operations/courseAPI';
import { updateSection } from '../../../../../services/operations/courseAPI';
import NestedSection from './NestedSection';
const CourseBuilder = () => {
  const{register, handleSubmit, setValue, formState: {errors}} = useForm();
  const[editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);

console.log(course);  

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue('sectionName','');
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }
  const goToNext = () => {
    if(course.courseContent === 0){
      toast.error('Please add atleast one section');
      return;
    }
    if(course.courseContent.some((section) => section.subSections.length === 0)){
      toast.error('Please add atleast one video in section');
      return;
    }

    dispatch(setStep(3));
  }

  const onSubmit =async(data) => {
    //const toastLoading = toast.loading('Please wait...');
    let result;
    if(editSectionName){
      //edit_section
      const formData = new FormData();
      formData.append('sectionName', data.sectionName);
      formData.append('courseId', course?._id);
      formData.append('sectionId', course?.courseContent[0]?._id);

      result = await updateSection(formData, token);

      return;
    }

    //create_section
  const formData = new FormData();
  formData.append('sectionName', data.sectionName);
  formData.append('courseId', course?._id);

  result = await createSection(formData, token);

  if(result){
    setValue('sectionName', '');
    setEditSectionName(null);
    dispatch(setCourse(result));
  }

  //toast.dismiss(toastLoading);
  return;
  }

  const handleChangeEditSection = (sectionId, sectionName) => {
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue('sectionName', sectionName);
  }

  console.log("course bulder", course);
  return (
    <div className='flex flex-col gap-4'>
      <div className='text-xl font-inter font-semibold text-richblack-5'>Course Builder</div>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-1'>
          <label htmlFor='sectionName' className='text-sm font-inter text-richblack-100'>Section Name<sup className='text-lg text-pink-300'>*</sup></label>
          <input 
            id='sectionName' 
            type='text' 
            className='p-3 bg-richblack-700 border-b-2 border-richblack-600 rounded-lg text-richblack-200' 
            placeholder='Enter Section Name'
            {...register('sectionName', {required: true})}
          />
          {
            errors.sectionName && <span className='text-sm font-inter text-red-500'>This field is required</span>
          }
        </div>
        <div className='flex flex-row gap-3'>
          <IconButton 
            text={editSectionName ? "Edit Section" : "Create Section"}
            color="yellow-50"
            buttonColor='bg-richbk-800'
            textColor='text-yellow-100'
            outline={true}
          >
            <BiPlusCircle />
          </IconButton>

          {
            editSectionName && (
              <button className='border-none text-richblack-400 font-inter font-bold text-sm underline text-end' onClick={cancelEdit}>Cancel Edit</button>
            )
          }
        </div>

      </form>

      {/* Nested Section Component  */}
      {
        course?.courseContent.length >= 0 && (
          <NestedSection handleChangeEditSection={handleChangeEditSection}/>
          
        )
      }

      {/* Buttons  */}
      <div className='flex flex-row gap-3'>
        <button className='px-5 py-3 text-richblack-50 bg-richblack-700 border-[1px] border-richblack-600 font-semibold rounded-lg' onClick={goBack}>
          Back
        </button>
        <IconButton text={"Next"} onclick={goToNext}>
          <BiSolidRightArrow />
        </IconButton>
      </div>
    </div>
  )
}

export default CourseBuilder
