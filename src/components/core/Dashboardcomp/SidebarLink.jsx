import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { useLocation, matchPath, NavLink } from 'react-router-dom';
const SidebarLink = ({link, iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <NavLink
        to={link.path} 
        className={`relative flex p-3 ${matchRoute(link.path)?"bg-yellow-800": ""}`}
        >
      <span className={`w-[4px] absolute top-0 left-0 h-full bg-yellow-200 ${matchRoute(link.path)? "opacity-100": "opacity-0"}`}></span>
      <div className='flex justify-center items-center gap-2 ml-6 sm:ml-14 lg:ml-4'>
        <Icon className= {`text-base ${matchRoute(link.path)? "text-yellow-100": "text-richblack-5"}`} />
        <p className={`font-inter text-base ${!matchRoute(link.path)?"text-richblack-5": "text-yellow-100"}`}>{link.name}</p>
      </div>
    </NavLink>
  )
}

export default SidebarLink
