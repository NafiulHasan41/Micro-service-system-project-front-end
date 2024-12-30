'use client'
import React, { useContext } from 'react'
import Navigation from './Navigation'
import Image from 'next/image'
import { GrLogin } from "react-icons/gr";
import Link from 'next/link';
import UserProfile from './UserProfile';
import { AuthContext } from '@/provider/AuthProvider';

export default function Navbar() {

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const {  user } = authContext;


  return (
    <div className=' flex justify-between px-10 md:px-20 sticky z-50 top-0 w-full border-b bg-gray-200/40 p-2 md:p-5'>
      <div className=' flex  items-center gap-1 pr-2 '>
        <Image src="https://i.ibb.co.com/TtPv8g8/micro-service-logo.jpg" alt="logo" width={70} height={70} className=' rounded-full'/>
        <h1 className='text-black font-bold text-[16px] '>Micro Service</h1>
      </div>
      <Navigation/>
     
      {/* this the section where user will show logout and image */}
    
     
      <div className=' border-l  border-black pl-3  hover:text-sky-500'>
        
        {
          user ? <div>
          <UserProfile/>
        </div> :  <Link href='/authentication'>
          <div className='flex gap-1 items-center'>
          <GrLogin />
         
          <button  className='hover:text-sky-500 text-black rounded-lg p-2 '>Login / Register </button>
        
          </div>
          </Link>
        }
        
       
       
      </div>
     
      
     
    </div>
  )
}
