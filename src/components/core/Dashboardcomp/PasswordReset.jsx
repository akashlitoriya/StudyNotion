import React from 'react'
import { useForm } from 'react-hook-form'

const PasswordReset = () => {
    const {register, handleSubmit, reset} = useForm();
  return (
    <form>
        <div className='grid grid-flow-col grid-cols-2 gap-x-8'>
            <div className='text-lg text-richblack-5 font-inter'>
                Password RESET Component
            </div>
        </div>
    </form>

  )
}

export default PasswordReset
