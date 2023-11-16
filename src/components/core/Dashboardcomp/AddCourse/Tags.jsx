import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import {BsArrowRight} from 'react-icons/bs'
import {RxCross2} from 'react-icons/rx'
const Tags = ({
    name,
    type,
    label,
    register,
    getValue,
    setValue,
    errors
}) => {

    const[tags,setTags] = useState("");
    const[tagsArray,setTagsArray] = useState([]);

    useEffect(()=>{
        register(name,{required:true});
    },[]);
    useEffect(() => {
      setValue(name, tagsArray);
    },[tagsArray])
    const handleAddTags =(e)=>{
        e.preventDefault();
        if(tags !== ""){
            if(!tagsArray.includes(tags)){
              setTagsArray([...tagsArray,tags]);
              setValue(name,[...tagsArray,tags]);
            }
            setTags("");
            e.target.value = "";
        }
    }

    const handleRemoveTags = (value)=>{
        const newTags = tagsArray.filter((item)=> item !== value);
        setTagsArray(newTags);
        setValue(name,newTags);
    }

    

  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor='course-Tags' className='text-sm text-richblack-5'>{label}<sup className='text-pink-300 font-inter text-lg'>*</sup></label>
      {
        tagsArray.length > 0 && (
          <div className='flex flex-row gap-1 flex-wrap'>
            {
              tagsArray.map((item, index) => (
                <div key={index} className='px-3 border-[1px] border-yellow-400 py-1 bg-yellow-700 text-yellow-200 rounded-full flex flex-row items-center gap-1'>
                  <span>{item}</span>
                  <button onClick={(e) => {
                    e.preventDefault();
                    handleRemoveTags(item);
                  }}><RxCross2 /></button>
                </div>
              ))
            }
          </div>
        )
      }
      <div className='flex w-full'>
        <input 
                type={type}
                id='course-Tags'
                className='p-3 w-full bg-richblack-700 text-richblack-400 rounded-l-lg border-b-2 border-richblack-600'
                value={tags}
                onChange={(e)=>{
                  setTags(e.target.value);
                }}
                placeholder='Enter Course Tags'
        />
        <button className='p-3 bg-yellow-25 text-richblack-900 font-extrabold text-lg rounded-r-lg' onClick={(e) => handleAddTags(e)}><BsArrowRight /></button>
        
      </div>
                {
                  errors.courseTags && <span className='text-sm text-red-500'>This field is required</span>
                }
    </div>
  )
}

export default Tags
