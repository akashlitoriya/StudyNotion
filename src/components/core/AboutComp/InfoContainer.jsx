import React from 'react'

const Stats = [
    { count: "5K", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
  ];

const InfoContainer = () => {
    
  return (
    <div className='w-full bg-richblack-700 p-6 lg:p-10'>
        <div className='flex flex-row justify-evenly max-w-maxContent'>
            {
                Stats.map((item, index) => (
                    <div key={index} className='text-richblack-50 flex flex-col justify-center items-center '>
                        <h1 className='text-sm sm:text-base md:text-xl font-inter font-semibold'>{item.count}</h1>
                        <h1 className='text-xs sm:text-sm md:text-lg font-inter font-semibold'>{item.label}</h1>
                    </div>
                ))
            }
        </div>
      
    </div>
  )
}

export default InfoContainer
