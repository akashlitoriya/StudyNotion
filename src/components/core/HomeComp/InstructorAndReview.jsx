import React from 'react'
import InstructorImage from '../../../assets/Images/Instructor.png'
import HighlightedText from './HighlightedText'
import CTAButton from './Button'
const InstructorAndReview = () => {
  return (
    <div className=''>
      <div className='flex flex-col justify-between gap-32'>
        <div className='flex flex-row justify-between gap-16'>
            <div className='shadow-blue-500 shadow-2xl'> 
                <img 
                    src={InstructorImage}
                    alt='Instructor holding book'
                />
            </div>
            <div className='flex flex-col justify-center max-w-[490px] gap-6'>
                <div className='text-4xl font-inter w-[50%] font-bold'>
                    Become an 
                    <HighlightedText text={"Instructor"} />
                </div>
                <div className='text-richblack-300 font-semibold'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </div>
                <div className='w-fit mt-10'>
                    <CTAButton active={true} linkTo = {'/signup'}>
                        Learn More
                    </CTAButton>
                </div>
            </div>
        </div>
        <div className='flex flex-col'>
           <div className='text-4xl font-semibold font-inter text-center'>
            Reviews from other learners
           </div>
        </div>

      </div>
    </div>
  )
}

export default InstructorAndReview
