import React,{useState} from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import contactCodes from '../../../data/countrycode.json'
import PasswordReset from './PasswordReset';
import {RiDeleteBin6Line} from 'react-icons/ri'
import { settingsEndpoints } from '../../../services/apis';
import { apiConnector } from '../../../services/apiConnector';
import {setUser} from '../../../slices/profileSlice'
import {setToken} from '../../../slices/authSlice'
import toast from 'react-hot-toast';
import ConfirmationModal from '../../common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
const ProfileSetting = () => {
    const {user} = useSelector((state) => state.profile);
    const [profilePicture, setProfilePicture] = useState();
    const {register, handleSubmit, reset} = useForm();
    const [picUpdateBtn, setPicUpdateBtn] = useState(false);
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    

    function deleteProfileHandler(navigate){
      return async()=>{
        try{
          const response = await apiConnector("DELETE", settingsEndpoints.DELETE_PROFILE_API,{},{"Authorization":`Bearer ${token}`});
          dispatch(setUser(null));
          dispatch(setToken(null));
          localStorage.clear();
          
          navigate("/signup");
        }catch(err){
          console.log(err.message);
        }
      }
    }

    const profileUpdateHandler = async(data) => {
      try{
        //toast.loading("Updating Profile")
        const response = apiConnector("PUT", settingsEndpoints.UPDATE_PROFILE_API, data,{"Authorization":`Bearer ${token}`});

        if((await response).data.success){
          toast.success("Profile Updated")
          reset({
            gender:null,
            contactNumber:null,
            about:null,
            phoneNumber:null,
            dateOfBirth: null,
          })
        }else{
          toast.error("Failed to update profile")
        }
        
      }catch(err){
        
        toast.error("Failed to update profile")
      }
    }

    

    const profilePictureUpdateHandler = async(e) => {
      e.preventDefault();
      const files = new FormData();
      files.append("displayPicture", profilePicture);
      const response = apiConnector("PUT", settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,files,{"Authorization":`Bearer ${token}`});
      console.log((await response).data.data);
      dispatch(setUser((await response).data.data));
      localStorage.setItem('user',JSON.stringify( (await response).data.data));
      setProfilePicture(null);
      setPicUpdateBtn(false);
      console.log(await response);
    }

    const deleteModal = {
      heading : "Delete Account",
      text : "This action can't be undone",
      btn1Text : "Delete",
      btn2Text: "Cancel",
      btn2Handler: () => setShowDeleteModal(false),
      btn1Handler: deleteProfileHandler(navigate)
    }

    
  return (
    <div>
      <h1 className='text-2xl font-bold font-inter text-richblack-5 lg:ml-8 lg:mt-8'>Edit Profile</h1>
      <div className='lg:p-8 bg-richblack-800 w-10/12 mx-auto rounded-xl flex items-center lg:gap-5 lg:my-6'>
        <img src = {user.image} alt='Profile' className='w-[78px] h-[78px] rounded-full'/>
        <div className='flex flex-col gap-3'>
            <p className='text-richblack-25 text-lg font-inter font-semibold'>Change Profile Picture</p>
            <div className='flex gap-5'>
                <button
                    onClick={() => setPicUpdateBtn(true)}
                    className='p-3 text-richblack-900 bg-yellow-50 font-semibold rounded-lg hover:scale-95 transition-all duration-150'
                >
                    Change
                </button>
                
            </div>
            {
              picUpdateBtn && (
                <form onSubmit={ profilePictureUpdateHandler} className='flex flex-row gap-3'>
                  <input type='file' className='bg-richblack-700 p-2 text-richblack-25 font-inter rounded-lg' onChange={(e) => setProfilePicture(e.target.files[0])}/>
                  <div className='flex flex-row gap-3'>
                    <button type='submit' className='px-5 py-3 bg-yellow-50 text-richblack-900 rounded-lg transition-all duration-150 hover:scale-95 font-semibold'>Save</button>
                    <button type='reset' onClick={()=>setPicUpdateBtn(false)} className='p-3 text-richblack-25 bg-richblack-700 font-semibold rounded-lg hover:scale-95 transition-all duration-150'>Cancel</button>
                  </div>
                </form>
              )
            }
            
        </div>
      </div>

      <div className='lg:p-8 bg-richblack-800 w-10/12 mx-auto rounded-xl lg:gap-5 lg:my-6'>
        <p className='text-richblack-50 text-lg font-inter font-semibold'>Personal Information</p>
        
        <form onSubmit={handleSubmit(profileUpdateHandler)}>
          <div className='lg:p-4 grid grid-cols-2 lg:gap-x-8 lg:gap-y-8'>

            <div className='flex flex-col gap-3'>
              <label htmlFor='About' className='text-base text-richblack-100 font-inter font-semibold'>About</label>
              <input 
                type='text'
                name='about'
                id='about'
                placeholder='Write something about yourself'
                className='p-3 bg-richblack-700 text-richblack-5 rounded-lg border-b-2 border-richblack-600'
                {...register("about")}
              />
            </div>
            <div className='flex flex-col gap-3'>
              <label htmlFor='gender' className='text-base text-richblack-100 font-inter font-semibold'>Gender</label>
              <select 
                {...register('gender')}
                className='bg-richblack-700 text-richblack-5 p-3 rounded-lg border-b-2 border-richblack-600'
              >
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                <option value={"Other"}>Other</option>
              </select>
            </div>

            <div  className='flex flex-col gap-3'>
              <label htmlFor='phoneNumber' className='text-base text-richblack-100 font-inter font-semibold'>Phone Number</label>
              <div className='flex flex-row gap-3'>
                <select 
                  {...register('phoneNumber')}
                  className='p-3 bg-richblack-700 rounded-lg border-b-2 border-richblack-600 text-richblack-5 w-[80px]'
                >
                  {
                      contactCodes.map((item, index) =>(
                        <option value={item.code} key={index}>{item.code} - {item.country}</option>
                      ))
                  }
                </select>
                
                <input
                  type='number'
                  {...register('contactNumber',
                                  { minLength:8,
                                   maxLength:10
                                  }
                              )
                  }
                  placeholder='Enter Phone Number'
                  className='bg-richblack-700 text-richblack-5 p-3 border-b-2 border-richblack-600 rounded-lg w-full'
                />
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <label htmlFor='dateOfBirth' className='text-base text-richblack-100 font-inter font-semibold'> Date of birth</label>
              <input
                type='text'
                placeholder='dd/mm/yyyy'
                className='p-3 bg-richblack-700 text-richblack-5 rounded-lg border-b-2 border-richblack-600'
                {...register('dateOfBirth')}
              />
            </div>
            <div className='flex gap-3'>
              <button type='submit' className='py-3 px-5 bg-yellow-100 text-richblack-800 font-inter font-semibold rounded-md transition-all duration-200 hover:scale-95'>Save</button>
              <button type='reset' className='py-3 px-5 bg-richblack-600 text-richblack-100 font-inter font-semibold rounded-md transition-all duration-200 hover:scale-95' >Cancel</button>
            </div>
          </div>
        </form>

      </div>

      <div className='lg:p-8 bg-richblack-800 w-10/12 mx-auto rounded-xl lg:gap-5 lg:my-6'>
            <PasswordReset />
      </div>
      <div className='lg:p-8 bg-pink-900 border-[1px] border-pink-700 w-10/12 mx-auto rounded-xl lg:gap-5 lg:my-6'>
            <div className='flex gap-6'>
                  <div className='bg-pink-700 p-3 rounded-full w-[50px] h-[50px]'>
                     <RiDeleteBin6Line className='text-pink-200 text-2xl'/>
                  </div>
                  <div className='flex flex-col gap-3'>
                    <p className='text-lg font-inter font-semibold text-richblack-25'>Delete Account</p>
                    <div>
                      <p className='text-pink-25 font-inter text-sm'>Would you like to delete account?</p>
                      <p className='text-pink-25 font-inter text-sm'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                    </div>
                    <p className='text-pink-300 italic text-sm font-inter cursor-pointer' onClick={() =>setShowDeleteModal(true)}>I want to delete my account.</p>
                  </div>
            </div>
      </div>

      {
        showDeleteModal && (
          <ConfirmationModal modalData={
            deleteModal
          }/>
        )
      }
    </div>
  )
}

export default ProfileSetting
