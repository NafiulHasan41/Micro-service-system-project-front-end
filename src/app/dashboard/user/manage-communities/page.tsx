
import VolunteerShow from '@/components/volunteer/volunteer_manage/VolunteerShow'
import React from 'react'

export default function page() {

  const job = {}

  return (
    <div className=' p-1 md:p-8 max-w-screen-lg mx-auto  rounded-lg '>
       <div >
         <h1 className=' text-black font-bold'>MANAGE MICRO JOBS</h1>
       </div>
       <div>
       <VolunteerShow/>
       </div>
    </div>
  )
}
