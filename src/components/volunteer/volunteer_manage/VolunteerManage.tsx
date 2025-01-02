'use client'
import React from 'react';


import { MdOutlinePeople } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";

import Link from 'next/link';

// Custom Hooks
import useAxios from '@/hooks/useAxios';



// Zod Schema
import { z } from "zod";
import axios from 'axios';
import useToast from '@/hooks/useToast';
import VolunteerUpdate from './VolunteerUpdate';


const JobBaseSchema = z.object({
    _id: z.string(),
  type: z.enum(["paid", "volunteer"]),
  location: z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.number()).length(2).optional(),
    address: z.string().nonempty("Address is required"),
  }),
  job_title: z.string().nonempty("Job title is required"),
  description: z.string().nonempty("Job description is required"),
  tags: z.array(z.string()).optional(),
  salary: z.string().optional(),
  posterId: z.string().nonempty("Poster ID is required"),
  deadline: z.string().optional(),
  job_category: z.string().nonempty("Job category is required"),
  createdAt: z.date().optional(),
});
type Job = z.infer<typeof JobBaseSchema>;

interface JobManageProps {
  job: Job;
  refreshJobs: () => void;
}
const VolunteerManage: React.FC<JobManageProps> = ({
    job ,
    refreshJobs
}) => {
  
    const isExpired = job.deadline ? new Date() > new Date(job.deadline) : false;
    const status = isExpired ? "Expired" : "Active";
    
    const axiosInstance = useAxios();
    const showToast = useToast();
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
           await axiosInstance.delete(`/api/jobs/${job._id}`);
        //   console.log(res.data);
            showToast("success", "Job deleted successfully");
            refreshJobs();
            setIsDeleting(false);
        } catch (error) {
            setIsDeleting(false);
        //   console.log(error);
          if (axios.isAxiosError(error)) {
            showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
          } else if (error instanceof Error) {
            showToast("error", error.message);
          } else {
            showToast("error", "An unknown error occurred");
          }
        }
    }


  return (
    <div className="bg-white border border-gray-300 shadow-md rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{job?.job_title}</h2>
        <div className={` px-2 py-1 rounded-md`}>
          {status}
        </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-500 flex items-center gap-1">
         <FaRegCalendarAlt/>
          Posted on  {job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A"}
        </span>
        <span className="text-gray-500 flex items-center gap-1">
        <FaRegCalendarAlt/>
          Expires on {job?.deadline ? new Date(job.deadline).toLocaleDateString() : "N/A"}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <Link href={`/dashboard/user/manage-application/${job._id}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex gap-2 items-center">
          <MdOutlinePeople/>
          Manage Candidates 
        </button>
        </Link>
        <div className="flex">
          {/* <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-md">
          <TiEdit/>
          </button> */}
           <VolunteerUpdate job={job} onSave={refreshJobs} />
          <button onClick={()=>handleDelete()}   className="bg-gray-200 hover:bg-gray-300  font-bold py-2 px-4 rounded-md ml-2 text-red-500">
            {
                isDeleting ? "Deleting..." : <RiDeleteBin5Fill/>
            }
          
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerManage;