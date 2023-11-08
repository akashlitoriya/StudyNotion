import React from 'react'
import HighlightedText from './HighlightedText'
import LLSImage1 from '../../../assets/Images/Know_your_progress.svg'
import LLSImage2 from '../../../assets/Images/Compare_with_others.svg'
import LLSImage3 from '../../../assets/Images/Plan_your_lessons.svg'
import CTAButton from './Button'
const LearningLanguageSection = () => {
  return (
    <div className='mt-10'>
        <div className='flex flex-col justify-center gap-16'>
            <div>
                <div className='text-4xl font-semibold font-inter text-center'>
                    Your swiss knife for
                    <HighlightedText text={'learning any language'} />
                </div>
                <div className='text-richblack-700 font-semibold max-w-[750px] text-center mx-auto mt-6'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
            </div>
            <div className='flex flex-col md:flex-row w-full'>
                <img
                    src={LLSImage1}
                    alt='Learn with language 1'
                    className='-mr-32 object-contain'
                />
                <img
                    src={LLSImage2}
                    alt='Learn with language 1'
                    className='object-contain'
                />
                <img
                    src={LLSImage3}
                    alt='Learn with language 1'
                    className='object-contain md:-ml-36'
                />
           </div>
           <div className='w-fit mx-auto'>
                <CTAButton active={true} linkTo={'/signup'}>Learn More</CTAButton>
           </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection
