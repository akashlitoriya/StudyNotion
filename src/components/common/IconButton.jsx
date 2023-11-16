import React from 'react'
import {Icon} from 'react-icons'
const IconButton = ({
    text,
    onclick,
    children,
    buttonColor='bg-yellow-50',
    textColor = 'text-richblack-900',
    outline = false,
}) => {
   return (
    <button 
        className={`px-5 py-2 rounded-lg transition-all duration-200 hover:scale-95 ${buttonColor} flex items-center gap-2 ${textColor} font-semibold ${outline? 'border-[1px] border-yellow-50': ''}}`}
        onClick={onclick}
        >
            {
                children? (
                    <>
                        <span>{text}</span>
                        {children}
                    </>
                ):(
                    {text}
                )
            }
        
    </button>
  )
}

export default IconButton
