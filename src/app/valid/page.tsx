'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const Emailauth = () => {
    
    
    const router = useRouter()
    
    // handle Otp button
    const handleOtp = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
           router.push('/login')
        }
        catch{

        }
    }
    
    
    return (
        <div className='w-full h-[calc(100vh-10ch)] flex flex-col gap-y-2 items-center justify-center'>
            <div className='flex flex-col gap-y-3 shadow-md md:w-[30%] w-[60%] p-5 border-neutral-100 border-2 rounded-xl'>
                <h1 className='text-2xl font-bold w-full'> Confirm Email </h1>
                <form onSubmit={handleOtp}  className='flex flex-col gap-y-2 w-full'>
                    {/* Confirmation of email using otp */}
                    <label htmlFor='otp'>
                        Enter OTP
                    </label>
                    <input
                        type='text'
                        className='w-full outline-none focus:ring-2 p-3 focus:border-transparent focus:ring-blue-500  border-2 border-neutral-100 rounded-lg shadow-md' 
                        placeholder='Enter code from email'
                        required
                        />

                    <button type='submit' className='p-3 hover:bg-blue-600 transition-all ease-in-out duration-300 text-neutral-200 font-bold  rounded-xl w-full border-2 border-blue-500 bg-blue-500'>
                        Confirm OTP
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Emailauth