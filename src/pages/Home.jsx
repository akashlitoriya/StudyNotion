import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightedText from '../components/core/HomeComp/HighlightedText'
import CTAButton from '../components/core/HomeComp/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlock from '../components/core/HomeComp/CodeBlock'
import TimelineSection from '../components/core/HomeComp/TimelineSection'
import LearningLanguageSection from '../components/core/HomeComp/LearningLanguageSection'
import InstructorAndReview from '../components/core/HomeComp/InstructorAndReview'
import ExploreMore from '../components/core/HomeComp/ExploreMore'
const Home = () => {
  return (
    <div className='text-white mt-16'>
      {/* Section - 1 */}
      <div className='relative mx-auto w-11/12 flex flex-col justify-center items-center text-white gap-10'>
        <Link to="/signup">
            <div className='group bg-richblack-800 rounded-full px-5 py-2 hover:scale-95 transition-all duration-200 font-bold w-fit'>
                <div className='flex flex-row items-center gap-2 group-hover:bg-richblack-900 text-richblack-200'>
                    <p>Become a Instructor</p>
                    <FaArrowRight/>
                </div>
                
            </div>
        </Link>
        <div className='font-semibold text-4xl font-inter'>
            Empower your future with 
            <HighlightedText text = "Coding Skills"/>

        </div>
        <div className='font-inter text-base font-semibold text-richblack-300 max-w-[913px] text-center'>
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>
        <div className='flex gap-2'>
            <CTAButton active={true} linkTo={"/signup"}>
                Learn More
            </CTAButton>
            <CTAButton linkTo={"/signup"}>
                Book a demo
            </CTAButton>
        </div>
        <div className='shadow-blue-400 shadow-2xl max-w-[1035px]'>
          <video
            muted
            loop
            autoPlay
          >
            <source src={Banner} type='video/mp4' />
          </video>
        </div>
        
        {/* code Section -1  */}

        <div className='mt-28'>
          <CodeBlock 
            position={"lg:flex-row"}
            heading={
              <div className='font-semibold text-4xl font-inter'>
                Unlock your <HighlightedText text="coding potential" /><br></br>
                with our online courses
              </div>
            }
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctaBtn1={
              {
                active:true,
                linkTo:"/signup",
                btnText:"Try it yourself"
              }
            }
            ctaBtn2={
              {
                active:false,
                linkTo: "/login",
                btnText:"Learn More"
              }
            }
            codeblock={`<!DOCTYPE html>\n <html>\n <head>\n <title>Example</title> \n <link rel="stylesheet "href="styles.css">\n <body>\n <h1>How are you cutie</h1>\n <p>Welcome to my website</p>\n </body>\n </head>`}
            code_color={"text-yellow-25"}
          />
        </div>
        {/* Code Section -2  */}
        <div className='mt-28'>
          <CodeBlock 
            position={"lg:flex-row-reverse"}
            heading={
              <div className='font-semibold text-4xl font-inter'>
                Start <HighlightedText text="coding" /><br></br>
                <HighlightedText text="in seconds" />
              </div>
            }
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            ctaBtn1={
              {
                active:true,
                linkTo:"/signup",
                btnText:"Continue Learning"
              }
            }
            ctaBtn2={
              {
                active:false,
                linkTo: "/login",
                btnText:"Learn More"
              }
            }
            codeblock={`<!DOCTYPE html>\n <html>\n <head>\n <title>Example</title> \n <link rel="stylesheet "href="styles.css">\n <body>\n <h1>How are you cutie</h1>\n <p>Welcome to my website</p>\n </body>\n </head>`}
            code_color={"text-pink-300"}
          />
        </div>
        <ExploreMore />
      </div>

      {/*Section-2*/}
      <div className='bg-pure-greys-5 text-richblack-700 py-10'>
        <div className='homepage_bg h-[310px]'>
            <div className='w-11/12 max-w-maxContent flex justify-center items-center h-full mx-auto'>
              <div className='flex flex-row gap-8'>
                <CTAButton active= {true} linkTo={"/signup"}>
                  <div className='flex flex-row gap-3 items-center'>
                    Explore Full Catelog 
                    <FaArrowRight />
                  </div>
                </CTAButton>
                <CTAButton active= {false} linkTo={"/login"}>
                  <div className='flex flex-row gap-3 text-richblack-5'>
                    Learn More 
                    
                  </div>
                </CTAButton>
              </div>

            </div>
        </div>
        <div className='w-11/12 max-w-maxContent flex flex-col gap-24 justify-center items-center mx-auto my-[95px]'>
          <div className='flex flex-row gap-5 mx-auto'>
            <div className='text-4xl font-bold'>
              Get the skills you need for a 
              <HighlightedText text={"Job that is in demand"} />
            </div>
            <div className='flex flex-col gap-6 items-start font-inter'>
              <div className='text-base font-semibold text-richblack-700'>
              The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkTo={"/signup"}>Learn more</CTAButton>
            </div>
          </div>
          <TimelineSection />
          <LearningLanguageSection />
        </div>

      </div>

      {/* Section - 3 */}
      <div className='w-11/12 max-w-maxContent flex flex-col justify-center items-center mx-auto mt-16'>
            <InstructorAndReview />
      </div>
    </div>
  )
}

export default Home
