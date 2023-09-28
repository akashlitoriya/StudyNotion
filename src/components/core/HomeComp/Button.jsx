import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkTo}) => {
  return (
    <Link to={linkTo} >
        <div className={`font-bold px-6 py-3 text-[16px] rounded-md text-center transition-all duration-200 hover:scale-95 ${active? "bg-yellow-50 text-black" : "bg-richblack-800"}`}>
            {children}
        </div>
    </Link>

  )
}

export default Button
