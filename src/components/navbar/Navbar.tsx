'use client'

import React, { useEffect, useState } from 'react'
import img from '../../../public/blog-j.png'
import Image from 'next/image'
import Link from 'next/link'
import { FaBars } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import { IoLogInOutline } from 'react-icons/io5'
import { GoSignIn } from 'react-icons/go'
import { MdCreateNewFolder } from 'react-icons/md'
import { SlLogout } from 'react-icons/sl'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store/Store'
import { useRouter } from 'next/navigation'
import { authActions } from '@/store/auth'
import { toast } from 'react-toastify'
import { refreshAccessToken } from '@/lib/api/auth'




const Navbar = () => {



    const [mobilenav, setMobilenav] = useState(false)
    const logged = useSelector((state: RootState) => state.auth.isloggedIn)
    const router = useRouter()
    const dispatch = useDispatch()



    const fetch = () => {
        const interval = setInterval(async () => {
            const accessTokenExpires = localStorage.getItem("acessTokenExpiresIn");

            if (accessTokenExpires && new Date(accessTokenExpires).getTime() <= Date.now()) {
                try {
                    await refreshAccessToken(); // Renew access token
                    console.log("Access token refreshed successfully.");
                } catch (error) {
                    console.error("Token refresh failed, logging out...");
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("acessTokenExpiresIn");
                    dispatch(authActions.logout());
                    router.push("/login");
                    console.log(error)
                }
            }
        }, 60000); // Check every 1 min

        return () => clearInterval(interval);
    }

    const loginCheck = () => {
        if (localStorage.getItem('token')) {
            dispatch(authActions.loggin())
        }
        else {
            dispatch(authActions.logout())
        }
    }


    useEffect(() => {

        loginCheck();

        fetch();

    }, [])







    const handlelogout = async () => {
        try {
            dispatch(authActions.logout())
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('acessTokenExpiresIn')
            toast.success('Logged Out Sucessfully')
            router.push('/')

        }
        catch (err) {
            console.log(err)
        }
    }

    const Navitems = logged ? [
        { id: 3, names: "CreatePost", links: "/create", icon: <MdCreateNewFolder size={20} /> },
        { id: 4, names: "Log Out", links: "/logout", action: true, icon: <SlLogout size={20} /> }
    ] : [
        { id: 1, names: "Log In", links: "/login", icon: <IoLogInOutline size={20} /> },
        { id: 2, names: "Sign In", links: "/register", icon: <GoSignIn size={20} /> },
    ]




    return (
        <>
            <nav className={'h-[10ch] bg-neutral-100 border-2 border-neutral-100 shadow-md flex flex-row items-center justify-between lg:px-28 px-3'}>


                {/* Title Section */}
                <Link href={'/'} className='flex flex-row items-center'>
                    <Image src={img} alt='blog-app' className='h-[10vh] w-fit' />
                    <h1 className='text-neutral-800 md:text-3xl text-2xl font-bold tracking-wide'>
                        My <span className='text-gray-500'> Blog</span>
                    </h1>
                </Link>

                {/* items-section */}
                <div className='md:flex hidden flex-row gap-x-3 text-base font-base text-neutral-200'>
                    {Navitems.map((item, i) =>
                        item.action ? (
                            <button key={i} onClick={handlelogout} className='px-4 py-4 rounded-xl text-xl flex items-center justify-center flex-row gap-x-2 text-neutral-100 bg-neutral-300 border-2 border-neutral-200 shadow-sm hover:bg-neutral-500/50 '>
                                {item.icon}{item.names}
                            </button>
                        ) : (
                            <Link key={i}
                                href={item.links}
                                className='px-4 py-4 rounded-xl text-xl flex items-center justify-center flex-row gap-x-2 text-neutral-100 bg-neutral-300 border-2 border-neutral-200 shadow-sm hover:bg-neutral-500/50 '>
                                {item.icon}{item.names}
                            </Link>

                        )

                    )}
                </div>

                {/* Responsive Button */}
                <div className='flex md:hidden text-neutral-800' onClick={() => setMobilenav(!mobilenav)}>
                    {mobilenav ? <FaX size={20} /> : <FaBars size={20} />}
                </div>

            </nav>
            {/* Mobile Nav */}
            {
                mobilenav && (
                    <div className='flex items-center justify-center w-full h-screen bg-neutral-100'>

                        <div className='flex flex-col w-full items-center justify-center gap-y-2'>
                            {Navitems.map((item, i) =>
                                item.action ? (
                                    <button key={i} onClick={() => {
                                        handlelogout();
                                        setMobilenav(false)
                                    }}
                                        className='text-xl text-gray-800 font-semibold bg-gray-200 py-3 px-3 w-full flex items-center justify-center rounded-lg shadow-md hover:bg-gray-400 transition-all ease-in-out duration-300'>
                                        {item.names}
                                    </button>
                                ) : (
                                    <Link key={i} onClick={() => setMobilenav(false)} href={item.links} className='text-xl text-gray-800 font-semibold bg-gray-200 py-3 px-3 w-full flex items-center justify-center rounded-lg shadow-md hover:bg-gray-400 transition-all ease-in-out duration-300'>
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