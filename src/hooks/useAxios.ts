'use client';
import axios from "axios";

const useAxios = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null; 

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }), 
    },
  });

  return instance;
};

export default useAxios;
