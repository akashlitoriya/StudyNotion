import React from 'react'
import { useSelector } from 'react-redux'

const RenderTotalAmount = () => {
    const {total,cart} = useSelector((state) => state.cart)
    const handleBuyCourse = () => {
        const courses = cart.map((courses) => courses._id);
        //TODO - Payment gatway integration

    }
  return (
    <div className='bg-richblack-700 rounded-xl border-[1px] border-richblack-600 p-6'>
      <div className='text-richblack-200 font-inter text-base'>
        Total:
      </div>
      <div className='text-yellow-50 text-2xl font-inter font-bold'>
        {total}
      </div>
      <div className='bg-yellow-50 px-5 py-3 font-inter text-richblack-800 font-semibold rounded-lg hover:scale-95' onClick={handleBuyCourse}>
        Buy Now
      </div>
    </div>
  )
}

export default RenderTotalAmount
