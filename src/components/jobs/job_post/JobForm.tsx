"use client";

import React, { useContext, useState } from "react";
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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { AuthContext } from "@/provider/AuthProvider";

// Zod Schema
const JobBaseSchema = z.object({
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
});

export default function JobForm() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [type, setType] = useState<"paid" | "volunteer">("paid");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [date, setDate] = useState<Date | undefined>();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const {  user  } = authContext;



  const form = useForm<z.infer<typeof JobBaseSchema>>({
    resolver: zodResolver(JobBaseSchema),
    defaultValues: {
      type: "paid",
      location: {
        type: "Point",
        coordinates: [],
        address: "",
      },
      job_title: "",
      description: "",
      tags: [],
      salary: "",
      posterId: user?.id ,
      job_category: "",
      deadline: "",
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

  const onSubmit = (data: z.infer<typeof JobBaseSchema>) => {
    console.log("Form submitted:", data);
    // Add your API call or handling logic here
  };
 

  return (
    <div className="p-3 m-1 shadow-lg md:m-5 md:p-8 max-w-screen-lg mx-auto border border-gray-300 rounded-lg ">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    value={type}
                    onChange={(e) => {
                      const value = e.target.value as "paid" | "volunteer";
                      field.onChange(value);
                      setType(value);
                    }}
                    className="w-full border rounded p-2"
                  >
                    <option value="paid">Paid</option>
                    <option value="volunteer">Volunteer</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Salary (conditional) */}
          {type === "paid" && (
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter salary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
  
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
                  placeholder="Enter job description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        {/* Tags */}
        <div>
          <FormLabel>Tags</FormLabel>
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
  
        {/* Address */}
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
  
        {/* Location */}
        <div>
          <FormLabel>Select Location</FormLabel>
          <LocationPicker onLocationChange={onLocationChange} />
          {latitude && longitude && (
            <p>
              Selected Coordinates: Lat {latitude}, Lng {longitude}
            </p>
          )}
        </div>
  
        {/* Deadline with Date Picker */}
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" mr-2 md:mr-5">Deadline :</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        const formattedDate = selectedDate
                          ? selectedDate.toISOString().split("T")[0]
                          : "";
                        field.onChange(formattedDate);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        {/* Submit Button */}
        <Button type="submit" className="w-full bg-blue-500 text-white font-bold">
         +  Post a paid Task
        </Button>
      </form>
    </Form>
  </div>
  
  );
}
