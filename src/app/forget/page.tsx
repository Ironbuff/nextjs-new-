'use client'


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Forget = () => {
  
  const[submitted,setSubmitted]= useState(false)
  const[email,setEmail]= useState('')
  const router = useRouter()

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{
      console.log("Email Sent ",email)
      setSubmitted(!submitted)
      router.push('/change')
    }
    catch(err){
      console.log(err)
    }
  }
  
  
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 py-6">
          Forgot Your Password?
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="item@gmail.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg shadow-md transition duration-300"
          >
            Send Verification Code
          </button>
        </form>
        {submitted&&(
          <p className='text-green-400 flex items-center justify-center text-base py-2'>
            Verification Code sent to your Email
          </p>
        )}
      </div>
    </div>
  );
};

export default Forget;
