import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiFillEye} from 'react-icons/ai'
import {AiFillEyeInvisible} from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'

const UpdatePassword = () => {
    const {loading} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    })
    const dispatch = useDispatch();
    const {password, confirmPassword} = formData;
    const location = useLocation();
    const handleFormChange = (e)=> {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ))
    }

    const handleFormSubmit =(e)=>{
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        console.log(token);
        dispatch(resetPassword(password, confirmPassword, token));
    }
  return (
    <div className=' w-11/12 flex justify-center items-center mx-auto min-h-[80vh]'>
        {
            loading ? (
                <div>Loading...</div>
            )
            :
            (
                <div className='min-w-[586px] flex flex-col p-5 gap-4'>
                    <h1 className='text-3xl text-richblack-50 font-bold font-inter'>Choose  new password</h1>
                    <p className='text-lg text-richblack-100 font-inter'>Almost done. Enter your new password and youre all set.</p>
                    <form onSubmit={handleFormSubmit} className='flex flex-col gap-3'>
                        <label className='relative'>
                            <p className='text-sm text-richblack-300 font-inter'>Create Password</p>
                            <input
                                placeholder='Create New Password'
                                required
                                type={showPassword ? `text`:`password`}
                                name='password'
                                value={password}
                                onChange={handleFormChange}
                                className='p-3 w-full bg-richblack-700 rounded-lg text-richblack-50'
                            />
                            <span className='absolute right-3 top-[35px] z-[10] cursor-pointer text-xl text-richblack-300' onClick={() => setShowPassword((prev) => !prev)}>{
                                showPassword? <AiFillEyeInvisible /> : <AiFillEye />
                                }
                            </span>
                        </label>
                        <label className='relative'>
                            <p className='text-sm text-richblack-300 font-inter'>Confirm Password</p>
                            <input
                                required
                                placeholder='Confirm Password'
                                type = {showConfirmPassword? "text": "password"}
                                name = 'confirmPassword'
                                value={confirmPassword}
                                onChange={handleFormChange}
                                className='p-3 w-full bg-richblack-700 rounded-lg text-richblack-50'
                            />
                            <span className='absolute right-3 top-[35px] z-[10] cursor-pointer text-xl text-richblack-300' onClick={() => setShowConfirmPassword((prev)=>!prev)}>{
                                showConfirmPassword? <AiFillEyeInvisible /> : <AiFillEye />
                                }
                            </span>
                        </label>
                        <button type='submit' className='p-4 bg-yellow-50 w-full rounded-lg text-richblack-700 font-inter font-semibold transition-all duration-200 hover:bg-yellow-300'>Reset Password</button>
                    </form>
                </div>
            )
        }
      
    </div>
  )
}

export default UpdatePassword
