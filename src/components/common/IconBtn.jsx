import React from 'react'

const IconBtn = ({
    children,
    onClick,
    outline=false,
    text,
    disabled,
    type,
    customClasses
}) => {
  return (
    <button onClick={onClick} type={type} disabled={disabled} className='p-3 border-2 border-richblack-600 text-richblack-5'>
        {
            children?(
                <>
                    <span>
                        {text}
                    </span>
                    {children}
                </>
            ):(
                `${text}`
            )
        }
    </button>
  )
}

export default IconBtn
