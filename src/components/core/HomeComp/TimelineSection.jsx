import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImg from '../../../assets/Images/TimelineImage.png'
const TimelineSection = () => {
    const timeline = [
        {
            logo:Logo1,
            heading: "Leadership",
            subheading: "Fully committed to the success company"
        },
        {
            logo:Logo2,
            heading: "Leadership",
            subheading: "Fully committed to the success company"
        },
        {
            logo:Logo3,
            heading: "Leadership",
            subheading: "Fully committed to the success company"
        },
        {
            logo:Logo4,
            heading: "Leadership",
            subheading: "Fully committed to the success company"
        }
    ]
  return (
    <div className='flex flex-row justify-between items-center w-full'>
        <div className='flex flex-col gap-10'>
            {
                timeline.map((element, index) => {
                    return(
                        <div className='flex flex-row gap-6' key={index}>
                            <div className='bg-white h-[60px] w-[60px] flex justify-center items-center rounded-full'>
                                <img src={element.logo} alt=''/>
                            </div>
                            <div>
                                <p className='text-xl font-inter font-semibold'>{element.heading}</p>
                                <p className='text-sm text-richblack-500 font-medium'>{element.subheading}</p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
        <div className='relative'>
            <img 
                src={timelineImg}
                alt='Timeline'
                className='h-fit max-h-[445px]' 
            
            />
            <div className='absolute flex flex-row justify-between items-center bg-caribbeangreen-600 left-[50%] translate-x-[-50%] translate-y-[-50%] px-5 py-2'>
                <div className='flex flex-row border-r border-caribbeangreen-300 gap-4 w-[45%] p-5 items-center'>
                    <h1 className='text-3xl text-white font-bold'>10</h1>
                    <p className='uppercase text-xs text-caribbeangreen-100'>Years of Experience</p>
                </div>
                <div className='flex flex-row gap-4 w-[55%] p-5 items-center'>
                    <h1 className='text-3xl text-white font-bold'>250</h1>
                    <p className='uppercase text-xs  text-caribbeangreen-100'>Types of courses</p>
                </div>
            </div>
        </div>
        <div>

        </div>
      
    </div>
  )
}

export default TimelineSection
