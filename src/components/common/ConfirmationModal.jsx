import React from 'react'
import IconBtn from './IconBtn'
const ConfirmationModal = ({modalData}) => {
  return (
    <div className='relative z-10 flex justify-center items-center'>
      <div className='fixed z-50 inset-0 bg-opacity-90 transition-opacity overflow-y-auto bg-richblack-800 p-6 lg:p-10 flex justify-center items-center gap-3'>
        <div className='inset-0 max-w-maxContent p-6 rounded-lg lg:p-12 flex flex-col gap-3 bg-richblack-900'>
          <p className='text-richblack-5 font-inter text-xl font-semibold'>
              {modalData.heading}
          </p>

          <p className='text-richblack-100 font-inter text-sm'>
              {modalData.text}
          </p>

          <div className='flex flex-row justify-between'>
              <IconBtn 
                  onClick={modalData.btn1Handler}
                  text = {modalData.btn1Text}

              />
              <button onClick={modalData.btn2Handler}
                className='px-4 py-2 bg-richblack-800 text-richblack-5 hover:scale-95 transition-all duration-200'
              >
                  {modalData.btn2Text}
              </button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ConfirmationModal
