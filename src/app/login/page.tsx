'use client'




import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';



const Login = () => {
  
  const[username,setUsername]= useState('');
  const[password,setPassword]= useState('');
  const router = useRouter()

  

  const handlesubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{
       const data ={
        username,
        password,
       }

       console.log(data)
       router.push('/')

    }
    catch(err){
      console.log(err)
    }
    
  }
  
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10ch)] bg-gray-100 px-4">
      <form onSubmit={handlesubmit} className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-10 space-y-6">
        <h1 className="text-3xl font-bold text-center text-neutral-700">Login</h1>

        {/* Username field */}
        <div className="space-y-1">
          <label htmlFor="username" className="text-neutral-700 font-medium">
            Username:
          </label>
          <div className="flex items-center border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-2 bg-gray-50">
            <FaUserCircle className="text-gray-500 mr-2" />
            <input
              type="text"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              id="username"
              placeholder="Enter your username"
              className="flex-1 bg-transparent outline-none text-neutral-800"
            />
          </div>
        </div>

        {/* Password field */}
        <div className="space-y-1">
          <label htmlFor="password" className="text-neutral-700 font-medium">
            Password:
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 bg-gray-50">
            <RiLockPasswordFill className="text-gray-500 mr-2" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="flex-1 bg-transparent outline-none text-neutral-800"
            />
          </div>
        </div>

         {/* Forget Password and Remember Me */}
        <div className='flex flex-row items-center justify-between'>
          {/* Remember Me */}
          <div className='flex flex-row justify-center items-center gap-x-2'>
          <input type='checkbox'/>
          <label htmlFor='remember Me'>Remember Me</label>
          </div>
          {/* Forget Password */}
          <div>
             <span className='cursor-pointer hover:underline hover:text-blue-500'>Forget Password</span>
          </div>
        </div>

        {/* Button */}
        <button type='submit' className="w-full bg-blue-500 hover:bg-blue-400   text-white font-semibold py-2 rounded-xl transition-transform hover:scale-105">
          Log In
        </button>

        {/* Register link */}
        <p className="text-center text-sm text-neutral-600">
          Don’t have an account?{' '}
          <Link href={'/register'} className="text-blue-600 font-medium hover:underline cursor-pointer">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
