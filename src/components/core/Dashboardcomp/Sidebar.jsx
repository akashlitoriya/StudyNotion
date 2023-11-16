import React, { useState } from 'react'
import {logout} from '../../../services/operations/authAPI'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import {VscSignOut} from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {
    const {user,loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[confirmModal, setConfirmModal] = useState(null);
    
    if(authLoading || profileLoading){
        return (
            <div className='font-inter text-3xl text-richblack-5'>Loading....</div>
        )
    }
  return (
    <div className='mt-14'>
      <div className='lg:w-[222px]'>
        <div>
            {
                sidebarLinks.map((item, index) => {
                    if(item.type && item.type !== user.accountType) return null;
                    return (
                        <SidebarLink link={item} iconName={item.icon} key={item.id}/>
                    )
                })
            }
        </div>

        <div className='w-full h-[1px] bg-richblack-600'></div>

        <div>
            <SidebarLink 
              link = {{name: "Setting", path: "/dashboard/setting"}}
              iconName={"VscSettingsGear"}
            />
            <button onClick={()=>setConfirmModal({
                  heading:"Are you Sure?",
                  text:"Clicking yes will logout you from platform",
                  btn1Text:"Yes",
                  btn2Text:"Cancel",
                  btn1Handler: ()=>dispatch(logout(navigate)),
                  btn2Handler: ()=>setConfirmModal(null)
                })}
            >
              <div className='flex flex-row items-center justify-center text-richblack-5 text-base font-inter lg:ml-4 p-3 gap-2'>
                <VscSignOut  className='text-base'/>
                <span>Logout</span>
              </div>
            </button>
        </div>

      </div>
                {
                  confirmModal && (
                    <ConfirmationModal modalData={confirmModal} />
                  )
                }

    </div>
  )
}

export default Sidebar
