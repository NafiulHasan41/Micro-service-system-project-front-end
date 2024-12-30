import * as React from "react";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Hourglass, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AppliedJobCardProps {
  id: number;
  type: string; // "community" / "part time" / "microjob"
  status: string; // "Pending approval" / "Ongoing" / "Completed"
  title: string;
  posterId: number;
  postedTime: string;
}

export default function AppliedJobCard(
  {
    id,
    type,
    status,
    title,
    posterId,
    postedTime,
  }: AppliedJobCardProps
) {
  // Map status to color and icon
  const statusStyles: Record<
    string,
    { bg: string; icon: React.ElementType }
  > = {
    "Pending Approval": {
      bg: "bg-blue-300",
      icon: Hourglass,
    },
    "Ongoing": {
      bg: "bg-yellow-300",
      icon: AlertTriangle,
    },
    "Completed": {
      bg: "bg-green-300",
      icon: CheckCircle,
    },
  };

  const currentStatus = statusStyles[status] || {
    bg: "bg-gray-300",
    icon: Hourglass,
  };
  const StatusIcon = currentStatus.icon;

  return (
    <Card
      key={id}
      className="md:w-[400px] w-[300px] m-2 border p-1 rounded-lg shadow-lg transition-all hover:shadow-xl"
    >
      <CardHeader>
        <div>
          <CardTitle className="flex justify-between">
            {title}
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-500"></Clock>
              <p className="text-sm text-gray-700">
                {formatDistanceToNow(new Date(postedTime), { addSuffix: true })}
              </p>
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div
          className={`flex items-center space-x-1 ${currentStatus.bg} rounded-full py-1 px-3 text-sm`}
        >
          <StatusIcon className="w-4 h-4 text-gray-700" />
          <span className="text-gray-800">{status}</span>
        </div>
        <Button className="hover:bg-black hover:scale-110 bg-blue-600 text-white font-semibold">
          See Details
        </Button>
      </CardFooter>
    </Card>
  );
}
