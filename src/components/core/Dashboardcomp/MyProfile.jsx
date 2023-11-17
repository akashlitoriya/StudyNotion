import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    
  return (
    <div className='w-full py-6'>
        <h1 className='text-xl md:text-3xl font-inter font-bold text-richblack-5 mt-4 ml-4 lg:ml-8 lg:mt-8'>My Profile</h1>
        {/* Section - 1  */}
      <div className='flex flex-col md:flex-row justify-between items-center gap-3 w-10/12 mx-auto my-4 lg:my-7 p-4 lg:p-10 rounded-xl bg-richblack-800'>
        <div className='flex flex-row items-center gap-3'>
            <img src={user.image}  className='w-[40px] lg:w-[78px] aspect-square rounded-full' alt={`Profile of ${user.first_name}`}/>

            <div className='text-richblack-5 '>
                <h1 className='font-inter text-lg md:text-2xl font-semibold'>{`${user.first_name} ${user.last_name}`}</h1>
                <p className='font-inter text-xs md:text-base text-richblack-300'>{user.email}</p>
            </div>
        </div>

        <div>
            <IconBtn 
                text={"Edit"}
                onClick={()=> navigate("/dashboard/setting")}
            />
        </div>
      </div>

        {/* Section-2  */}
      <div className='w-10/12 p-4 lg:p-10 bg-richblack-800 mx-auto rounded-xl'>
        <div className='flex flex-row justify-between'>
            <p className='text-richblack-25 text-base md:text-lg font-inter font-semibold'>Personal Details</p>
            <IconBtn text={"Edit"} onClick={()=> navigate('/dashboard/setting')} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-3'>
            
                <div className=''>
                    <p className='text-richblack-500 text-sm md:text-base font-inter font-semibold'>First Name</p>
                    <p className='text-richblack-100 text-xs md:text-sm font-inter font-semibold'>{user.first_name}</p>
                </div>
                <div className=''>
                    <p  className='text-richblack-500 text-sm md:text-base font-inter font-semibold'>Last Name</p>
                    <p className='text-richblack-100 text-xs md:text-sm font-inter font-semibold'>{user.last_name}</p>
                </div>
            
            
           
                <div className=''>
                    <p className='text-richblack-500 text-sm md:text-base font-inter font-semibold'>Phone Number</p>
                    <p className='text-richblack-100 text-xs md:text-sm font-inter font-semibold'>
                      {user.additionalDetails.contactNumber? user.additionalDetails.contactNumber : "Add Contact Number"}
                    </p>
                </div>
                <div className=''>
                    <p  className='text-richblack-500 text-sm md:text-base font-inter font-semibold'>Email</p>
                    <p className='text-richblack-100 text-xs md:text-sm font-inter font-semibold'>{user.email}</p>
                </div>
                
            
        </div>
       
      </div>
    </div>
  )
}

export default MyProfile
