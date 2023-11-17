import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboardcomp/Sidebar';


const Dashboard = () => {
    const{loading: profileLoading} = useSelector((state) => state.profile);
    const{loading: authLoading} = useSelector((state) => state.auth);

    if(profileLoading || authLoading){
        return (
            <div className='font-inter text-3xl text-richblack-5 mt-18'>Loading...</div>
        )
    }

  return (
    <div className='w-full flex'>
      <div className='hidden lg:block min-h-[calc(100vh-4rem)] bg-richblack-800'>
        <Sidebar />
      </div>
      <div className=' min-h-[calc(100vh-4rem)] w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
