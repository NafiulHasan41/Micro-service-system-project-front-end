'use client'
import { useContext } from "react";
import React from "react";
import { AuthContext } from "./AuthProvider";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute = ({ children, adminOnly }: PrivateRouteProps) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const showToast = useToast();

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user, loading } = authContext;

  if (loading) {
      return <>
      <div className="flex justify-center items-center min-h-[calc(100vh-11rem)]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
      </div>
      </>; 
  }

  if (!user) {
    router.push("/authentication"); 
    showToast("warning", "You must be logged in to view this page");
    return null;

  }

  if (adminOnly && user.role !== "admin") {

    router.push("/"); 
    showToast("warning", "You are not authorized to view this page");
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
