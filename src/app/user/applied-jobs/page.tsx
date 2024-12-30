"use client"

import AppliedJobCard from "@/components/user/appliedJobCard/appliedJobCard"

export default function appliedJobsPage(){

    const jobs = [
        {
          id: 1,
          type: "paid",
          status: "Pending Approval",
          title: "Deliver Documents",
          posterId: 123,
          postedTime: "2024-12-06T14:00:00Z",
        },
        {
          id: 2,
          name: "chicken",
          type: "volunteer",
          status: "Pending Approval",
          location: "KUET, Fulbari Gate, Khulna",
          title: "Volunteer for Cleanup",
          posterId: 124,
          postedTime: "2024-12-07T18:00:00Z",
        },
        {
          id: 3,
          type: "paid",
          status: "Completed",
          title: "Create a Logo",
          posterId: 125,
          postedTime: "2024-12-10T10:00:00Z",
        },
        {
          id: 4,
          type: "paid",
          status: "Ongoing",
          title: "Part-time Chef",
          posterId: 126,
          postedTime: "2024-12-12T08:00:00Z",
        },
    ]

    return(

      <div className="w-full pt-4 border border-gray-200 rounded-md">
        <div className="mb-4 text-center text-3xl font-semibold text-gray-600 font-sans">
            All Applied Jobs
        </div>
        <div className=" flex flex-row justify-center md:justify-start flex-wrap">
        {jobs.map((job) => (
          <AppliedJobCard key={job.id} {...job} />
        ))}
        </div>

      </div>
    )
}