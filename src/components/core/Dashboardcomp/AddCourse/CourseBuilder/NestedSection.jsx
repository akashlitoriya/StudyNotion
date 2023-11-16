import React from 'react'
import { useSelector } from 'react-redux';
import {RxDropdownMenu} from 'react-icons/rx';
import { useState } from 'react';
import {MdEdit} from 'react-icons/md'
import {RiDeleteBinLine} from 'react-icons/ri'
import {BiSolidDownArrow} from 'react-icons/bi'
import {FaPlus} from 'react-icons/fa'
const NestedSection = ({
    handleChangeEditSection
}) => {
  const{course} = useSelector((state) => state.course);
  const{token} = useSelector((state) => state.auth);
  console.log(course);
  const[addSubSection, setAddSubSection] = useState(null);
  const[editSubSection, setEditSubSection] = useState(null);
  const[viewSubSetion, setViewSubSection] = useState(null);

  const[confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = (sectionId) => {
    console.log(sectionId);
  }
  const handleDeleteSubSection = (subSectionId, sectionId) => {
    console.log(subSectionId, sectionId);
  }
  const handleAddSubSection = (sectionId) => {
    console.log(sectionId);
  }
  return (
    <div className='bg-richblack-700 p-3 rounded-md'>
      <div className='flex flex-col gap-3'>
        {
          course?.courseContent?.map((section) => (
            <details key={section._id}>
              <summary className='flex flex-row justify-between items-center  border-b-[1px] border-richblack-600'>
                <div className='flex flex-row gap-2 items-center'>
                  <RxDropdownMenu className='text-richblack-50 text-lg'/>
                  <p className='text-base text-richblack-50 font-inter font-medium'>{section.section_Name}</p>
                </div>
                <div className='flex flex-row gap-2 items-center text-richblack-50 text-lg'>
                  <button onClick={handleChangeEditSection}><MdEdit /></button>
                  <button 
                    onClick={() => setConfirmationModal({
                      heading:"Delete Section",
                      text: "Are you sure you want to delete this section?",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn2Handler: () => setConfirmationModal(null),
                      btn1handler: () => handleDeleteSection(section._id),
                    })}
                  >
                    <RiDeleteBinLine />
                  </button>
                  <span>|</span>
                  <button><BiSolidDownArrow className='text-xs text-richblack-50'/></button>
                </div>
              </summary>
              <div>
                {
                  section?.subSection.map((subSection) =>(
                    <div className='flex flex-row justify-between items-center ml-2' key={subSection._id}>
                      <div className='flex flex-row gap-2 items-center'>
                        <RxDropdownMenu className='text-richblack-50 text-lg'/>
                        <p className='text-base text-richblack-50 font-inter font-medium'>{section.subSection_Name}</p>
                      </div>

                      <div>
                        <button onClick={() => setEditSubSection({...subSection, sectionId:section._id})}><MdEdit /></button>
                        <button 
                          onClick={() => setConfirmationModal({
                            heading:"Delete Subsection",
                            text: "Are you sure you want to delete this lecture?",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn2Handler: () => setConfirmationModal(null),
                            btn1handler: () => handleDeleteSubSection(subSection._id,section._id),
                          })}
                        >
                          <RiDeleteBinLine />
                        </button>
                      </div>
                    </div>
                  ))
                }
                <button className='flex flex-row gap-2 items-center text-yellow-50 ml-3 text-sm' onClick={handleAddSubSection(section._id)}>
                  <FaPlus />
                  <p className='font-semibold'>Add Lecture</p>
                </button>
              </div>
            </details>
          ))
        }
      </div>
    </div>
  )
}

export default NestedSection
