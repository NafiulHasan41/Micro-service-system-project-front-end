import { Bookmark, Briefcase, Calendar, HeartHandshake, Home, Inbox, LayoutDashboard, LogOut, Search, Settings, Star } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu start.
const start = [
    {
        title: "Dashboard",
        url: "dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Inbox",
        url: "inbox",
        icon: Inbox,
    },
    {
        title: "Bookmarks",
        url: "bookmarks",
        icon: Bookmark,
    },
    {
        title: "Reviews",
        url: "reviews",
        icon: Star,
    },
]

const microJobs = [
    {
        title: "My jobs",
        url: "my-jobs",
    },
    {
        title: "Post a Job",
        url: "post-job",
    },
    {
        title: "Manage Candidates",
        url: "manage-candidates",
    },


]

const volunteerJobs = [
    {
        title: "Joined Communities",
        url: "joined-communities",
    },
    {
        title: "Start a new community",
        url: "start-commmunity",
    },
    {
        title: "Manage Volunteers",
        url: "manage-volunteers",
    },


]

const account = [
    {
        title: "Settings",
        url: "settings",
        icon: Settings,
    },
    {
        title: "Logout",
        url: "#",
        icon: LogOut,
    }
]

export function AppSidebar() {
    return (
        <Sidebar className="pl-4 bg-gray-100 h-screen border-r border-gray-200">
            <div className="h-full flex flex-col">
                <div className="flex-shrink-0 overflow-y-auto">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">
                                Personal
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {start.map((item) => (
                                        <SidebarMenuItem
                                            className="mt-2 p-2 rounded-md hover:bg-gray-200 transition"
                                            key={item.title}
                                        >
                                            <Link
                                                href={`/user/${item.url}`}
                                                className="flex items-center space-x-3"
                                            >
                                                <item.icon className="w-5 h-5 text-gray-700" />
                                                <span className="text-base text-gray-700 leading-none">
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </div>

                <div className="flex-shrink-0 max-h-[30%] overflow-y-auto mt-4">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">
                                Organize and Manage
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <Collapsible>
                                        <SidebarMenuItem className="mt-2 p-2 rounded-md hover:bg-gray-200 transition">
                                            <CollapsibleTrigger>
                                                <div className="flex items-center space-x-3">
                                                    <Briefcase className="w-5 h-5 text-gray-700" />
                                                    <p className="text-base text-gray-700 leading-none">
                                                        Micro Jobs
                                                    </p>
                                                </div>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                {microJobs.map((item) => (
                                                    <SidebarMenuSub
                                                        className="py-2 pl-8"
                                                        key={item.title}
                                                    >
                                                        <Link
                                                            href={`/user/${item.url}`}
                                                            className="flex items-center space-x-3 text-gray-600 hover:text-gray-800"
                                                        >
                                                            <p className="text-sm">{item.title}</p>
                                                        </Link>
                                                    </SidebarMenuSub>
                                                ))}
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>

                                    <Collapsible>
                                        <SidebarMenuItem className="mt-2 p-2 rounded-md hover:bg-gray-200 transition">
                                            <CollapsibleTrigger>
                                                <div className="flex items-center space-x-3">
                                                    <HeartHandshake className="w-5 h-5 text-gray-700" />
                                                    <p className="text-base text-gray-700 leading-none">
                                                        Volunteer Jobs
                                                    </p>
                                                </div>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                {volunteerJobs.map((item) => (
                                                    <SidebarMenuSub
                                                        className="py-2 pl-8"
                                                        key={item.title}
                                                    >
                                                        <Link
                                                            href={`/user/${item.url}`}
                                                            className="flex items-center space-x-3 text-gray-600 hover:text-gray-800"
                                                        >
                                                            <p className="text-sm">{item.title}</p>
                                                        </Link>
                                                    </SidebarMenuSub>
                                                ))}
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </div>

                <div className="flex-shrink-0 mt-4">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">
                                Account
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {account.map((item) => (
                                        <SidebarMenuItem
                                            className="my-2 p-2 rounded-md hover:bg-gray-200 transition"
                                            key={item.title}
                                        >
                                            <Link
                                                href={`/user/${item.url}`}
                                                className="flex items-center space-x-3"
                                            >
                                                <item.icon
                                                    className={`w-5 h-5 ${item.title === "Logout"
                                                            ? "text-red-600"
                                                            : "text-gray-700"
                                                        }`}
                                                />
                                                <p
                                                    className={`text-base leading-none ${item.title === "Logout"
                                                            ? "text-red-600 hover:text-red-800"
                                                            : "text-gray-700"
                                                        }`}
                                                >
                                                    {item.title}
                                                </p>
                                            </Link>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </div>
            </div>
        </Sidebar>
    );
}

