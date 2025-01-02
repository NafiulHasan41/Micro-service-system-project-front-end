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
    <div className=' flex justify-between px-10 md:px-16 sticky z-50 top-0 w-full border-b  p-2 md:p-5'>
      <Link href='/'>
      <div className=' flex  items-center gap-1 pr-2  '>
        <Image src={user?.imageURL ? user.imageURL : "https://i.ibb.co.com/TtPv8g8/micro-service-logo.jpg"} alt="logo" width={70} height={70} className=' hidden md:block rounded-full mr-2'/>
        <Image src={user?.imageURL ? user.imageURL : "https://i.ibb.co.com/TtPv8g8/micro-service-logo.jpg"} alt="logo" width={50} height={50} className=' md:hidden rounded-full h-10 w-16'/>
        <h1 className='text-black font-bold text-[16px] hidden md:block '>Micro Service</h1>
      </div>
      </Link>
      <div className=' hidden md:block'>
         <Navigation/>
      </div>
     
     
      {/* this the section where user will show logout and image */}
    
     
      <div className=' border-l  border-black pl-3  hover:text-sky-500'>
        
        {
          user ? <div className=' mr-5'>
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
