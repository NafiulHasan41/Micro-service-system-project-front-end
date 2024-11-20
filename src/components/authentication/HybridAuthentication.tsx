'use client'
import Login from "@/components/authentication/Login";
import Registration from "@/components/authentication/Registration";
import { useState } from "react";

export default function HybridAuthentication() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      {/* Login Component */}
      <div
        className={`absolute w-full transition-transform duration-700 ease-in-out ${
          toggle ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <Login setToggle={setToggle} />
      </div>

      {/* Registration Component */}
      <div
        className={`absolute w-full transition-transform duration-700 ease-in-out ${
          toggle ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Registration setToggle={setToggle} />
      </div>
    </div>
  );
}
