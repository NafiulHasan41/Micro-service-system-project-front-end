"use client";

import React, { useState, useContext } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/provider/AuthProvider";
import useAxios from "@/hooks/useAxios";
import useToast from "@/hooks/useToast";
import { TiEdit } from "react-icons/ti";
import LocationPicker from "@/components/global/location/LocationPicker";
import axios from "axios";


// Zod Schema
const EditJobSchema = z.object({
  job_title: z.string().nonempty("Job title is required"),
  description: z.string().nonempty("Description is required"),
  job_category: z.string().nonempty("Job category is required"),
  salary: z.string().optional(),
  location: z.object({
    address: z.string().nonempty("Address is required"),
    coordinates: z
      .array(z.number())
      .length(2, "Coordinates must contain exactly 2 numbers")
      .optional(),
  }),
  tags: z.array(z.string()).optional(),
  deadline: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Deadline must be a valid date"
    )
    .optional(),
  createdAt: z.date().optional(),
});

interface EditJobDialogProps {
  job: {
    _id: string;
    job_title: string;
    description: string;
    job_category: string;
    salary?: string;
    location?: { address: string; coordinates?: number[] };
    tags?: string[];
    deadline?: string;
  };
  onSave: () => void;
}

export default function JobUpdate({ job, onSave }: EditJobDialogProps) {
  const { user } = useContext(AuthContext) || {};
  const axiosInstance = useAxios();
  const showToast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(job.location?.coordinates?.[0] || null);
  const [longitude, setLongitude] = useState<number | null>(job.location?.coordinates?.[1] || null);

  const form = useForm<z.infer<typeof EditJobSchema>>({
    resolver: zodResolver(EditJobSchema),
    defaultValues: {
      job_title: job.job_title,
      description: job.description,
      job_category: job.job_category,
      salary: job.salary || "",
      location: job.location || { address: "", coordinates: [] },
      tags: job.tags || [],
      deadline: job.deadline || "",
    },
  });

  const handleCancel = () => {
    form.reset();
    setIsOpen(false);
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
    form.setValue("location.coordinates", [lat, lng]);
  };

  const handleSubmit = async (data: z.infer<typeof EditJobSchema>) => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(`/api/jobs/${job._id}`, data);
      onSave();
      showToast("success", "Job updated successfully");
      setIsOpen(false);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
          } else if (error instanceof Error) {
            showToast("error", error.message);
          } else {
            showToast("error", "An unknown error occurred");
          }
    } finally {
      setLoading(false);
    }
  };

//   console.log("form submit errors", form.formState.errors);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <button onClick={() => setIsOpen(true)} className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-md">
          <TiEdit />
        </button>
      </DialogTrigger>
      <DialogContent className=" max-h-screen overflow-y-auto" >
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle >
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Job Title */}
            <FormField
              control={form.control}
              name="job_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job Category */}
            <FormField
              control={form.control}
              name="job_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Category</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border rounded p-2">
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option value="engineering">Engineering</option>
                    <option value="marketing">Marketing</option>
                    <option value="design">Design</option>
                    <option value="management">Management</option>
                    <option value="finance">Finance</option>
                    <option value="micro_jobs">Micro Jobs</option>
                    <option value="customer_service">Customer Service</option>
                    <option value="writing">Writing</option>
                    <option value="data_entry">Data Entry</option>
                    <option value="it_support">IT Support</option>
                    <option value="sales">Sales</option>
                    <option value="consulting">Consulting</option>
                    <option value="education">Education</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="construction">Construction</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Salary */}
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary (In Taka)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter salary (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <div>
              <FormLabel>Select Location</FormLabel>
              <LocationPicker onLocationChange={handleLocationChange} />
              {latitude && longitude && (
                <p>
                  Selected Coordinates: Lat {latitude}, Lng {longitude}
                </p>
              )}
            </div>

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tags (comma-separated)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Deadline */}
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter deadline (e.g., YYYY-MM-DD)"
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter job description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}