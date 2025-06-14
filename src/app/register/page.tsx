'use client'

import { registerUser } from '@/lib/api/auth';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { FaEyeSlash, FaUserCircle } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { MdMail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { toast } from 'react-toastify';


const Register = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()
  const [showpassword, setShowpassword] = useState(false)
  const[passworderror,setPassworderror]=useState('')

 

  const handleregister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
     const passwordpattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
        if(!passwordpattern.test(password)){
          setPassworderror('Password must be 6+ chars, include one capital and one special char.')
        }
    
    try {
      const result = await registerUser({username,password,email})
      console.log(result.status)
      console.log(result)
      if(result?.status===200){
        toast.success('registered')
        router.push('/valid')
      }
      else{
        toast.error('Registration Failed try again')
      }
     
    }
    catch (err) {
     console.log(err)
     toast.error(`the error ${err}`)
  }

  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10ch)] bg-gray-100 px-4">
      
      <form onSubmit={handleregister} className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-12 space-y-6"

      >
        <h1 className="text-3xl font-bold text-center text-neutral-700">Register</h1>

        {/* Username field */}
        <div className="space-y-1">
          <label htmlFor="username" className="text-neutral-700 font-medium">
            Username:
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 bg-gray-50">
            <FaUserCircle className="text-gray-500 mr-2" />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="flex-1 bg-transparent outline-none text-neutral-800"
            />
          </div>
        </div>

        {/* Email field */}
        {/* Username field */}
        <div className="space-y-1">
          <label htmlFor="Email" className="text-neutral-700 font-medium">
            Email:
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 bg-gray-50">
            <MdMail className="text-gray-500 mr-2" />
            <input
              type="Email"
              id="Email"
              placeholder="Enter your Email"
              className="flex-1 bg-transparent outline-none text-neutral-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>


        {/* Password field */}
        <div className="space-y-1">
          <label htmlFor="password" className="text-neutral-700 font-medium">
            Password:
          </label>
          <div className="flex relative focus:ring-2 focus:ring-blue-500 items-center border border-gray-300 rounded-xl px-4 py-2 bg-gray-50">
            <RiLockPasswordFill className="text-gray-500 mr-2 " />
            <input
              type={showpassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className=" bg-transparent outline-none text-neutral-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             {passworderror && (<p className='text-sm text-red-400'>{passworderror}</p>) }
            <span onClick={() => setShowpassword(!showpassword)} className='absolute top-3 right-4 cursor-pointer'>
              {showpassword ? <IoEyeSharp /> : <FaEyeSlash />}
            </span>
          </div>
        </div>



        {/* Button */}
        <button type='submit' className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 rounded-xl transition-transform hover:scale-105">
          Register
        </button>

        {/* Register link */}
        <p className="text-center text-sm text-neutral-600">
          A have an account?{' '}
          <Link href={'/login'} className="text-blue-600 font-medium hover:underline cursor-pointer">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register
