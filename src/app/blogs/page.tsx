'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { RxAvatar } from 'react-icons/rx'
import { motion } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'
import Link from 'next/link'
import { getblogs } from '@/lib/api/blog'


const Blogs = () => {

    

    interface Blog {
        id: string
        title: string
        summary: string
        creator: string
        lastUpdated: string
        userName:string
        imageUrl:string
    }
     
    const [data, setData] = useState<Blog[]>([])
   const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE;

    useEffect(() => {

        const fetchData = async () => {
            const result = await getblogs()
            setData(result.data)

        }
        fetchData()
    }, [])

    return (
        <div className='md:h-[calc(100vh-10ch)] w-full md:px-28 px-2  items-center justify-center h-screen'>
            <h1 className='font-semibold text-3xl py-4 text-center font-serif'>
                Blog App
            </h1>

            <div className='grid lg:grid-cols-3 space-x-3 space-y-2  w-full grid-cols-1'>
                { data && data.map((item) => (
                    <Link href={`/blogs/${item.id}`} key={item.id}>
                        <motion.div
                            animate={{ opacity: 1, scale: 1 }}
                            initial={{ opacity: 0.8, scale: 0.8 }}
                            transition={{ duration: 0.3 }}

                            className=' transition-all  hover:float-right group ease-in-out duration-300  flex flex-col  overflow-hidden w-fit space-x-1  border-2 border-neutral-100 shadow-lg rounded-2xl'>

                            {/* Image Section */}
                            <Image src={`${apiBaseUrl}/${item.imageUrl}`} alt='nature-image' className='object-cover rounded-xl shadow-sm w-full' width={500} height={50} />

                            <div className='flex px-4 h-full w-full py-10 flex-col gap-y-4 '>
                                {/* category */}
                                <small className='px-1 py-1 bg-purple-100 text-blue-600 rounded-xl w-fit'>Category</small>

                                {/* blog-title part */}
                                <h1 className='font-bold text-3xl font-sans '>
                                    {item.title}
                                </h1>

                                {/* summary of the blog */}
                                <p className='text-lg font-base font-serif'>
                                    {item.summary.length>100?item.summary.slice(0,100)+"...":item.summary}
                                </p>
                                <div className='h-full flex flex-row justify-between items-center font-sans'>
                                    <div className='flex flex-row items-center gap-x-1'>
                                        <RxAvatar size={40} />
                                        <div className='flex justify-center flex-col gap-y-1'>
                                            <span className='font-semibold text-lg'>{item.userName}</span>
                                            <span className='font-extralight'>{item.lastUpdated}</span>
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

export default Blogs