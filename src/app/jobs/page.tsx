"use client"
import React, { useState } from "react";
import JobCard from "@/components/jobcard/JobCard";
import JobFilter from "@/components/jobfilter/JobFilter";

export default function JobsPage() {
    // These tags are for testing purpose. Actual tags will be fetched from database
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
        tags: [],     // Initialize with an empty array
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
            posterAvatar: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
            posterId: 123,
            postedTime: "2024-12-06T14:00:00Z",
        },
        {
            id: 2,
            name: "chicken",
            type: "volunteer",
            location: "KUET, Fulbari Gate, Khulna",
            title: "Volunteer for Cleanup",
            description: "Make KUET plastic free. Remove all types of plastics from academic and resident areas.",
            tags: ["non-paid", "volunteer"],
            posterAvatar: "https://robohash.org/mail@ashallendesign.co.uk",
            posterId: 124,
            postedTime: "2024-12-07T18:00:00Z",
        },
    ];

    const onFilterChange = (key: keyof typeof filters, value: string[] | string) => { 
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
        <div className="flex flex-col md:flex-row gap-4">
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
