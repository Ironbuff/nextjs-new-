'use client'

import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
const CreatePost = () => {
  
  const [title,setTitle] = useState('')
  const[description,setDescription] = useState('')
  const[summary,setSummary] = useState('')
  const[date,setDate]= useState('')
  const edior = useRef(null)
  
  const Addblog = async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
   try{
      const formdata = new FormData()
      formdata.set('title',title)
      formdata.set('description',description)
      formdata.set('summary',summary)
      formdata.set('date',date)

      console.log(formdata)
   }
   catch(err){
    console.log(err)
   }


  }
  
  
    return (
    <div className='flex flex-col gap-y-4 bg-gray-100 items-center justify-center h-[calc(100vh-10ch)] w-full'>
        <div className='flex items-center justify-center'>
            <h1 className='text-4xl font-bold  text-neutral-700 font-sans'>Add Blog</h1>
        </div>
        <div className='w-[50%]'>
            <form onSubmit={Addblog} className='flex flex-col gap-y-3 w-full border-2 bg-neutral-50  border-neutral-200 rounded-2xl shadow-sm  p-7'>
                {/* title  Part*/}
                <div className='flex flex-col space-y-2'>
                    <label htmlFor='title' className='text-lg font-semibold tracking-wide '>
                        Title:
                    </label>
                    <div className='border-2 border-neutral-200 shadow-sm p-2 max-w-full rounded-lg focus:ring-2 focus:ring-red-600'>
                         <input type='text' 
                         value={title}
                         onChange={(e)=>setTitle(e.target.value)}
                          placeholder='Enter the title of Blog' className='outline-none bg-transparent'/>
                    </div>  
                </div>
              {/* Description Part*/}
                <div className='flex flex-col space-y-2'>
                    <label htmlFor='body' className='text-lg font-semibold tracking-wide '>
                        Description:
                    </label>
                    <div className='border-2 border-neutral-200  shdaow-sm p-2 max-w-full rounded-lg focus:ring-1 focus:ring-neutral-200'>
                         <JoditEditor ref={edior}
                         value={description}
                         onChange={(newContent)=>setDescription(newContent)}
                         />
                    </div>  
                </div>

                {/* Summary */}
                <div className='flex flex-col space-y-2'>
                    <label htmlFor='title' className='text-lg font-semibold tracking-wide '>
                        Summary:
                    </label>
                    <div className='border-2 border-neutral-200 shadow-sm p-2 max-w-full rounded-lg focus:ring-1 focus:ring-neutral-200'>
                         <textarea placeholder='Give Summary'
                         value={summary}
                         onChange={(e)=>setSummary(e.target.value)}
                         className='outline-none bg-transparent w-full'/>
                    </div>  
                </div>

                {/* Lastly Update Time */}
                <div className='flex flex-col space-y-2'>
                    <label htmlFor='title' className='text-lg font-semibold tracking-wide '>
                        Date:
                    </label>
                    <div className='border-2 flex flex-row border-neutral-200 shadow-sm p-2 max-w-full rounded-lg focus:ring-1 focus:ring-neutral-200'>
                         <input type='date'
                         value={date}
                         onChange={(e)=>setDate(e.target.value) }
                         className='outline-none bg-transparent w-full'/>
                    </div>  
                </div>

                {/* Submit Button */}
                <div className='flex items-center justify-start'>
                    <button type='submit' className='text-xl p-4 bg-neutral-500 hover:bg-transparent hover:border-2 hover:border-neutral-300 hover:text-neutral-800 hover:shadow-md transition-all ease-out duration-300  rounded-2xl text-neutral-100 '>
                        Add Blog
                    </button>
                </div>

            </form>
        </div>
    </div>
  )
}

export default CreatePost