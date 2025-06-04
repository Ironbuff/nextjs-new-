'use client'




import Link from 'next/link';
import {  useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaEyeSlash, FaUserCircle } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { RiLockPasswordFill } from 'react-icons/ri';
import { loginUser } from '@/lib/api/auth';
import { useDispatch } from 'react-redux';
import { authActions } from '@/store/auth';
import { toast} from 'react-toastify';




const Login = () => {
  
  const[email,setEmail]= useState('');
  const[password,setPassword]= useState('');
  const router = useRouter()
  const params = useSearchParams()
  const[showpassword,setShowpassword] = useState(false)
  const userIdParam = params.get('userId')
  const dispatch = useDispatch()
  

  

  const handlesubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{
       const result = await loginUser({email,password})
       if(result.status===200){
        dispatch(authActions.loggin())
        dispatch(authActions.adduser(userIdParam))
        localStorage.setItem('token',result.data.token)
        localStorage.setItem('refreshToken',result.data.refreshToken)
        localStorage.setItem('acessTokenExpiresIn',result.data.accessTokenExpires)
        toast.success('User Logged In Sucessfully')
        router.push('/')
       }
       else{
        dispatch(authActions.logout())
       }      
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
          <label htmlFor="Email" className="text-neutral-700 font-medium">
            Email:
          </label>
          <div className="flex items-center border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-2 bg-gray-50">
            <FaUserCircle className="text-gray-500 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
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
          <div className="flex relative items-center border border-gray-300 rounded-xl px-4 py-2 bg-gray-50">
            <RiLockPasswordFill className="text-gray-500 mr-2" />
            <input
              type={showpassword?"text":"password"}
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="flex-1 bg-transparent outline-none text-neutral-800"
            />
            <span onClick={()=>setShowpassword(!showpassword)} className='absolute top-3 right-4 cursor-pointer'>
              {showpassword?<IoEyeSharp/>:<FaEyeSlash/>}
              </span>
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
             <Link href={'/forget'} className='cursor-pointer hover:underline hover:text-blue-500'>Forget Password</Link>
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
