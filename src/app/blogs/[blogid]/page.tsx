'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const Blogdetail = () => {
    const router =useParams()
    console.log({router})
  return (
    <div>blog detail</div>

  )
}

export default Blogdetail 