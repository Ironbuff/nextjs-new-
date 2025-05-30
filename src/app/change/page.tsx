'use client'

import { changePassword } from '@/lib/api/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Changepassword = () => {

    const [showpassword, setShowpassword] = useState(false)
    const [password, setPassword] = useState('')
    const [newpassword, setNewpassword] = useState('')
    const[userId,setUserId]= useState('')
    const[token,setToken]= useState('')
    const router = useRouter()
    const params = useSearchParams()

    useEffect(() => {
       const userIdParam = params.get('userId')
        const tokenParam = params.get('token')
        
        if (userIdParam) setUserId(userIdParam)
        if (tokenParam) setToken(tokenParam)
      
    }, [params])
    
    
    
    const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
                const result = await changePassword({newpassword,userId,token})

                console.log(result)
                if(result.status===200){
                    alert('Password Changed Sucessfully')
                    router.push('/login')
                }
                alert('password couldnt be changed')
                
      
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col bg-gray-100  items-center justify-center  max-w-full max-h-screen h-[calc(100vh-10ch)]'>
            {/* heading */}

            <div className='flex flex-col lg:w-[25%] w-[45%]  items-center justify-center  border-neutral-50 bg-neutral-50 border-2 rounded-lg shadow-md'>
                <h1 className='text-2xl  font-bold py-6'>
                    Change Password
                </h1>
                <form onSubmit={handleChange} className='flex flex-col w-full px-4 py-4  max-w-md gap-y-2 items-center justify-center'>
                    <div className='flex flex-col gap-y-2  w-full'>
                        <label
                            htmlFor="New Password"
                            className='text-base font-base'>
                            New Password
                        </label>
                        {/* change password field */}
                        <div className='flex relative w-full items-center justify-center'>
                            <input
                                type={showpassword ? "text" : "password"}
                                className='outline-none border-2 focus:border-transparent focus:ring-2 focus:ring-blue-600 transition-all ease-in-out duration 300 w-full px-6 py-2 rounded-xl shadow-sm'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className='absolute top-3 right-4' onClick={() => setShowpassword(!showpassword)}>
                                {showpassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>

                    {/* confirm password */}
                    <div className='w-full space-y-2'>
                        <label
                            htmlFor='ConfirmPassword'
                            className='text-base font-base'
                        >
                            Confirm Password
                        </label>
                        {/* confirm password field */}
                        <div className='flex relative  w-full items-center justify-center'>
                            <input
                                type={showpassword ? "text" : "password"}
                                className='outline-none border-2 focus:border-transparent focus:ring-2 focus:ring-blue-600 transition-all ease-in-out duration 300 w-full px-6 py-2 rounded-xl shadow-sm'
                                placeholder='Confirm Password'
                                value={newpassword}
                                onChange={(e) => setNewpassword(e.target.value)}
                                required
                            />
                            <span className='absolute top-3 right-4' onClick={() => setShowpassword(!showpassword)}>
                                {showpassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>

                    {/* check password */}
                    {password !== newpassword && (
                        <p className='text-red-500 flex items-center justify-center text-base font-base '>
                            Password Doesnt Match
                        </p>
                    )}

                    {/* confirm password button*/}
                    <div className='w-full'>
                        <button type='submit' className='p-3 border-neutral-50 border-2 hover:bg-blue-600 transition-all ease-in-out duration-300 w-full text-neutral-50 rounded-lg shadow-sm font-semibold  bg-blue-500'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Changepassword