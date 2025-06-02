'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { IoCalendarOutline } from 'react-icons/io5'
import { RxAvatar } from 'react-icons/rx'
import { FaRegEdit } from 'react-icons/fa'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { deleteblog, getblogByid } from '@/lib/api/blog'
import { toast, ToastContainer } from 'react-toastify'

const Blogdetail = () => {
  const params = useParams()
  const blogId = params?.blogid as string

  const [data, setData] = useState<any>({})
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get blog data
        const result = await getblogByid(blogId)
        console.log(result)
        setData(result.data)

        // Decode JWT token to get user ID
        const token = localStorage.getItem('token')
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]))
          const extractedUserId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
          setUserId(extractedUserId)
        }
      } catch (error) {
        console.error('Error fetching blog or decoding token:', error)
      }
    }

    fetchData()
  }, [blogId])


  // delete blog
  const Deleteblog = async()=>{
    try{
           const result = await deleteblog(parseInt(blogId))
           if(result.status===200){
            toast.success('Deleted Sucessfully')
            router.push('/')
           }
    }
    catch(err){
         console.log(err)
    }
  }

  return (
    <div className=' bg-gray-700 text-neutral-100 py-4 w-full h-full lg:px-28 px-5 flex flex-col gap-y-5'>
      
      
      <ToastContainer/>
      {data &&(
              <div className='flex flex-col max-w-screen-xl mx-auto gap-y-5 items-center w-full justify-center'>
        
        {/* Title and Summary */}
        <div className='flex flex-col items-center justify-center gap-y-3 w-full'>
          <h1 className='text-3xl lg:text-4xl text-center font-bold font-serif'>
            {data.title}
          </h1>
          <small className='text-center max-w-[60%] flex items-center justify-center'>
            {data.summary}
          </small>
        </div>

        {/* Blog Image */}
        <div>
          <Image
            src={data.imageUrl}
            width={900}
            height={200}
            className='w-full bg-right shadow-sm h-[55vh] object-cover rounded-lg mx-auto'
            alt='Blog image'
          />
        </div>

        {/* Author and Date Info */}
        <div className='flex flex-row gap-x-2 py-2'>
          <div className='flex flex-row items-center text-sm gap-x-1'>
            <RxAvatar size={20} /> {data.userName} {console.log(data.userName)}
          </div>
          <div className='flex flex-row items-center text-sm gap-x-1'>
            <IoCalendarOutline size={20} /> {data.lastUpdated}
          </div>
        </div>

        {/* Blog Body */}
        <p className='text-justify md:text-base text-sm leading-relaxed hyphens-auto'
        dangerouslySetInnerHTML={{__html:data.body}}
        >
        </p>

        {/* Edit/Delete Buttons (if user owns the blog) */}
        {userId === data.userId && (
          <div className='flex flex-row gap-x-2'>
            <Link
              href={`/blogs/blogid/${data.id}`}
              className='py-2 px-2 flex flex-row gap-x-2 shadow-md items-center justify-center bg-blue-600 rounded-xl hover:scale-105 transition-all duration-200 hover:bg-blue-700 text-neutral-100'
            >
              <FaRegEdit size={20} /> Edit the blog
            </Link>
            <button
              className='py-2 px-2 flex flex-row gap-x-2 items-center shadow-md justify-center bg-red-600 rounded-xl hover:scale-105 transition-all duration-200 hover:bg-red-700 text-neutral-100'
            onClick={Deleteblog}
            >
              <MdOutlineDeleteForever size={20} /> Delete the blog
            </button>
          </div>
        )}
      </div>
      )}
      
    </div>
  )
}

export default Blogdetail
