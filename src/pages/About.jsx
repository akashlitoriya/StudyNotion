import React from 'react'
import HighlightedText from '../components/core/HomeComp/HighlightedText'
import about1 from "../assets/Images/aboutus1.webp"
import about2 from "../assets/Images/aboutus2.webp"
import about3 from "../assets/Images/aboutus3.webp"
import foundingStory from "../assets/Images/FoundingStory.png"
import InfoContainer from '../components/core/AboutComp/InfoContainer'
import GridContainer from '../components/core/AboutComp/GridContainer'
import ContactFormSection from '../components/core/AboutComp/ContactFormSection'

const About = () => {
  return (
    <div className='mt-14 p-4 mx-auto flex flex-col justify-center items-center gap-20'>
        {/* Section - 1 */}
        <section>
            <div className='flex flex-col justify-center items-center lg:mt-10 gap-10'>
                <h1 className='text-richblack-100 text-base md:text-xl font-semibold text-center font-inter'>About us</h1>
                <p className='text-richblack-5 font-bold text-2xl md:text-4xl text-center font-inter'>
                    Driving Innovation in Online Education for a <br></br><HighlightedText text={"Brighter Future"}/>
                </p>
                <p className='text-richblack-100 text-sm md:text-lg font-inter text-center lg:w-[800px]'>
                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
                <div className='flex flex-col md:flex-row gap-4 lg:mt-4'>
                    <img src={about1} alt='About section 1'/>
                    <img src={about2} alt="About section 2"/>
                    <img src={about3} alt="About section 3"/>
                </div>
            </div>
        </section>

        {/* Section-2 */}
        <section>
            <div>
            
                <p className='lg:w-[1200px] text-2xl md:text-3xl font-bold font-inter text-richblack-5 text-center'>We are passionate about revolutionizing the way we learn. Our innovative platform combines technology, expertise, and community to create an <HighlightedText text={" unparalleled educational experience."}/></p>
                
            </div>
        </section>

        {/*Section - 3*/}
        <section>
            <div className='flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 max-w-maxContent'>
                <div className='flex flex-col gap-3 md:gap-5 lg:w-1/2'>
                    <h1 className='text-2xl md:text-3xl text-brown-200 font-bold font-inter'>Our Founding Story</h1>
                    <p className='text-richblack-300 font-inter text-sm md:text-lg'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                    <p className='text-richblack-300 font-inter text-sm md:text-lg'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>
                <div>
                    <img src={foundingStory} alt='Founding story illustration'/>
                </div>
            </div>
        </section>

        {/*Section-4*/}
        <section>
            <div className='max-w-maxContent flex flex-col md:flex-row gap-6 md:gap-0 justify-evenly'>
                <div className='flex flex-col gap-3 md:gap-7 md:w-2/5'>
                    <h1 className='text-2xl md:text-3xl text-brown-300 font-inter font-bold'>Our Vision</h1>
                    <p className='text-richblack-300 text-sm md:text-lg font-inter'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>
                <div className='flex flex-col gap-3 md:gap-7 md:w-2/5'>
                    <h1 className='text-2xl md:text-3xl font-inter font-bold'><HighlightedText text={"Our Mission"} /></h1>
                    <p className='text-richblack-300 text-sm md:text-lg font-inter'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>

            </div>
        </section>

        {/*Section - 5*/}
        <InfoContainer />

        {/* Section - 6 grid */}
        <section>
            <GridContainer />
            <ContactFormSection />
        </section>
    </div>
  )
}

export default About
