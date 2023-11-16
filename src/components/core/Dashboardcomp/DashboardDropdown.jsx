import React from 'react'
import {useState} from 'react';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { sidebarLinks } from '../../../data/dashboard-links';
import { useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
const DashboardDropdown = () => {
    const[isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {user} = useSelector((state) => state.profile);
    
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

  return (
    <div className='text-richblack-5 w-full flex flex-col gap-3 items-center justify-center'>
      <div className='flex flex-row gap-3 items-center' onClick={toggleDropdown}>
        <p>Dashboard</p>
        <IoIosArrowDropdownCircle className={`text-lg transition-all duration-200 ${!isDropdownOpen? "rotate-0": "rotate-180"}`}/>
      </div>
      {
        isDropdownOpen && (
            <div className='w-full text-center'>
                {
                    sidebarLinks.map((item) => {
                        if(item.type && item.type !== user.accountType) return null;
                        return (
                            <SidebarLink link={item} iconName={item.icon} key={item.id}/>
                        )
                    })
                }
            </div>
        )
      }
    </div>
  )
}

export default DashboardDropdown
