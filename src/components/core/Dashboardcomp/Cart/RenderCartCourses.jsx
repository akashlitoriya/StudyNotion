import React from 'react'
import { useSelector } from 'react-redux'
import Rating from 'react-rating';
import {AiOutlineStar,AiFillStar} from 'react-icons/ai'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { removeFromCart } from '../../../../slices/cartSlice';
const RenderCartCourses = () => {
    const {cart} = useSelector((state) => state.cart);
  return (
    <div>
      {
        cart.map((course) => (
            <div className='flex flex-row gap-3'>
                <div className='lg:w[185px] lg:h-[146px] rounded-lg'>
                    <img src={course?.thumbnail} alt={course?.name} className='object-cover'/>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='text-richblack-5 font-inter font-semibold text-lg'>
                        {course?.name}
                    </div>
                    <div className='text-base font-inter text-richblack-300'>
                        {course?.instructor}
                    </div>
                    <div className='flex gap-1 text-richblack-300 font-inter'>
                        <p>4.5</p>
                        <Rating initialRating={4.5} fullSymbol={<AiFillStar />}  emptySymbol={<AiOutlineStar />}/>
                        <span>{course?.ratingAndReviews?.length}</span>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='px-5 py-3 bg-richblack-700 hover:scale-95 rounded-lg' onClick={() => removeFromCart(course._id)}>
                        <button className='text-pink-200 text-base font-inter flex flex-row gap-2'>
                            <RiDeleteBin6Line />
                            <span>Remove</span>
                        </button>
                    </div>
                    <div>
                        <p className='text-2xl font-inter font-semibold text-yellow-50'>Rs-{course?.price}</p>
                    </div>
                </div>    
            </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses
