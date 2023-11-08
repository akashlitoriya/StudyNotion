import React, { useState } from 'react'
import {HomePageExplore} from '../../../data/homepage-explore'
import HighlightedText from './HighlightedText';

import {HiMiniUsers} from 'react-icons/hi2'
import {ImTree} from 'react-icons/im'
const data = [
    "Free",
    "New to coding",
    "Most Popular",
    "Skills paths",
    "Career paths"
    
];

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(data[0]);
    const [course, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0]);

    const setValue = (value) =>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0]);
    }


  return (
    <div className='mt-16 flex flex-col items-center gap-6 md:gap-10'>
        <div className='text-4xl font-semibold font-inter'>
            Unlock the
            <HighlightedText text={"Power of code"} />
        </div>
        <div className='text-richblack-300 font-inter text-center text-base font-semibold'>
        Learn to Build Anything You Can Imagine
        </div>
        <div className='flex flex-row bg-richblack-800 rounded-full border-2 md:border-4 border-richblack-700 text-richblack-300'>
            {data.map((items, index) => {
                return (
                    <div key={index} className={`flex items-center px-4 md:px-6 py-2 md:py-3 hover:bg-richblack-900 text-xs md:text-base hover:text-richblack-50 rounded-full cursor-pointer transition-all duration-300 ${currentTab === items? "bg-richblack-900 text-richblack-50" : " "}`} onClick={() => setValue(items)}>
                        {items}
                    </div>
                )
            })}
        </div>
        <div className='flex flex-col md:flex-row gap-10 max-w-maxContent'>
            {course.map((item, index) => {
                return (
                    
                    <div key={index} className=''>
                        <div className={`group flex flex-col  min-h-[300px] justify-between cursor-pointer hover:bg-white ${currentCard === item? "card-shadow bg-white":"bg-richblack-800 text-richblack-400 "}`} onClick={() => setCurrentCard(item)}>
                            <div className='flex flex-col py-8 px-6'>
                                <p className={`font-inter text-xl font-semibold text-richblack-25 group-hover:text-richblack-900 ${currentCard === item? "text-richblack-900" : " "}`}>{item.heading}</p>
                                <p className='font-inter font-normal text-richblack-500'>{item.description}</p>
                            </div>
                            <div className={`flex flex-row justify-between px-6 py-6 border-t-2 border-dashed border-t-richblack-500 font-semibold text-richblack-300 group-hover:text-blue-500 ${currentCard === item? " text-blue-500" : ""}`}>
                                <div className='flex flex-row items-center gap-2 '>
                                    <HiMiniUsers />
                                    <div className='font-inter text-base'>
                                        {item.level}
                                    </div>
                                </div>
                                <div className='flex flex-row items-center gap-2'>
                                    <ImTree />
                                    <div className='font-inter text-base'>
                                        {item.lessionNumber}
                                    </div>
                                </div>
                            </div>
      
                        </div>
                    </div>
                )
            })}
        </div>
      
    </div>
  )
}

export default ExploreMore
