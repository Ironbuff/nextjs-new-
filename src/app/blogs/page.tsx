'use client'
import Image from 'next/image'
import React from 'react'
import nature from '../../../public/Nature.jpg'
import { RxAvatar } from 'react-icons/rx'
import { motion } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'
import Link from 'next/link'





const blogs = () => {
 
 
    const DummyData = [
    { id: 1, title: "First-Blog", creator: "First", Description: "BlogDescription", summary: "It shows the First blog ever created in the website", date: "2025-03-04" },
    { id: 2, title: "Second-Blog", creator: "Second", Description: "BlogDescription", summary: "It shows the Second blog ever created in the website", date: "2025-03-05" },
    { id: 3, title: "Third-Blog", creator: "Third", Description: "BlogDescription", summary: "It shows the Third blog ever created in the website", date: "2025-03-06" }
]
 
    return (
    <div className='md:h-[calc(100vh-10ch)] w-full md:px-28 px-2  items-center justify-center h-screen'>
            <h1 className='font-semibold text-3xl py-4 text-center font-serif'>
                Blog App
            </h1>


            <div className='flex md:flex-row flex-col gap-y-3 gap-x-2 w-full flex-nowrap items-center justify-center'>
                {DummyData.map((item) => (
                   <Link href={`/blogs/${item.id}`} key={item.id}>
                    <motion.div
                        animate={{ opacity:1,scale:1 }}
                        initial={{ opacity:0.8 , scale:0.8 }}
                        transition={{ duration: 0.3 }}
                        
                        className=' transition-all hover:float-right group ease-in-out duration-300  flex flex-col  overflow-hidden w-fit space-x-1  border-2 border-neutral-100 shadow-lg rounded-2xl'>

                        {/* Image Section */}
                        <Image src={nature} alt='nature-image' className='object-cover rounded-xl shadow-sm w-full' width={500} height={50} />

                        <div className='flex px-4 h-full w-full py-10 flex-col gap-y-4 '>
                            {/* category */}
                            <small className='px-1 py-1 bg-purple-100 text-blue-600 rounded-xl w-fit'>Category</small>

                            {/* blog-title part */}
                            <h1 className='font-bold text-3xl font-sans '>
                                {item.title}
                            </h1>

                            {/* summary of the blog */}
                            <p className='text-lg font-base font-serif'>
                                {item.summary}
                            </p>
                            <div className='h-full flex flex-row justify-between items-center font-sans'>
                                <div className='flex flex-row items-center gap-x-1'>
                                    <RxAvatar size={40} />
                                    <div className='flex justify-center flex-col gap-y-1'>
                                        <span className='font-semibold text-lg'>{item.creator}</span>
                                        <span className='font-extralight'>{item.date}</span>
                                    </div>
                                </div>
                                <FaArrowUp size={25} className='group-hover:rotate-90 rotate-45 transition-all ease-in-out duration-300' />
                            </div>
                        </div>

                    </motion.div>

                </Link>
                ))}
            </div>
        </div>
  )
}

export default blogs