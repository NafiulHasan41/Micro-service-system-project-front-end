'use client';
import React from 'react';
import { MdOutlinePeople } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { FaRegCalendarAlt } from "react-icons/fa";
import Link from 'next/link';

// Custom Hooks
import useAxios from '@/hooks/useAxios';
import useToast from '@/hooks/useToast';


// Zod Schema
import { z } from "zod";
import axios from 'axios';
import ServiceUpdate from './ServiceUpdate';

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

interface ServiceManageProps {
  service: ServiceProvider;
  refreshServices: () => void;
}

const ServiceManage: React.FC<ServiceManageProps> = ({
  service,
  refreshServices
}) => {
  const axiosInstance = useAxios();
  const showToast = useToast();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axiosInstance.delete(`/api/service-providers/${service._id}`);
      showToast("success", "Service deleted successfully");
      refreshServices();
      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
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
        <h2 className="text-xl font-bold">{service?.name}</h2>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-500 flex items-center gap-1">
          <FaRegCalendarAlt />
          Posted on {service?.createdAt ? new Date(service.createdAt).toLocaleDateString() : "N/A"}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <Link href={`/dashboard/user/manage-applications/${service._id}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex gap-2 items-center">
            <MdOutlinePeople />
            Manage Applications
          </button>
        </Link>
        <div className="flex">
          <ServiceUpdate service={service} onSave={refreshServices} />
          <button onClick={handleDelete} className="bg-gray-200 hover:bg-gray-300 font-bold py-2 px-4 rounded-md ml-2 text-red-500">
            {isDeleting ? "Deleting..." : <RiDeleteBin5Fill />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceManage;