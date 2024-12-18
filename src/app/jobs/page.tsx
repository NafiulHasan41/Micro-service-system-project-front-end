"use client";
import React, { useState } from "react";
import JobCard from "@/components/jobs/jobcard/JobCard";
import JobFilter from "@/components/jobs/jobfilter/JobFilter";

export default function JobsPage() {
  // These tags are for testing purposes. Actual tags will be fetched from the database
  const tags = [
    "remote",
    "part-time",
    "freelance",
    "volunteer",
    "delivery",
    "washing",
    "chef",
    "teacher",
    "designer",
    "electrician",
  ];

  const [filters, setFilters] = useState<{
    jobTypes: string[];
    tags: string[];
  }>({
    jobTypes: [], // Initialize with an empty array
    tags: [], // Initialize with an empty array
  });

  const jobs = [
    {
      id: 1,
      name: "tiger",
      type: "paid",
      location: "Mohakhali, Dhaka",
      title: "Deliver Documents",
      description: "Deliver some gifts to my girlfriend in Mirpur, Dhaka",
      tags: ["paid", "single task", "delivery"],
      salary: "500 BDT",
      posterAvatar:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
      posterId: 123,
      postedTime: "2024-12-06T14:00:00Z",
    },
    {
      id: 2,
      name: "chicken",
      type: "volunteer",
      location: "KUET, Fulbari Gate, Khulna",
      title: "Volunteer for Cleanup",
      description:
        "Make KUET plastic free. Remove all types of plastics from academic and resident areas.",
      tags: ["non-paid", "volunteer"],
      posterAvatar: "https://robohash.org/mail@ashallendesign.co.uk",
      posterId: 124,
      postedTime: "2024-12-07T18:00:00Z",
    },
    {
      id: 3,
      name: "fox",
      type: "paid",
      location: "Online",
      title: "Create a Logo",
      description:
        "Looking for a freelance designer to create a modern logo for my startup.",
      tags: ["freelance", "designer", "remote"],
      salary: "2000 BDT",
      posterAvatar: "https://robohash.org/fox@example.com",
      posterId: 125,
      postedTime: "2024-12-10T10:00:00Z",
    },
    {
      id: 4,
      name: "lion",
      type: "paid",
      location: "Dhanmondi, Dhaka",
      title: "Part-time Chef",
      description:
        "Need a chef to cook lunch and dinner for a family of four. Flexible hours.",
      tags: ["paid", "part-time", "chef"],
      salary: "15000 BDT/month",
      posterAvatar: "https://robohash.org/lion@example.com",
      posterId: 126,
      postedTime: "2024-12-12T08:00:00Z",
    },
    {
      id: 5,
      name: "elephant",
      type: "volunteer",
      location: "Savar, Dhaka",
      title: "Teach Basic English",
      description:
        "Volunteer to teach basic English to underprivileged children on weekends.",
      tags: ["volunteer", "teacher", "non-paid"],
      posterAvatar: "https://robohash.org/elephant@example.com",
      posterId: 127,
      postedTime: "2024-12-14T15:00:00Z",
    },
    {
      id: 6,
      name: "eagle",
      type: "paid",
      location: "Uttara, Dhaka",
      title: "Repair Electrical Appliances",
      description:
        "Need an electrician to fix a few household appliances. Immediate requirement.",
      tags: ["paid", "electrician", "single task"],
      salary: "1000 BDT",
      posterAvatar: "https://robohash.org/eagle@example.com",
      posterId: 128,
      postedTime: "2024-12-15T12:00:00Z",
    },
    {
      id: 7,
      name: "panda",
      type: "paid",
      location: "Online",
      title: "Content Writer",
      description:
        "Hiring a remote content writer to write blogs on technology and lifestyle.",
      tags: ["remote", "freelance", "writer"],
      salary: "3000 BDT/article",
      posterAvatar: "https://robohash.org/panda@example.com",
      posterId: 129,
      postedTime: "2024-12-16T09:00:00Z",
    },
    {
      id: 8,
      name: "dolphin",
      type: "volunteer",
      location: "Sylhet, Bangladesh",
      title: "Organize Community Event",
      description:
        "Help organize a community event focused on sustainable living practices.",
      tags: ["volunteer", "event management", "non-paid"],
      posterAvatar: "https://robohash.org/dolphin@example.com",
      posterId: 130,
      postedTime: "2024-12-17T14:00:00Z",
    },
    {
      id: 9,
      name: "sparrow",
      type: "paid",
      location: "Chattogram, Bangladesh",
      title: "Laundry Services",
      description:
        "Provide laundry services for a small office. Weekly engagement.",
      tags: ["paid", "part-time", "washing"],
      salary: "8000 BDT/month",
      posterAvatar: "https://robohash.org/sparrow@example.com",
      posterId: 131,
      postedTime: "2024-12-18T08:00:00Z",
    },
  ];

  const onFilterChange = (
    key: keyof typeof filters,
    value: string[] | string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesJobType =
      filters.jobTypes.length === 0 ||
      filters.jobTypes.includes(job.type.toLowerCase());

    const matchesTags =
      filters.tags.length === 0 ||
      filters.tags.some((tag) => job.tags.includes(tag));

    return matchesJobType && matchesTags;
  });

  return (
    <div className=" max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4">
      {/* Filters Section */}
      <div className="fixed w-[300px] flex justify-end border-r min-h-screen collapse md:visible">
        <JobFilter
          availableTags={tags}
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </div>

      {/* Job Cards Section */}
      <div className="w-full pt-4 md:pl-[300px] flex flex-row justify-center md:justify-start flex-wrap">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
}
