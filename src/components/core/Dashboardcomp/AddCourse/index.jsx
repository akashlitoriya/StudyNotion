import {BsFillLightningChargeFill} from 'react-icons/bs'
import {courseUploadTips} from '../../../../data/course-upload-tips'
import CourseInformation from './CourseInformation'
export default function AddCourse (){
    
    return (
        <div className="text-white font-3xl mt-14">
            <div className="w-11/12 mx-auto">
                <h1 className="text-richblack-25 font-bold font-inter text-3xl">Add Course</h1>
                <div className="grid grid-flow-col grid-cols-3 grid-rows-1 gap-10 lg:mt-6">
                    <div className=" col-span-2">
                        <CourseInformation />
                    </div>
                    <div className=" h-fit flex flex-col gap-3 lg:p-6 bg-richblack-800 rounded-lg border-[1px] border-richblack-700">

                        <div className='flex gap-1 items-center font-inter font-semibold text-lg text-richblack-5'>
                            <BsFillLightningChargeFill className='text-yellow-50'/>
                            Course Upload tips
                        </div>
                        <ul className='ml-4'>
                            {
                                courseUploadTips.map((item) => (
                                    <li key={item.id} className='list-disc text-xs text-richblack-5 font-inter font-medium mb-1'>{item.text}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}