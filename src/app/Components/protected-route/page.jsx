"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");
  
    return !!token; // true
  };
  
const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {

if (!isAuthenticated()) {

    router.push("/");
  }
}, [router]);

  return children;
};

export default PrivateRoute;
