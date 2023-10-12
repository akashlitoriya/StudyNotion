import React from 'react'
import { useForm } from 'react-hook-form'
import countryCodes from '../../../data/countrycode.json'
const ContactForm = () => {
    const {register} = useForm();
  return (
    <div className='col-span-2 border-[1px] border-richblack-700 rounded-xl flex flex-col lg:p-10 lg:gap-10'>
        <div className='flex flex-col gap-3'>
            <p className='font-inter font-semibold text-3xl text-richblack-5'>Got a Idea? We’ve got the skills.<br></br> Let’s team up</p>
            <p className='font-inter text-richblack-200 text-base'>Tall us more about yourself and what you’re got in mind.</p>
        </div>
        <form>
            <div className='flex flex-col gap-5'>
                <div className='grid grid-flow-col grid-cols-2 gap-x-3'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='firstName' className='text-richblack-25 font-inter text-base'>First Name</label>
                        <input type='text' className='p-3 bg-richblack-800 border-b-[2px] border-richblack-700 rounded-lg' placeholder='John' {...register('firstName')}/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='lastName' className='text-richblack-25 font-inter text-base'>Last Name</label>
                        <input type='text' className='p-3 bg-richblack-800 border-b-[2px] border-richblack-700 rounded-lg' placeholder='Cena' {...register('lastName')}/>
                    </div>
                </div>
                <div  className='flex flex-col gap-1'>
                        <label htmlFor='email' className='text-richblack-25 font-inter text-base'>Email</label>
                        <input type='email' className='w-full p-3 bg-richblack-800 border-b-[2px] border-richblack-700 rounded-lg' placeholder='Enter your email here' {...register('email')}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='contactNumber' className='text-richblack-25 font-inter text-base'>Phone Number</label>
                    <div className='flex flex-row gap-3'>
                        <select {...register('countryCode')} className='p-3 bg-richblack-800 w-[80px] text-richblack-100 rounded-lg text-base'>
                            {
                                countryCodes.map((codes, index) => (
                                    <option value={codes.code} key={index}>{`${codes.code} - ${codes.country}`}</option>
                                ))
                            }
                        </select>
                        <input type='number' className='w-full p-3 bg-richblack-800 border-b-[2px] border-richblack-700 rounded-lg' placeholder='Enter your contact number' {...register('contactNumber')}/>
                    </div>
                </div>
                <div  className='flex flex-col gap-1'>
                        <label htmlFor='message' className='text-richblack-25 font-inter text-base'>Message</label>
                        <textarea rows={5} type='message' className='w-full p-3 bg-richblack-800 border-b-[2px] border-richblack-700 rounded-lg' placeholder='Type your message here' {...register('message')}/>
                </div>
                <button className='w-full bg-yellow-50 text-richblack-900 font-inter font-semibold p-3 rounded-lg transition-all duration-200 hover:scale-95'>Submit</button>
            </div>
        </form>
      
    </div>
  )
}

export default ContactForm
