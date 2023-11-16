import React, { useState, useEffect } from 'react'
import { getAllEnrolledCourses } from '../../../services/operations/courseAPI';
import { useSelector } from 'react-redux';
import {AiOutlineMore} from 'react-icons/ai'
import ProgressBar from '@ramonak/react-progress-bar';
const EnrolledCourses = () => {
    const {token} = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState();
    useEffect(()=>{
        const courses = getAllEnrolledCourses(token);
        setEnrolledCourses(courses);
        
    },[])
  return (
    <div className='lg:m-6'>
      {/* Heading  */}
      <div className='text-richblack-5 text-3xl font-inter font-bold'>
        EnrolledCourses
      </div>

      {/* Courses Section  */}
      <div className='w-11/12 mx-auto'>
        {
          !enrolledCourses? (<div>Loading</div>)
          :
          (
            !enrolledCourses.length ? (<div className='font-inter text-lg text-richblack-50 text-center'>You have not enrolled in any courses yet</div>)
            :
            (
              <table className='w-full'>
              <tr className='bg-richblack-700 p-3 text-richblack-50 text-start'>
                <th className='text-start p-3 rounded-tl-lg'>Course Name</th>
                <th className='text-start p-3'>Durations</th>
                <th className='text-start p-3 rounded-tr-lg'>Progress</th>
              </tr>
    
              {
                enrolledCourses.map((item, index) => (
                  <tr key={index}>
                    <td className='flex flex-row gap-3'>
                      <div className='w-[52px] h-[52px] rounded-lg'>
                        <img src={item?.thumbnail} alt={item?.name} className='object-cover'/>
                      </div>
                      <div>
                        <p className='text-richblack-5 font-inter text-lg'>{item?.name}</p>
                        <p className='text-richblack-300 font-inter text-base'>{item?.description}</p>
                      </div>
                    </td>
                    <td>
                      <div className='text-richblack-50 font-inter text-base'>{item?.duration}</div>
                    </td>
                    <td className='flex flex-row justify-between'>
                      <div>
                        Progress
                        <ProgressBar completed={item?.progressPercentage || 0} isLabelVisible={false}/>
                      </div>
                      <div>
                        <AiOutlineMore />
                      </div>
                    </td>
                  </tr>
                ))
              }
              </table>  
            )
          )
        }
        
      </div>
    </div>
  )
}

export default EnrolledCourses
