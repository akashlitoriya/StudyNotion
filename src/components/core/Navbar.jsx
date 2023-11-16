import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import ProfileDropdown from './Auth/ProfileDropdown'
import {category} from '../../services/apis'
import {apiConnector} from '../../services/apiConnector'
import {IoIosArrowDropdownCircle} from 'react-icons/io'
import { getAllCategories } from '../../services/operations/categoryAPI'
import DashboardDropdown from './Dashboardcomp/DashboardDropdown'

const ssublinks = [
    {
        title: "Python",
        link: '/python'
    },
    {
        title: "Web Development",
        link: '/webdevelopment'
    }
]
const Navbar = () => {
    const {token} = useSelector((state)=> state.auth);
    const {totalItems} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.profile);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [sublinks, setSublinks] = useState();
    const fetchSublinks = async() => {
        try{
            const result = await getAllCategories();
            setSublinks(result);
        }catch(err){
            console.log("Could Not fetch categories")
        }

    }
    useEffect(()=> {
        fetchSublinks();
    },[])

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }
  return (
    <div className='h-14 z-20 w-full border-b-[1px] border-b-richblack-25 flex items-center fixed top-0 left-0 bg-richblack-800'>
        <div className='w-11/12 h-full max-w-maxContent flex flex-row justify-between items-center mx-auto'>
            {/* Hamburger Icon  */}
            <div className='flex lg:hidden flex-col justify-center items-center z-50 relative cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span className={`w-6 h-[3px] bg-richblack-5 block  transition-all duration-300 absolute top-0 left-0 ${isMenuOpen? "rotate-45 translate-y-0": "rotate-0 -translate-y-2"}`}></span>
                <span className={`w-6 h-[3px] bg-richblack-5 block ${isMenuOpen? "opacity-0" : " opacity-100"} transition-all duration-300`}></span>
                <span className={`w-6 h-[3px] bg-richblack-5 block transition-all duration-300 absolute top-0 left-0 ${isMenuOpen? "-rotate-45 translate-y-0" : "rotate-0 translate-y-2"}`}></span>
            </div>
            {/* Logo  */}
            <Link to='/'>
                <img src={logo} alt='Logo' width={160} height={32}/>
            </Link>

            {/* NavLinks  */}
            <div className={`flex flex-col-reverse min-h-screen lg:min-h-fit w-2/3  bg-richblack-800 lg:bg-transparent z-30 justify-center lg:justify-between  lg:flex-row items-center gap-y-6 lg:gap-y-0 transition-all duration-300 ${isMenuOpen? "fixed lg:static top-0 left-0" : "fixed lg:static top-0 left-0 -translate-x-full lg:-translate-x-0"}`}>
                <nav>
                    <ul className='flex flex-col items-center lg:items-start lg:flex-row gap-x-0 lg:gap-x-6 gap-y-4 lg:gap-y-0 text-richblack-25'>
                        {
                            NavbarLinks.map((item, index) => (
                                <li key={index} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    {item?.title === "Catalog"? (
                                        <div className='relative flex items-center gap-2 group'>
                                            <p>Catelog</p>
                                            <IoIosArrowDropdownCircle />
                                            <div className='invisible absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[30%] bg-richblack-5 transition-all duration-200 opacity-0 group-hover:visible group-hover:opacity-100 lg:w-[300px] p-5 flex flex-col jus rounded-lg z-30'>
                                                <div className='h-6 w-6 bg-richblack-5 rotate-45 absolute left-[55%] top-0 translate-y-[-25%]'>
                                                </div>
                                                {
                                                    ssublinks.map((item, index) => (
                                                        <Link to={`${item.link}`} key={index} className='text-richblack-800 w-full hover:bg-richblack-25 text-center px-3 py-2 font-semibold transition-all duration-200'>
                                                            {item.title}
                                                        </Link>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    )
                                        
                                    :
                                        <Link to={item?.path}>
                                            <p className={`${matchRoute(item.path)? "text-yellow-25": "text-richblue-25"}`}>{item?.title}</p>
                                        </Link>
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>


                {/* Dashboard dropdown  */}
                {
                    user && (
                        <div className='w-full lg:hidden border-b-2 border-richblack-5 pb-5'>
                            <DashboardDropdown />
                        </div>
                    )
                }

                <div className='w-full lg:w-fit flex flex-col items-center lg:flex-row gap-x-0 gap-y-4 lg:gap-y-0 lg:gap-x-4 border-b-2 lg:border-b-0 border-richblack-100 pb-4 lg:pb-0'>
                    {
                        user&&user.accountType !== 'Instructor' && (
                            <Link to='/dashboard/cart' className='relative' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <AiOutlineShoppingCart className='text-richblack-5 text-xl'/>
                                {
                                    totalItems > 0 && (
                                        <span>{totalItems}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to='/login' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <button className='border-[1px] border-richblack-600 text-richblack-5 min-w-[200px] lg:min-w-fit px-4 py-2 rounded-lg bg-richblack-800'>Login</button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to= '/signup' onClick={()=>setIsMenuOpen(!isMenuOpen)}>
                                <button className='border-[1px] border-richblack-600 text-richblack-5 min-w-[200px] lg:min-w-fit px-4 py-2 rounded-lg bg-richblack-800'>Sign Up</button>
                            </Link>
                        )
                    }
                    {
                        token !== null && (
                            <ProfileDropdown />
                        )
                    }
                </div>
            </div>

        </div>
      
    </div>
  )
}

export default Navbar
