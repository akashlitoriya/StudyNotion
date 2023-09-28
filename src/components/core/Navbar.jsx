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

    const [sublinks, setSublinks] = useState();
    const fetchSublinks = async() => {
        try{
            const result = await apiConnector('GET', category.CATEGORIES_API);
            console.log(result)
            setSublinks(result.data.data);
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
    <div className='h-14 border-b-[1px] border-b-richblack-25 flex items-center'>
        <div className='w-11/12 max-w-maxContent flex flex-row justify-between items-center mx-auto'>
            {/* Logo  */}
            <Link to='/'>
                <img src={logo} alt='Logo' width={160} height={32}/>
            </Link>

            {/* NavLinks  */}
            <nav>
                <ul className='flex flex-row gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((item, index) => (
                            <li key={index}>
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

            <div className='flex gap-x-4'>
                    {
                        user&&user.accountType !== 'Instructor' && (
                            <Link to='/dashboard/cart' className='relative'>
                                <AiOutlineShoppingCart />
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
                            <Link to='/login'>
                                <button className='border-[1px] border-richblack-600 text-richblack-5 px-4 py-2 rounded-lg bg-richblack-800'>Login</button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to= '/signup'>
                                <button className='border-[1px] border-richblack-600 text-richblack-5 px-4 py-2 rounded-lg bg-richblack-800'>Sign Up</button>
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
  )
}

export default Navbar
