


import ServiceShow from '@/components/services/ServiceShow'
import React from 'react'

export default function page() {

  const job = {}

  return (
    <div className=' p-1 md:p-8 max-w-screen-lg mx-auto  rounded-lg '>
       <div >
         <h1 className=' text-black font-bold'>MANAGE Services</h1>
       </div>
       <div>
        <ServiceShow/>
       </div>
    </div>
  )
}
