import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import CTAButton from './Button'
import { TypeAnimation } from 'react-type-animation'
const CodeBlock = (
    {
        position,
        heading,
        subheading,
        ctaBtn1,
        ctaBtn2,
        codeblock,
        code_color
    }
) => {
  return (
    <div className={`flex ${position} flex-col  justify-between max-w-[1035px] gap-10`}>
      {/* Section-1  */}
      <div className='flex flex-col gap-7 w-full md:w-1/2 '>
        {heading}
        <div className='font-semibold text-sm lg:text-base text-richblack-300'>
            {subheading}
        </div>
        <div className='flex w-full md:w-fit gap-10'>
            <CTAButton active={ctaBtn1.active} linkTo={ctaBtn1.linkTo}>
                <div className='flex gap-3 text-sm md:text-base items-center'>
                    {ctaBtn1.btnText}
                    <FaArrowRight />
                </div>
            </CTAButton>
            <CTAButton active={ctaBtn2.active} linkTo={ctaBtn2.linkTo}>
                {ctaBtn2.btnText}
            </CTAButton>
        </div>
      </div>
      <div className='flex w-full md:w-1/2 border-2 p-2 border-richblack-400'>
        <div className='w-[10%] flex flex-col justify-center text-center text-xs md:text-base font-inter text-richblack-500'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
        </div>
        <div className={`w-[90%] flex flex-col text-xs md:text-base font-mono ${code_color}`}>
            <TypeAnimation 
                sequence={[codeblock, 3000, ""]}
                repeat={Infinity}
                cursor={true}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block"
                    }
                }
                omitDeletionAnimation={true}
            />

        </div>
      </div>
      
    </div>
  )
}

export default CodeBlock
