import React from 'react'
import { useSelector } from 'react-redux'
import { BsCheckLg } from 'react-icons/bs'
import CourseInformationForm from './CourseInformationForm'
import CourseBuilder from './CourseBuilder/CourseBuilder'
import { Fragment } from 'react'
const CourseInformation = () => {
    const courseAddProgress = [
        {
            id:1,
            heading:"Course Information"
        },
        {
            id:2,
            heading:"Course Builder"
        },
        {
            id:3,
            heading:"Publish"
        }
    ]

    const {step} = useSelector((state) => state.course);
  return (
    <div>
      <div className='flex flex-col gap-4'>
        {/* Progess bar */}
        <div>
            <div className='flex flex-row items-center w-5/6 mx-auto'>
                {
                    courseAddProgress.map((item, index) => (
                        <Fragment key={index}>
                            <div className={`px-4 py-2 border-[1px] rounded-full font-inter font-bold ${item.id <= step ? " border-yellow-50 bg-yellow-900 text-yellow-50": " border-richblack-700 bg-richblack-800 text-richblack-100"}`} key={item.id}>
                                {
                                    step > item.id ? (<BsCheckLg className='text-yellow-25 font-bold text-base my-1'/>) : (item.id)
                                }
                            </div>
                            {
                                item.id < courseAddProgress.length && <div className={`w-full col-span-2 border-b-2 border-dashed ${item.id < step ? "border-yellow-50":"border-richblack-600"}`}></div>
                            }
                        </Fragment>
                        
                        
                    ))
                }
                
            </div>
            <div className='grid grid-cols-3 mx-auto'>
                {
                    courseAddProgress.map((item) => (
                        <div className={`${item.id === 0 && "text-left"} ${item.id !== 1 && item.id !== courseAddProgress.length && "text-center"} ${item.id === courseAddProgress.length && "text-end mr-14"} ${item.id <= step?"text-richblack-50": "text-richblack-400"}`} key={item.id}>{item.heading}</div>
                    ))
                }
            </div>
        </div>
        {/* Course Forms  */}
        <div className='p-6 bg-richblack-800 rounded-xl border-richblack-700 border-[1px]'>
            {
                step === 1 && (
                    <CourseInformationForm />
                )
            }
            {
                step === 2 && (
                    <CourseBuilder />
                )
            }
            {
                step === 3 && (
                    <div>Publish</div>
                )
            }
        </div>
      </div>
    </div>
  )
}

export default CourseInformation
