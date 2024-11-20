"use client"

import React, { Dispatch, SetStateAction, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa"


const FormSchema = z.object({
  emailOrPhone: z
    .string()
    .min( 1 ,{
        message: "Email or phone is required"})
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[0-9]{10,15}$/.test(value),
      {
        message: "Enter a valid email address or phone number",
      }
    ),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
})

export default function Registration({setToggle} : {setToggle: Dispatch<SetStateAction<boolean>>}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  const [ eye , setEye] = useState(true);

  return (
    <div className=" w-[350px] md:w-[380px] rounded-2xl mx-auto p-5 md:p-7 border shadow-2xl ">
        {/* social register */}
        <div className=" pb-3 border-b border-black" >
           <h1 className=" text-xl md:text-2xl font-bold text-black text-center">Register  with</h1>
           <div className=" flex gap-2 justify-center">
                <button className=" border shadow-2xl text-white p-3 rounded-md mt-2"><FcGoogle /></button>
                <button className=" border shadow-2xl text-sky-500 p-3 rounded-md mt-2"><FaFacebook /></button>
           </div>
           <h1 className=" text-xs md:text-[14px] mt-3 font-bold text-gray-500 text-center">OR use Email or Phone number to Register</h1>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-2">
          {/* Email/Phone Field */}
          <FormField
            control={form.control}
            name="emailOrPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Phone  </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email or phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password  </FormLabel>
                <FormControl>
                    <div className=" relative">
                    <Input type={eye ? "password" : "text" } placeholder="Enter your password" {...field} />
                    <p onClick={()=> setEye(!eye)} className="absolute right-2 top-2">
                        {eye ? <FaEyeSlash /> : <FaEye />
                        }
                    </p>
                    </div>
                 
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button type="submit" className=" bg-sky-400 w-full text-[16px] shadow-lg shadow-sky-100 font-bold text-black hover:bg-sky-100">Register</Button>
        </form>
      </Form>
      <h1 className=" text-xs md:text-[14px] mt-5 font-bold text-gray-500 text-center">You can modify your profile in dashboard</h1>
      <div>
        <p className="text-center mt-2 text-gray-500">{`Have an account? `} <button onClick={() => setToggle(false)}  className="text-sky-400 underline">Login here</button></p>
      </div>
    </div>
  )
}
