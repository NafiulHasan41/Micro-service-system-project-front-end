
import ServiceProviderForm from '@/components/services/ServiceForm'
import React from 'react'

export default function page() {
  return (
    <div className=' p-1 md:p-8 max-w-screen-lg mx-auto  rounded-lg '>
       <div >
         <h1 className=' text-black font-bold'>ADD A SERVICE</h1>
       </div>
       <div>
       <ServiceProviderForm/>
       </div>
    </div>
  )
}
