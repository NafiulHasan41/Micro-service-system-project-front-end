import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { Button } from "../../ui/button";
import { MapPin } from "lucide-react";
import { Clock } from "lucide-react";

import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  id: number;
  name: string;
  type: string; // "community" / "part time" / "microjob"
  location: string;
  title: string;
  description: string;
  tags: string[];
  salary?: string; // community task will have no salary
  posterAvatar: string;
  posterId: number;
  postedTime: string;
}

export default function JobCard({
  id,
  name,
  type,
  location,
  title,
  description,
  tags,
  salary,
  posterAvatar,
  posterId,
  postedTime,
}: JobCardProps) {
  return (
    <Card
      key={id}
      className={`md:w-[400px] w-[300px] m-2 border p-1 rounded-lg shadow-lg transition-all hover:shadow-xl ${
        type === "volunteer" ? "bg-green-200" : " bg-sky-100"
      }`}
    >
      <CardHeader key={posterId} className="h-min-[200px]">
        <div className="flex items-center justify-between gap-2 rounded-[8px]">
          <div
            className="avatar rounded-full min-h-11 min-w-11 bg-green-100 text-white fond-[700]
                    flex items-center justify-center hover:bg-green-500 cursor-pointer"
          >
            <Avatar>
              <AvatarImage src={posterAvatar} alt="@shadcn" />
            </Avatar>
          </div>
          <div className="grow">
            <p className="text-xs text-gray-500">Posted by</p>
            <p className="font-bold text-black">{name}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-gray-500"></Clock>
            <p className="text-sm text-gray-700">
              {formatDistanceToNow(new Date(postedTime), { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-red-800"></MapPin>
          <p className="text-sm text-gray-700 leading-none">{location}</p>
        </div>
      </CardHeader>

      <CardContent>
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-1 flex-wrap">
          {tags.map((tag, index) => (
            <p
              key={index}
              className="text-xs text-black px-2 bg-gray-100 border font-medium rounded-xl"
            >
              {tag}
            </p>
          ))}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardContent>

      <CardFooter className=" flex justify-between">
        {salary ? (
          <p className="text-sm bg-yellow-200 text-gray-700 font-bold border px-2 py-1 rounded-xl">{`${salary}`}</p>
        ) : (
          <div className="w-16" />
        )}
        <Button className=" hover:bg-sky-100 hover:scale-110 bg-sky-300 text-black font-semibold">
         
          {
            salary? "apply" : "Join"

          }
        </Button>
      </CardFooter>
    </Card>
  );
}
