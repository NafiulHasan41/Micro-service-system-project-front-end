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
const EditServiceSchema = z.object({
  name: z.string().nonempty("Service provider name is required"),
  category: z.string().nonempty("Category is required"),
  description: z.string().optional(),
  location: z.object({
    address: z.string().nonempty("Address is required"),
    coordinates: z
      .array(z.number())
      .length(2, "Coordinates must contain exactly 2 numbers")
      .optional(),
  }),
  contact: z.object({
    phone: z.string().nonempty("Phone number is required"),
    email: z.string().email().optional(),
  }),
  tags: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional(),
  createdAt: z.date().optional(),
});

interface EditServiceDialogProps {
  service: {
    _id: string;
    name: string;
    category: string;
    description?: string;
    location?: { address: string; coordinates?: number[] };
    contact: { phone: string; email?: string };
    tags?: string[];
  };
  onSave: () => void;
}

export default function ServiceUpdate({ service, onSave }: EditServiceDialogProps) {
  const { user } = useContext(AuthContext) || {};
  const axiosInstance = useAxios();
  const showToast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(service.location?.coordinates?.[0] || null);
  const [longitude, setLongitude] = useState<number | null>(service.location?.coordinates?.[1] || null);

  const form = useForm<z.infer<typeof EditServiceSchema>>({
    resolver: zodResolver(EditServiceSchema),
    defaultValues: {
      name: service.name,
      category: service.category,
      description: service.description || "",
      location: service.location || { address: "", coordinates: [] },
      contact: service.contact,
      tags: service.tags || [],
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

  const handleSubmit = async (data: z.infer<typeof EditServiceSchema>) => {
    setLoading(true);
    try {
      await axiosInstance.patch(`/api/service-providers/${service._id}`, data);
      onSave();
      showToast("success", "Service updated successfully");
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
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setIsOpen(true)} className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-md">
          <TiEdit />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Service Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Provider Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter service provider name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Service Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border rounded p-2">
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option value="cleaning">Cleaning</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrician">Electrician</option>
                      <option value="gardening">Gardening</option>
                      <option value="tutoring">Tutoring</option>
                      <option value="catering">Catering</option>
                      <option value="transport">Transport</option>
                      <option value="pet_services">Pet Services</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Information */}
            <FormField
              control={form.control}
              name="contact.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
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

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter service description" {...field} />
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