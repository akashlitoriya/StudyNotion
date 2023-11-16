import React from 'react'
import {HiChatBubbleLeftRight,HiBuildingOffice2,HiPhone} from 'react-icons/hi2'
const ContactInfo = () => {
  return (
    <div className='bg-richblack-800 p-6 md:p-8 rounded-xl h-fit'>
      <div className='flex flex-col gap-3 '>
        <div className='flex gap-2'>
            <div>
                <HiChatBubbleLeftRight className='text-richblack-5 text-base md:text-2xl'/>
            </div>
            <div className='flex flex-col gap-1'>
                <p className='text-richblack-5 font-inter font-semibold text-base md:text-lg'>Chat with us</p>
                <p className='text-richblack-200 font-inter text-xs md:text-sm'>Our friendly team is here to help.</p>
                <p className='text-richblack-200 font-inter text-xs md:text-sm'>@mail address</p>
            </div>
        </div>
        <div className='flex gap-2'>
            <div>
                <HiBuildingOffice2 className='text-richblack-5 text-base md:text-2xl'/>
            </div>
            <div className='flex flex-col gap-1'>
                <p className='text-richblack-5 font-inter font-semibold text-base md:text-lg'>Visit us</p>
                <p className='text-richblack-200 font-inter text-xs md:text-sm'>Come and say hello at our office HQ.</p>
                <p className='text-richblack-200 font-inter text-xs md:text-sm'>Here is the location/ address</p>
            </div>
        </div>
        <div className='flex gap-2'>
            <div>
                <HiPhone className='text-richblack-5 text-base md:text-2xl'/>
            </div>
            <div className='flex flex-col gap-1'>
                <p className='text-richblack-5 font-inter font-semibold text-base md:text-lg'>Call us</p>
                <p className='text-richblack-200 font-inter text-xs md:text-sm'>Mon - Fri From 8am to 5pm</p>
                <p className='text-richblack-200 font-inter text-xs md:text-sm'>+123 456 7890</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
