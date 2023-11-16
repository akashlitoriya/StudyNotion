import React, { useState } from 'react'
import { useEffect } from 'react';

const Requirement = ({name,label, register, getValue, setValue, errors}) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    useEffect(()=>{
        register(name, {required:true});
    },[])
    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList])
    const handleAddRequirement = () => {
        if(requirement){
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }
    const handleRemoveRequirement = (index) => {
        const updateRequirementList = [...requirementList]
        updateRequirementList.splice(index,1);
        setRequirementList(updateRequirementList);
    }
    
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor='courseRequirement' className='text-sm text-richblack-5'>{label}<sup className='text-xl text-pink-400'>*</sup></label>
      <input 
            className='p-3 bg-richblack-700 border-b-2 border-richblack-600 rounded-lg'
            type='text'
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            placeholder='Enter Benefits of the course'
      />
      <button className='w-fit text-yellow-25 font-inter font-semibold text-base text-start' type='button' onClick={handleAddRequirement}>Add</button>
      {
        requirementList.length > 0 && (
            <ul>
                {
                    requirementList.map((item, index) => (
                        <li key={index} className='text-sm'>
                            <span>{item}</span>
                            <button className='border-none text-richblack-500 font-semibold font-inter ml-1' onClick={()=>handleRemoveRequirement(index)}>Clear</button>
                        </li>
                    ))
                }
            </ul>
            
        )
      }
      {
        errors.courseRequirements && <span className='text-sm text-red-500'>This field is required</span>
      }
    </div>
  )
}

export default Requirement
