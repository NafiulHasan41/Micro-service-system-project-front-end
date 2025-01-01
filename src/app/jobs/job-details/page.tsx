"use client";
import React, { useState } from "react";
import JobCard from "@/components/jobs/jobcard/JobCard";
import JobFilter from "@/components/jobs/jobfilter/JobFilter";
import JobDetails from "@/components/jobs/jobdetails/JobDetails";

export default function JobsPage() {

    // a sample job
  const job =
    {
      id: 1,
      name: "tiger",
      type: "paid",
      location: "Mohakhali, Dhaka",
      title: "Deliver Documents",
      description: "Deliver some gifts to my girlfriend in Mirpur, Dhaka.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      salary: "500 BDT",
      posterAvatar:
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=300",
      posterId: 123,
      postedTime: "2024-12-06T14:00:00Z",
      totalJobsByPoster: 3,
      posterAddress: "Mirpur,Dhaka",
      posterRating: 4.7,
      posterVerified: true,
    }

  return (
    <div className=" max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4">

      <div className="w-full pt-4 flex flex-row justify-center md:justify-start flex-wrap">
          <JobDetails key={job.id} {...job} />
      </div>
    </div>
  );
}
