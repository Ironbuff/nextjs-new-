'use client'

import React, { useState } from 'react'
import img from '../../../public/blog-j.png'
import Image from 'next/image'
import Link from 'next/link'
import { FaBars } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import { IoLogInOutline } from 'react-icons/io5'
import { GoSignIn } from 'react-icons/go'
import { MdCreateNewFolder } from 'react-icons/md'
import { SlLogout } from 'react-icons/sl'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/Store'



const Navbar = () => {
  
 

  const [mobilenav,setMobilenav]= useState(false)
  const logged = useSelector((state:RootState)=>state.auth.isloggedIn)
  
  
  const Navitems = logged?[
    {id:3, names:"CreatePost", links:"/create",icon:<MdCreateNewFolder size={20}/>},
    {id:4, names:"Log Out", links:"/logout", icon:<SlLogout size={20}/>}
  ]:[
      {id:1, names:"Log In", links:"/login", icon:<IoLogInOutline size={20}/>},
      {id:2, names:"Sign In", links:"/register",icon:<GoSignIn size={20}/>},
  ]

 
  
  
    return (
    <>
    <nav className='h-[10ch] bg-neutral-100 border-2 border-neutral-100 shadow-md flex flex-row items-center justify-between md:px-28 px-4 '>
        {/* Title Section */}
        <div className='flex flex-row items-center'>
            <Image src={img} alt='blog-app' className='h-[10vh] w-fit'/>
            <h1 className='text-neutral-800 md:text-3xl text-2xl font-bold tracking-wide'>
                My <span className='text-gray-500'> Blog</span>
            </h1>
        </div>

        {/* items-section */}
        <div className='md:flex hidden flex-row gap-x-3 text-base font-base text-neutral-200'>
            {Navitems.map((item,i)=>(

                <Link key={i} href={item.links} className='px-4 py-4 rounded-xl text-xl flex items-center justify-center flex-row gap-x-2 text-neutral-100 bg-neutral-300 border-2 border-neutral-200 shadow-sm hover:bg-neutral-500/50 '>{item.icon}{item.names}</Link>
                
            ))}
        </div>

        {/* Responsive Button */}
        <div className='flex md:hidden text-neutral-800' onClick={()=>setMobilenav(!mobilenav)}>
            {mobilenav?<FaX size={20}/>:<FaBars size={20}/>}
        </div>

    </nav>
    {/* Mobile Nav */}
    {
        mobilenav && (
            <div className='flex items-center justify-center w-full h-screen bg-neutral-200'>
                <div className='absolute top-8 z-5 right-4'>
                    <button onClick={()=>setMobilenav(!mobilenav)} >
                        <FaX size={21} className='font-bold'/>
                    </button>
                </div>
                <div className='flex flex-col w-full items-center justify-center gap-y-2'>
                {Navitems.map((item,i)=>(
                    <Link key={i} href={item.links} className='text-xl text-gray-800 font-semibold bg-gray-200 py-3 px-3 w-full flex items-center justify-center rounded-lg shadow-md hover:bg-gray-400 transition-all ease-in-out duration-300'>
                        {item.names}
                    </Link>
                ))}
                </div>
            </div>
        )
    }
    </>
  )
}

export default Navbar