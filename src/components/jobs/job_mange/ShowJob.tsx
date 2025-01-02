'use client'
import useAxios from '@/hooks/useAxios'
import useToast from '@/hooks/useToast';
import axios from 'axios';
import React from 'react'

import useSWR from 'swr'

import { z } from "zod";
import JobManage from './JobManage';
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

export default function ShowJob() {
    const axiosInstance = useAxios();
    const showToast = useToast();
    const fetcher = (url : string) => axiosInstance.get(url).then((res) => res.data)

    const { data: jobs, error, isValidating } = useSWR(
        '/api/jobs/user/jobs',
        fetcher
    )
    if (isValidating) return <div>Loading...</div>;
    if (axios.isAxiosError(error)) {
        showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
      } else if (error instanceof Error) {
        showToast("error", error.message);
      } 
    if (error) return <div>Error loading data</div>;
//    console.log(jobs.data)
  return (
    <div>

        {
            jobs?.data?.map((job:Job) => (
                job.type === 'paid' && <JobManage key={job._id} job={job} />
            ) )
        }
      
    </div>
  )
}
