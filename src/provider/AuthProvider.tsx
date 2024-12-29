'use client';
import { createContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";


export interface User {
  id: string;
  role: "user" | "admin";
  name: string;
  email?: string;
  phone?: string;
  imageURL?: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  createUser: (name: string, emailOrPhone: string , password: string ) => Promise<void>;
  signIn: (identifier: string, password: string) => Promise<void>;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const showToast = useToast();
  
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL ;

  const createUser = async (name: string, emailOrPhone: string , password: string, ): Promise<void> => {
    const isPhone = /^01[35789]\d{8}$/.test(emailOrPhone);
   
    setLoading(true);
    try {
      if(isPhone)
      {
        const response = await axios.post(`${API_URL}/api/users/register`, { name, phone: emailOrPhone , password });
        localStorage.setItem("token", response.data.token); 
        setUser(response.data?.data);
        
      }
      else
      {
        const response = await axios.post(`${API_URL}/api/users/register`, { name, email: emailOrPhone , password });
        localStorage.setItem("token", response.data.token); 
        setUser(response.data?.data);
        
      }
      
    } catch (error) {
    
      throw error;
      
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (identifier: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, { identifier, password });
      localStorage.setItem("token", response.data.token); 
      setUser(response.data?.data);
    } catch (error) {
 
      if (axios.isAxiosError(error)) {
        showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
      } else if (error instanceof Error) {
        showToast("error", error.message);
      } else {
        showToast("error", "An unknown error occurred while login");
      }
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    showToast(  "success" ,"Logged out successfully");
    setUser(null);
    router.push("/authentication");
  };

  useEffect(() => {
    const validateUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(`${API_URL}/api/users/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {

          if (axios.isAxiosError(error)) {
            showToast("error", (error.response?.data as { message?: string })?.message || "An error occurred");
          } else if (error instanceof Error) {
            showToast("error", error.message);
          } else {
            showToast("error", "An unknown error occurred while login");
          }
          logOut();
          setLoading(false);
        }
      }
      setLoading(false);
    };
    validateUser();
  }, []);

  const value: AuthContextProps = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
