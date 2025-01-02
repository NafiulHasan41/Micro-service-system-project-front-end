import * as React from "react";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { formatDistanceToNow } from "date-fns";

import { Button } from "../../ui/button";
import { Briefcase, HandCoins, Handshake, MapPin, MapPinned, Star, UserRoundCheck } from "lucide-react";
import { Clock } from "lucide-react";

interface JobDetailsProps {
    id: number;
    name: string;
    type: string; // To differentiate the type
    location: string;
    title: string;
    description: string;
    salary?: string; // community task will have no salary
    posterAvatar: string;
    posterId: number;
    postedTime: string;
    totalJobsByPoster?: number; // Only for microjobs
    totalEngagedCommunityByPoster?: number; // Only for community jobs
    posterAddress: string;
    posterRating?: number; // Only for microjobs
    communityScore?: number; // Only for community jobs
    posterVerified: boolean;
    communityName?: string; // Only for community jobs
    requiredVolunteers?: number; // Only for community jobs
    currentVolunteers?: number; // Only for community jobs
}

export default function JobDetails({
    id,
    name,
    type,
    location,
    title,
    description,
    salary,
    posterAvatar,
    posterId,
    postedTime,
    totalJobsByPoster,
    totalEngagedCommunityByPoster,
    posterAddress,
    posterRating,
    communityScore,
    posterVerified,
    communityName,
    requiredVolunteers,
    currentVolunteers,
}: JobDetailsProps) {
    return (
        <Card className="w-full">
            <CardHeader className="w-full min-h-[300px] bg-gray-200">
                <div className="flex flex-row justify-between flex-wrap md:space-x-12">
                    <div className="avatar rounded-full h-[204px] w-[204px] bg-green-100 text-white font-[700]
                    flex items-center justify-center hover:bg-green-500 cursor-pointer">
                        <img className="rounded-full h-[200px] w-[200px]" src={posterAvatar} alt="@shadcn" />
                    </div>
                    <div className="flex grow flex-col justify-evenly gap-3 md:gap-0">
                        <CardTitle className="text-4xl">{title}</CardTitle>
                        <div className="flex-wrap">
                            <p className="text-xl">{name}</p>
                        </div>
                        <div className="flex flex-row flex-wrap gap-3">
                            {type === "paid" ? (
                                <>
                                    <div className="bg-gray-800 rounded-md flex items-center space-x-1">
                                        <p className="p-2 text-ls text-white font-bold leading-none">Total jobs posted</p>
                                        <p className="p-2 text-ls text-black font-bold bg-white h-full px-3">
                                            {totalJobsByPoster}
                                        </p>
                                    </div>
                                    <div className="bg-gray-800 px-2 rounded-md flex items-center space-x-1">
                                        <Star className="w-5 h-5 text-yellow-400 font-bold fill-yellow-400"></Star>
                                        <p className="p-2 text-ls text-white font-bold h-full">{posterRating}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="bg-gray-800 rounded-md flex items-center space-x-1">
                                        <p className="p-2 text-ls text-white font-bold leading-none">Total engagements</p>
                                        <p className="p-2 text-ls text-black font-bold bg-white h-full px-3">
                                            {totalEngagedCommunityByPoster}
                                        </p>
                                    </div>
                                    <div className="bg-gray-800 px-2 rounded-md flex items-center space-x-1">
                                        <Handshake className="w-5 h-5 text-white font-bold fill-white"></Handshake>
                                        <p className="p-2 text-ls text-white font-bold h-full">{communityScore}</p>
                                    </div>
                                </>
                            )}
                            <div className="bg-gray-800 px-2 rounded-md flex items-center space-x-1">
                                <MapPinned className="w-5 h-5 text-white font-bold"></MapPinned>
                                <p className="p-2 text-ls text-white font-bold h-full">{posterAddress}</p>
                            </div>
                            {posterVerified ? (
                                <div className="bg-green-400 px-2 rounded-full flex items-center space-x-1">
                                    <UserRoundCheck className="w-4 h-4 text-white"></UserRoundCheck>
                                    <p className="text-sm text-white font-semibold leading-none">Verified</p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="mt-2 w-full">
                <div className="w-full flex flex-row flex-wrap gap-4">
                    <div className=" md:w-[70%] w-full">
                        <div>
                            <h2 className="py-4 text-3xl font-semibold text-center">Job Description</h2>
                            <p className="text-base font-sans">{description}</p>
                        </div>

                        <div className="mt-4">
                            <h2 className="py-4 text-3xl font-semibold text-center">Location</h2>
                            {/*map view*/}
                        </div>
                    </div>

                    <div className="flex flex-col flex-grow justify-evenly my-4 border border-gray-300 rounded-2xl shadow-md">
                        <div className="flex flex-col px-4 gap-4">
                            <div className="text-center text-2xl font-semibold my-4">
                                Job Summary
                            </div>
                            <div className="flex items-center space-x-1">
                                <MapPin className="w-6 h-6 text-red-800"></MapPin>
                                <p className="text-xl text-gray-700 leading-none">{location}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Briefcase className="w-6 h-6 text-blue-400"></Briefcase>
                                <p className="text-xl text-gray-700 leading-none">{type}</p>
                            </div>
                            {salary && (
                                <div className="flex items-center space-x-1">
                                    <HandCoins className="w-6 h-6 text-yellow-500"></HandCoins>
                                    <p className="text-xl text-gray-700 leading-none">{salary}</p>
                                </div>
                            )}
                            <div className="flex items-center space-x-1">
                                <Clock className="w-6 h-6 text-gray-500"></Clock>
                                <p className="text-xl text-gray-700">
                                    {formatDistanceToNow(new Date(postedTime), { addSuffix: true })}
                                </p>
                            </div>
                        </div>
                        <div className="my-4 mx-2">
                            <Button className="w-full">Apply now</Button>
                        </div>
                    </div>

                    {type !== "paid" && (
                        <div className="flex flex-col w-full md:w-[70%] border border-gray-300 rounded-2xl shadow-md mt-4">
                            <div className="text-center text-2xl font-semibold my-4">
                                Community Engagement
                            </div>
                            <div className="px-4 flex flex-col gap-2">
                                <p className="text-xl">Community Name: {communityName}</p>
                                <p className="text-xl">Required Volunteers: {requiredVolunteers}</p>
                                <p className="text-xl">Current Volunteers: {currentVolunteers}</p>
                            </div>
                            <div className="my-4 mx-2">
                                <Button className="w-full">View Community Page</Button>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
}
