import JobForm from '@/components/jobs/job_post/JobForm'
import React from 'react'

export default function page() {
  return (
    <div className=' p-1 md:p-8 max-w-screen-lg mx-auto  rounded-lg '>
       <div >
         <h1 className=' text-black font-bold'>ADD PAID MICRO JOBS</h1>
       </div>
       <div>
        <JobForm/>
       </div>
    </div>
  )
}
