import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';
import {BsArrowLeft} from 'react-icons/bs'
import {PiClockCounterClockwiseBold} from 'react-icons/pi'
const VerifyEmail = () => {
    const {loading, signupData} = useSelector((state) => state.auth);
    const [otp, setOTP] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if(!signupData){
    //         navigate('/signup')
    //     }
    // },[]) 

    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const{first_name,
            last_name,
            password,
            confirmPassword,
            accountType,
            email,
        } = signupData
    
        dispatch(signUp( accountType,first_name, last_name, email, password, confirmPassword, otp, navigate))
    }

  return (
    <div className=' w-11/12 flex justify-center items-center mx-auto min-h-[80vh]'>
      {
        loading ? (<div>Loading....</div>)
        :
        (
            <div className='max-w-[588px] flex flex-col gap-5'>
                <h1 className='text-xl md:text-3xl font-bold font-inter text-richblack-25'>Verify Email</h1>
                <p className='text-sm md:text-lg text-richblack-300'>A verification code has been sent to you. Enter the code below</p>
                <form onSubmit={handleOnSubmit} className='flex flex-col justify-center items-center gap-7'>
                    <OTPInput
                        value={otp}
                        onChange={setOTP}
                        numInputs={6}
                        renderSeparator={<span className='text-richblack-300 font-bold'>-</span>}
                        renderInput={(props) => <input {...props} className='mx-1 md:mx-3 !w-[30px] h-[40px] md:!w-[57px] md:h-[58px] bg-richblack-800 rounded-lg text-white text-xl'/>}
                    />
                    <button type='submit' className='bg-yellow-50 font-semibold text-richblack-700 p-3 text-sm md:text-base w-full transition-all duration-200 hover:bg-yellow-300 rounded-lg'>Verify Email</button>
                </form>
                <div className='flex justify-between items-center'>
                    <Link to='/login'>
                        <div className='text-richblack-50 flex gap-1 text-sm md:text-base items-center hover:text-richblack-200 transition-all duration-200'>
                            <BsArrowLeft />
                            Back to Login
                        </div>
                    </Link>
                    <div className='text-blue-100 flex gap-1 text-sm md:text-base items-center hover:text-blue-200 transition-all duration-200 cursor-pointer' onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
                        <PiClockCounterClockwiseBold />
                        <span>Resend it</span>
                    </div>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail
