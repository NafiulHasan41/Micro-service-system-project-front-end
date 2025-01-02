"use client";

import React, { useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LocationPicker from "@/components/global/location/LocationPicker";
import { AuthContext } from "@/provider/AuthProvider";
import useToast from "@/hooks/useToast";
import useAxios from "@/hooks/useAxios";
import axios from "axios";

// Zod Schema
const ServiceProviderBaseSchema = z.object({
  name: z.string().nonempty("Service provider name is required"),
  category: z.string().nonempty("Category is required"),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  location: z.object({
    type: z.literal("Point").default("Point"),
    coordinates: z
      .array(z.number())
      .length(2, "Coordinates must have exactly two numbers")
      .optional(),
    address: z.string().nonempty("Address is required"),
  }),
  contact: z.object({
    phone: z.string().nonempty("Phone number is required"),
    email: z.string().email().optional(),
  }),
  rating: z.number().min(0).max(5).default(0),
  reviews: z.array(z.string()).optional(),
  posterId: z.string().nonempty("Poster ID is required"),
});

export default function ServiceProviderForm() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user } = authContext;
  const showToast = useToast();
  const axiosPublic = useAxios();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof ServiceProviderBaseSchema>>({
    resolver: zodResolver(ServiceProviderBaseSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      tags: [],
      location: {
        type: "Point",
        coordinates: [],
        address: "",
      },
      contact: {
        phone: "",
        email: "",
      },
      rating: 0,
      reviews: [],
      posterId: user?.id || "",
    },
  });

  const onLocationChange = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
    form.setValue("location.coordinates", [lat, lng]);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      form.setValue("tags", updatedTags);
    }
    setNewTag("");
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    form.setValue("tags", updatedTags);
  };

  useEffect(() => {
    if (user?.id) {
      form.setValue("posterId", user.id);
    }
  }, [user?.id, form]);

  const onSubmit = async (data: z.infer<typeof ServiceProviderBaseSchema>) => {
    try {
      setLoading(true);
      await axiosPublic.post("/api/service-providers", data);
      form.reset();
      setTags([]);
      setNewTag("");
      setLatitude(null);
      setLongitude(null);
      form.setValue("posterId", user?.id || "");
      showToast("success", "Service provider posted successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
      } else if (error instanceof Error) {
        showToast("error", error.message);
      } else {
        showToast("error", "An unknown error occurred");
      }
    }
  };

 
  return (
    <div className="p-3 m-1 shadow-lg md:m-5 md:p-8 max-w-screen-lg mx-auto border border-gray-300 rounded-lg ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Service Provider Name */}
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

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
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
                  <textarea
                    className="w-full border rounded p-2"
                    placeholder="Enter description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <div>
            <FormLabel>Tags (use tags to describe your service)</FormLabel>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter a tag and press Add"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addTag}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-black px-3 py-1 rounded flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-red-500"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <FormField
            control={form.control}
            name="location.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter address" {...field} />
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

          {/* Location Picker */}
          <div>
            <FormLabel>Select Location</FormLabel>
            <LocationPicker onLocationChange={onLocationChange} />
            {latitude && longitude && (
              <p>
                Selected Coordinates: Lat {latitude}, Lng {longitude}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-500 text-white font-bold" disabled={loading}>
            {loading ? "Posting..." : "Post Service Provider"}
          </Button>
        </form>
      </Form>
    </div>
  );
}