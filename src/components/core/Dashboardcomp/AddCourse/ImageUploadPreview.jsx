import React from 'react'
import {SlCloudUpload} from 'react-icons/sl'
import { useState } from 'react'
import { useEffect } from 'react';
const ImageUploadPreview = ({
    name,
    label,
    register,
    getValue,
    setValue,
    errors,

}) => {
    const[image, setImage] = useState(null);
    const[imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        register(name, {required:true});
    },[])
    
    useEffect(() => {
        setValue(name,image);
    },[image])
    const handleImagePreview = (e) => {
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
        setImage(file);
        setValue(name, file);
    }

    const handleImageCancel = (e) => {
        setImage(null);
        setImagePreview(null);
        setValue(name, null);
    }
    
  return (
    <div className='flex flex-col gap-1'>
        <label>{label}<sup className='text-pink-300'>*</sup></label>
        <div className='bg-richblack-700 rounded-lg border-b-2 border-richblack-600 p-3'>
            <div className='flex flex-col justify-center items-center gap-2'>
                <div className='max-w-full h-[200px] flex items-center max-h-[250px] overflow-hidden'>
                    {
                        imagePreview ? (
                            <img src={imagePreview} alt='course thumbnail' className='w-full h-full object-cover'/>
                        ):(
                            <div className='bg-richblack-800 p-4 rounded-full'><SlCloudUpload  className='text-2xl font-bold text-yellow-50'/></div>
                        )
                    }
                </div>
                
                <div className='relative'>
                    <input type='file' className='text-yellow-5 cursor-pointer' onChange={handleImagePreview}/>
                    <div className='font-bold text-yellow-25 p-2 bg-richblack-700 text-center w-24 absolute -top-1 cursor-pointer pointer-events-none'>Browse</div>
                </div>
                {
                    image && (
                        <button onClick={handleImageCancel}>Cancel</button>
                    )
                }
            </div>
        </div>
        {
            errors.courseImage && <span className='text-sm text-red-500'>This field is required</span>
        }
    </div>
  )
}

export default ImageUploadPreview
