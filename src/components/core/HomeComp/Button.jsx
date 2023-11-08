import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkTo}) => {
  return (
    <Link to={linkTo} >
        <div className={`font-semibold md:font-bold px-4 md:px-6 py-2 md:py-3 text-sm lg:text-[16px] rounded-md text-center transition-all duration-200 hover:scale-95 ${active? "bg-yellow-50 text-black" : "bg-richblack-800"}`}>
            {children}
        </div>
    </Link>

  )
}

export default Button
