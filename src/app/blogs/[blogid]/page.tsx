'use client'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
import { IoCalendarOutline } from 'react-icons/io5'
import { RxAvatar } from 'react-icons/rx'
import img from '../../../../public/Meditation.jpg'
import { FaRegEdit } from 'react-icons/fa'
import { MdOutlineDeleteForever } from 'react-icons/md'
import Link from 'next/link'

const Blogdetail = () => {
  const router = useParams()
  console.log({ router })
  return (
    <div className='lg:h-[calc(100vh-10ch)]  bg-gray-700 text-neutral-100 py-4 w-full h-full lg:px-28 px-5 flex flex-col gap-y-5'>
      
     <div className='flex flex-col max-w-screen-xl mx-auto gap-y-5 items-center w-full justify-center'>
      {/* top heading title */}
      <div className='flex flex-col items-center justify-center gap-y-3 w-full'>
        <h1 className='text-3xl lg:text-4xl text-center font-bold font-serif'>
          Mediation Enrichs Harmony
        </h1>
        <small className='text-center max-w-[60%] flex items-center justify-center '>
          Meditation is a mental exercise that trains attention and awareness. It involves focusing or clearing your mind using a combination of mental and physical techniques.
        </small>
      </div>
      <div>
        
      {/* Image Section */}
      <div>
        <Image src={img} width={900} height={200} className='w-full bg-right shadow-sm h-[55vh] object-cover rounded-lg mx-auto' alt='dummy img'/>
      </div>

      {/* creator Info */}
      <div className='flex flex-row gap-x-2 py-2'> 
        <div className='flex flex-row  items-center text-sm justify-center gap-x-1'>
          <RxAvatar size={20} /> Francis Saint
        </div>
        <div className='flex flex-row  items-center text-sm justify-center gap-x-1'>
          <IoCalendarOutline size={20} /> 2025-02-03
        </div>
      </div> 


       {/*Description Part */}
        <p className='text-justify md:text-base text-sm overflow-hidden  leading-relaxed hyphens-auto'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore harum consequatur aspernatur quas? Nobis, quis? Eius ex reiciendis veritatis, optio omnis velit tenetur, neque autem blanditiis aliquid fugiat dolor tempore?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ex, ducimus dicta voluptatum nostrum ab temporibus, numquam aliquid ea odit eos suscipit dolorem! Corporis adipisci ad expedita. Et, ipsam ducimus.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt earum, nisi architecto, dolores vitae culpa quas repudiandae dolorem explicabo illo ex. Non voluptates quod officia assumenda pariatur perferendis vero aliquam?
        </p>
      </div>
      
      {/* changing the Blog */}
      <div className='flex flex-row gap-x-2'>
        <Link href={'/blogs/blogid/1'} className='py-2 flex flex-row gap-x-2 shadow-md items-center justify-center px-2 bg-blue-600 rounded-xl hover:scale-105 transition-all ease-in-out duration-200 hover:bg-blue-700 text-neutral-100'>
            <FaRegEdit size={20} /> Edit the blog
        </Link>
        <button className='py-2 flex flex-row gap-x-2 items-center shadow-md justify-center px-2 bg-red-600 rounded-xl hover:scale-105 transition-all ease-in-out duration-200 hover:bg-red-700 text-neutral-100'>
           <MdOutlineDeleteForever size={20} /> Delete the blog
        </button>
      </div>
     </div>

    </div>

  )
}

export default Blogdetail 