'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";

import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { SiFreelancer } from "react-icons/si";
import { FcAbout } from "react-icons/fc";


import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";

import useToast from "@/hooks/useToast";

import axios from "axios";

import Link from "next/link";


const UserProfile = () => {
    
    const authContext = useContext(AuthContext);
    if (!authContext) {
      throw new Error("AuthContext must be used within an AuthProvider");
    }
  
    const { logOut , user  } = authContext;
    const showToast = useToast();

    const handleLogout = async () => {
        try {
            
            logOut();
            
        } catch (error) {

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
        <DropdownMenu>
            <DropdownMenuTrigger>
                {/* Trigger can include user profile picture and name */}
                <div className="flex items-center space-x-2 cursor-pointer">
                   
                     <Image
                        src="https://i.ibb.co.com/TtPv8g8/micro-service-logo.jpg" 
                        alt="User Avatar"
                        width={64}
                        height={64}
                        className="w-10 h-10 hidden md:block rounded-full"
                    />
                   
                    <Image
                        src="https://i.ibb.co.com/TtPv8g8/micro-service-logo.jpg" 
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="w-8 h-8 md:hidden rounded-full"
                    />
                   
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
           
                <div className="flex my-1 items-center gap-3 px-1 ">
                    <Image
                        src="https://i.ibb.co.com/TtPv8g8/micro-service-logo.jpg" 
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">{user?.name}</span>
                        <span className="text-xs text-gray-500">{user?.role}</span>
                    </div>
                </div>
             
                <DropdownMenuSeparator />
                {/* here I will write navigation for mobile device */}
                  
                <div className=" md:hidden" >
                <DropdownMenuItem>
                    <Link href="/">
                    <div className="flex items-center space-x-2">
                         <FaHome />
                        <span>Home</span>
                    </div>
                    </Link>
                   
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/jobs">
                    <div className="flex items-center space-x-2">
                         <SiFreelancer />
                        <span>Browse Job</span>
                    </div>
                    </Link>
                   
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/about_us">
                    <div className="flex items-center space-x-2">
                         <FcAbout />
                        <span>About us</span>
                    </div>
                    </Link>
                   
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                </div>
                
                {/* Menu Items */}
                <DropdownMenuItem>
                    <Link href={"/dashboard/user"}>
                    <div className="flex items-center space-x-2">
                         <MdDashboard />
                        <span>Dashboard</span>
                    </div>
                    </Link>
                   
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div className="flex items-center space-x-2">
                        <CgProfile />
                        <span>Profile</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <button onClick={() => handleLogout()}>
                    <div className="flex items-center space-x-2">
                        <IoLogOut />
                        <p>Logout</p>
                    </div>
                    </button>
                   
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserProfile;
