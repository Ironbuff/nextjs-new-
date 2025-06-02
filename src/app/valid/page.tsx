'use client'

import { Emailverification } from '@/lib/api/auth'
import React, { useState } from 'react'
import {toast, ToastContainer} from 'react-toastify'


const Emailauth = () => {
    
    
    const successUrl = 'http://192.168.110.192:3000/sucess'
    const failureUrl = 'http://192.168.110.192:3000/failure'
    const [Email,setEmail]= useState('')
    
    // handle Otp button
    const handleEmail = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
           const result = await Emailverification({Email,successUrl,failureUrl})
           console.log(result)

           if(result.status===200){
            toast.success(result.data.message)
           }
        }
        catch(error){
               console.log(error)
        }
    }
    
    
    return (
        <div className='w-full h-[calc(100vh-10ch)] flex flex-col gap-y-2 items-center justify-center'>
            <ToastContainer/>
            <div className='flex flex-col gap-y-3 shadow-md md:w-[30%] w-[60%] p-5 border-neutral-100 border-2 rounded-xl'>
                <h1 className='text-2xl font-bold w-full'> Confirm Email </h1>
                <form onSubmit={handleEmail}  className='flex flex-col gap-y-2 w-full'>
                    {/* Confirmation of email*/}
                    <label htmlFor='otp'>
                        Enter Email for Confiramtion
                    </label>
                    <input
                        type='Email'
                        className='w-full outline-none focus:ring-2 p-3 focus:border-transparent focus:ring-blue-500  border-2 border-neutral-100 rounded-lg shadow-md' 
                        placeholder='Enter code from email'
                        value={Email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                        />

                    <button type='submit' className='p-3 hover:bg-blue-600 transition-all ease-in-out duration-300 text-neutral-200 font-bold  rounded-xl w-full border-2 border-blue-500 bg-blue-500'>
                        Sent Email for Confirmation
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Emailauth