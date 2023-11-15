import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form';
import {apiConnector} from '../../../services/apiConnector'
import { contactusEndpoint } from '../../../services/apis';
import CountryCodes from '../../../data/countrycode.json'

const ContactFormSection = () => {
  const[loading, setLoading] = useState("false");
  const {register, handleSubmit, reset, formState:{errors, isSubmitSuccessfully}} = useForm();

  useEffect(()=>{
    if(isSubmitSuccessfully){
      reset({
        firstName: "",
        lastName: "",
        email:"",
        phoneNo:"",
        message:"",
      })

    }
  },[reset, isSubmitSuccessfully])

  const submitContactForm = async(data) => {
    console.log("Contact Form data" ,data);
    try{
      setLoading(true);
      const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      console.log("Contact Form response : ", response);
      setLoading(false);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='flex flex-col items-center gap-5 md:gap-14 mt-10 lg:mt-16 '>
      <div className='flex flex-col gap-5 text-center'>
        <div className='text-2xl md:text-4xl font-inter text-richblack-5 font-bold'>Get in touch</div>
        <p className='text-base md:text-xl text-richblack-200 font-inter font-medium'>We’d love to here for you, Please fill out this form.</p>
      </div>

      <form className='flex flex-col gap-5 md:gap-10 w-11/12 lg:w-[600px]' onSubmit={handleSubmit(submitContactForm)}>
        {/* First Name and Last Name  */}
        <div className='flex flex-col md:flex-row gap-6 w-full'>

          <div className='flex flex-col gap-3 md:w-1/2'>
            <label htmlFor='firstName' className='font-inter text-sm text-richblack-5'>First Name</label>
            <input 
              type='text'
              name="firstName"
              id="firstName"
              placeholder='Enter first name'
              {...register("firstName", {required:true})}
              className='bg-richblack-800 p-3 text-richblack-200 rounded-lg border-b-2 border-richblack-700'
            />
            {
              errors.firstName && (
                <span>Please enter first name</span>
              )
            }
          </div>

          <div className='flex flex-col gap-3 md:w-1/2'>
            <label htmlFor='lastName' className='font-inter text-sm text-richblack-5'>Last Name</label>
            <input 
              type='text'
              name="lastName"
              id="lastName"
              placeholder='Enter last name'
              {...register("lastName", {required:true})}
              className='bg-richblack-800 p-3 text-richblack-200 rounded-lg border-b-2 border-richblack-700'
            />
            {
              errors.lastName && (
                <span>Please enter last name</span>
              )
            }
          </div>

        </div>

        {/* Email  */}
        <div className='flex flex-col gap-3'>
            <label htmlFor='email' className='font-inter text-sm text-richblack-5'>Email</label>
            <input 
              type='email'
              name="email"
              id="email"
              placeholder='Enter your email'
              {...register("email", {required:true})}
              className='bg-richblack-800 p-3 text-richblack-200 rounded-lg border-b-2 border-richblack-700'
            />
            {
              errors.email && (
                <span>Please enter your email</span>
              )
            }
        </div>

        {/* Phone  */}
        <div className='flex flex-col gap-3'>
          <label htmlFor='phoneNo' className='text-sm font-inter text-richblack-5'>Phone Number</label>
          <div className='flex flex-row gap-3'>
            <div className='flex flex-col w-[80px]'>
              <select className='bg-richblack-800 text-richblack-5 p-3 rounded-lg border-b-2 border-richblack-700'
                name='dropdown'
                id='dropdown'
                {...register("countryCode",{required: true})}
              >
                {
                  CountryCodes.map((element, index) => (
                    <option key={index} value={element.code}>{element.code}-{element.country}</option>
                  ))
                }
              </select>
            </div>
            <div className='w-full'>
              <input 
                type='text'
                name='phoneNo'
                id='phoneNo'
                placeholder='1234567890'
                className='p-3 bg-richblack-800 border-b-2 border-richblack-700 text-richblack-200 w-full rounded-lg'
                {...register("phoneNumber",{
                  required:{value:true, message:"Enter Phone number"},
                  maxLength: {value: 10, message:"Invalid Number"},
                  minLength:{value: 8,message:"Invalid Number"}

                })}
              />
            </div>
          </div>
        </div>
        {/* Message  */}
        <div className='flex flex-col gap-3'>
          <label htmlFor='message' className='font-inter text-richblack-5 text-sm'>Message</label>
          <textarea 
            cols={30}
            rows={7}
            id='message'
            name='message'
            className='text-richblack-200 bg-richblack-800 border-b-2 border-richblack-700 rounded-lg p-3'
            placeholder='Enter your message here'
            {...register("message", {required:true})}
          />
          {
            errors.message && (
              <span>Please enter the message</span>
            )
          }
        </div>

        {/* Submit button  */}
        <button type='submit' className='bg-yellow-50 font-semibold text-lg px-6 py-3 rounded-lg hover:scale-95 transition-all duration-200'>
          Submit
        </button>
      </form>
      
    </div>
  )
}

export default ContactFormSection
