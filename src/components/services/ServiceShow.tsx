'use client';
import useAxios from '@/hooks/useAxios';
import useToast from '@/hooks/useToast';
import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import { z } from 'zod';
import ServiceManage from './ServiceManage';


const ServiceProviderBaseSchema = z.object({
  _id: z.string(),
  name: z.string().nonempty("Service provider name is required"),
  category: z.string().nonempty("Category is required"),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  location: z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.number()).length(2).optional(),
    address: z.string().nonempty("Address is required"),
  }),
  contact: z.object({
    phone: z.string().nonempty("Phone number is required"),
    email: z.string().email().optional(),
  }),
  rating: z.number().min(0).max(5).default(0),
  reviews: z.array(z.string()).optional(),
  posterId: z.string().nonempty("Poster ID is required"),
  createdAt: z.date().optional(),
});

type ServiceProvider = z.infer<typeof ServiceProviderBaseSchema>;

export default function ServiceShow() {
  const axiosInstance = useAxios();
  const showToast = useToast();
  const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

  const { data: services, error, isValidating, mutate } = useSWR(
    '/api/service-providers',
    fetcher
  );

  if (isValidating) return <div>Loading...</div>;
  if (axios.isAxiosError(error)) {
    showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
  } else if (error instanceof Error) {
    showToast("error", error.message);
  }
  if (error) return  <div>Error loading data</div>;

//   console.log(services);

  return (
    <div className='grid grid-cols-1 gap-2'>
      {services?.map((service: ServiceProvider) => (
        <ServiceManage key={service._id} service={service} refreshServices={mutate} />
      ))}
    </div>
  );
}