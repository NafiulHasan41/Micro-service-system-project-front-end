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
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import useToast from "@/hooks/useToast";
import axios from "axios";


const UserProfile = () => {
    
    const authContext = useContext(AuthContext);
    if (!authContext) {
      throw new Error("AuthContext must be used within an AuthProvider");
    }
  
    const { logOut  } = authContext;
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
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
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
                        <span className="text-sm font-medium">Tom Smith</span>
                        <span className="text-xs text-gray-500">user/admin</span>
                    </div>
                </div>
             
                <DropdownMenuSeparator />
                {/* here I will write navigation for mobile device */}
                  
                
                
                {/* Menu Items */}
                <DropdownMenuItem>
                    <button>
                    <div className="flex items-center space-x-2">
                         <MdDashboard />
                        <span>Dashboard</span>
                    </div>
                    </button>
                   
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
