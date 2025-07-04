'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { IoCalendarOutline } from 'react-icons/io5'
import { RxAvatar } from 'react-icons/rx'
import { FaRegEdit, FaThumbsDown, FaThumbsUp, FaUser, FaUserCircle } from 'react-icons/fa'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { deleteblog, getblogByid, reactOnBlog } from '@/lib/api/blog'
import { toast, ToastContainer } from 'react-toastify'
import Comment from '../../comment/page'
import { BiDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";

const Blogdetail = () => {
  const params = useParams()
  const blogId = params?.blogid as string

  const [data, setData] = useState<any>({})
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE;

  
  
    const fetchData = async () => {
      try {
        // Get blog data
        const result = await getblogByid(blogId)
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
  
  
    
  useEffect(() => {
    
    fetchData();
  
  }, [])
  
  
  //reaction icon
  const handlereaction = async (blogId:string, reaction:1|-1, userId:string) => {
    try {
      const result = await reactOnBlog({ blogId, reaction, userId });
      if (result.status === 200) {
        
        fetchData()
      } else {
        toast.error("Unable to react to Blog");
      }
    } catch (error) {
      console.log(error)
      toast.error("Please Login to share reaction")
    }
  }
  


  
  

  // delete blog
  const Deleteblog = async () => {
    try {
      const result = await deleteblog(parseInt(blogId))
      if (result.status === 200) {
        toast.success('Deleted Sucessfully')
        router.push('/')
      }
    }
    catch (err) {
      console.log(err)
    }
  }


 

  

  return (
    <div className=' bg-neutral-800 text-neutral-100 py-4 w-full h-full lg:px-28 px-5 flex flex-col gap-y-5'>


      <ToastContainer />
      {data && (
        <div className='flex flex-col max-w-screen-lg mx-auto gap-y-5 items-center w-full justify-center'>

          {/* Title and Summary */}
          <div className='flex flex-col items-center justify-center gap-y-3 w-full'>
            <h1 className='text-4xl tracking-wide lg:text-5xl text-center font-bold font-serif'>
              {data.title}
            </h1>
            <p className='text-center max-w-[80%] flex items-center justify-center m'>
              {data.summary}
            </p>
          </div>

          {/* Blog Image */}
          <div>
            <Image
              src={`${apiBaseUrl}/${data.imageUrl}`}
              width={720}
              height={300}
              className='w-full shadow-xl bg-right  h-[70vh] object-cover rounded-lg mx-auto'
              alt='Blog image'
            />
          </div>

          {/* Author and Date Info */}
          <div className='flex flex-row  items-center lg:w-[90%] w-full justify-between  gap-x-5'>
            <div className='flex flex-row  items-center text-sm gap-x-2'>
              <span className='p-2 border rounded-xl  border-neutral-700 bg-neutral-700 shadow-sm'>
              <FaUser  size={18} className='shadow-sm  text-neutral-300 rounded-xl ' /> 
              </span>
              {data.userName}
            </div>
            <div className='flex flex-row items-center text-sm gap-x-1'>
              <IoCalendarOutline size={20} /> {data.lastUpdated}
            </div>
          </div>

          {/* Blog Body */}
          <p className='text-justify md:text-base text-base leading-relaxed hyphens-auto'
            dangerouslySetInnerHTML={{ __html: data.body }}
          >
          </p>


          <div className='flex flex-row w-full  justify-between items-center '>
            <div className='flex flex-row gap-x-3'>
              <button onClick={() => handlereaction(data.id, 1, data.userId)} className='cursor-pointer flex flex-row gap-x-2 rounded-md p-2 border bg-neutral-700 border-neutral-700  '>
                <span>
                  {data.likeCount}
                </span>
                  <FaThumbsUp  className='hover:text-blue-600 hover:scale-105 transition-all ease-in-out' size={22} />
              </button>
              <button onClick={() => handlereaction(data.id, -1, data.userId)} className='cursor-pointer border border-neutral-700 bg-neutral-700 rounded-md p-2 flex flex-row gap-x-2 '>
                <span>
                  {data.dislikeCount}
                </span>
                 <FaThumbsDown className='hover:text-red-600 hover:scale-105 transition-all ease-in-out' size={22} />
              </button>
            </div>
            {/* Edit/Delete Buttons (if user owns the blog) */}
            {userId === data.userId && (
              <div className='flex flex-row gap-x-2'>
                <Link
                  href={`/blogs/blogid/${data.id}`}
                  className='py-2 px-2 flex flex-row gap-x-2 lg:text-lg text-sm shadow-md items-center justify-center bg-blue-600 rounded-xl hover:scale-105 transition-all duration-200 hover:bg-blue-700 text-neutral-100'
                >
                  <FaRegEdit size={20} /> Edit the blog
                </Link>
                <button
                  className='py-2 px-2 flex flex-row gap-x-2 lg:text-lg text-sm items-center shadow-md justify-center bg-red-600 rounded-xl hover:scale-105 transition-all duration-200 hover:bg-red-700 text-neutral-100'
                  onClick={Deleteblog}
                >
                  <MdOutlineDeleteForever size={20} /> Delete the blog
                </button>
              </div>
            )}

          </div>

          <Comment blogId={blogId} />
        </div>
      )}

    </div>
  )
}

export default Blogdetail
