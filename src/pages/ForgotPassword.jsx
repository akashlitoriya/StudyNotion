import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPasswordResetToken } from '../services/operations/authAPI';
const ForgotPassword = () => {
    const {loading} = useSelector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
        setEmailSent(true);
    }
  return (
    <div className=' w-11/12 flex justify-center items-center mx-auto min-h-[80vh]'>
        {
            loading ? (<div className=' text-richblack-5'>Loading....</div>):(
                <div className='max-w-[504px] flex flex-col gap-5'>
                    <h1 className='text-3xl text-richblack-5 font-semibold capitalize font-inter'>
                        {
                            !emailSent? "Reset your password" : "Check email"
                        }
                    </h1>
                    <p className='text-lg text-richblack-100 font-normal font-inter'>
                        {
                            !emailSent?
                            "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            :
                            `We have sent the reset email to
                            ${email}`
                        }
                    </p>
                    <form className='flex flex-col gap-5' onSubmit={handleFormSubmit}>
                        {
                            !emailSent && (
                                <label>
                                    <p className='text-sm text-richblack-50 font-inter'>Email address:</p>
                                    <input
                                        type="email"
                                        value={email}
                                        placeholder='Enter Your email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        name='email'
                                        className='p-3 bg-richblack-800 rounded-lg w-full text-richblack-50'
                                    />
                                </label>
                            )
                        }
                        <button className='w-full bg-yellow-50 rounded-lg p-3 font-inter font-semibold text-richblack-700 hover:bg-yellow-200 transition-all duration-200' type='submit'>
                            {
                                !emailSent? "Send Email": "Resend Email"
                            }
                        </button>
                    </form>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword
