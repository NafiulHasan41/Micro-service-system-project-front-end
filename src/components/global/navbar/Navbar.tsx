import React from 'react'
import Navigation from './Navigation'
import Image from 'next/image'
import { GrLogin } from "react-icons/gr";
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className=' flex justify-between px-10 md:px-20 sticky z-50 top-0 bg-gray-200/40 p-2 md:p-5'>
      <div className=' flex  items-center gap-1 border-r border-black pr-2 '>
        <Image src="https://i.ibb.co.com/TtPv8g8/micro-service-logo.jpg" alt="logo" width={70} height={70} className=' rounded-full'/>
        <h1 className='text-black font-bold text-[16px] '>Micro Service</h1>
      </div>
      <Navigation/>
      <Link href='/authentication'>
      <div className=' border-l border-black pl-3 flex gap-1 items-center hover:text-sky-500'>
        <GrLogin />
       
        <button  className='hover:text-sky-500 text-black rounded-lg p-2 '>Log In / Register </button>
       
      </div>
      </Link>
    </div>
  )
}
