"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");
  
    return !!token; // Return true if the token is present, false otherwise
  };
  
const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {

if (!isAuthenticated()) {
    // User is not authenticated, redirect to the login page
    router.push("/");
  }
}, []);

  return children;
};

export default PrivateRoute;
