import React from 'react'
import HighlightedText from '../HomeComp/HighlightedText';
import Button from '../HomeComp/Button'
const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

const GridContainer = () => {
  return (
    <div className='grid grid-cols-4 max-w-maxContent'>
      {
        LearningGridArray.map((card, index) => (
            <div key={index} className={`h-[250px]   
                ${card.order === -1 && "lg:col-span-2 bg-richblack-900"}
                ${card.order % 2 === 1 ? "bg-richblack-700 ": "bg-richblack-800 "}
                ${card.order === 3 && "lg:col-start-2 "}
                `}
            >
                {
                    card.order === -1? (
                        <div className='flex flex-col gap-6 px-5'>
                            <h1 className='font-inter text-xl font-semibold text-richblack-50'>World-Class Learning for <br></br><HighlightedText text = {"Anyone, Anywhere"} /></h1>
                            <p className='text-richblack-300 text-base'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                            <Button linkTo={'/signup'} active={true}> Learn More</Button>
                        </div>
                    )
                    :
                    (
                    <div className='p-5 flex flex-col gap-6'>
                        <h1 className='text-xl text-richblack-25 font-inter font-bold'>{card.heading}</h1>
                        <p className='text-base text-richblack-300 font-inter'>{card.description}</p>
                    </div>
                    )
                }
            </div>
        ))
      }
    </div>
  )
}

export default GridContainer
