import React from 'react'
import {HiMiniUsers} from 'react-icons/hi2'
import {ImTree} from 'react-icons/im'
const ExploreCards = (
    heading,
    description,
    level,
    lessionNumber
) => {
  return (
    <div className='flex flex-col '>
        <div className='flex flex-col'>
            <p>{heading}</p>
            <p>{description}</p>
        </div>
        <div className='flex flex-row'>
            <div>
                <HiMiniUsers />
                <div>
                    {level}
                </div>
            </div>
            <div>
                <ImTree />
                <div>
                    {lessionNumber}
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default ExploreCards
