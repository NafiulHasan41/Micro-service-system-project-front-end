"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/user/sidebar"
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  return (
    <SidebarProvider>
      <div className="relative flex h-full">
        <div
          className={cn(
            "transition-transform transform duration-300",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
            " bg-gray-100 border-r shadow-md"
          )}
        >
          <AppSidebar />
        </div>
      <main>
        <SidebarTrigger />
        {children}
      </main>
      </div>
    </SidebarProvider>
  )
}
