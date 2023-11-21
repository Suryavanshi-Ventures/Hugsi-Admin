"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const isAuthenticated = () => {
    // const token = localStorage.getItem("token-jabalpur-estate-admin");
    // const tokenTime = localStorage.getItem("token-time-jabalpur-estate-admin");
    const token = localStorage.getItem("token-name");
    const tokenTime = localStorage.getItem("token-time");
    if (!token) {
      return false;
    }
 
    const dif = (Date.now()-tokenTime)/(1000*60*60);
  
    if(dif >= 2){
      localStorage.removeItem("token-name");
      localStorage.removeItem("token-time");
      return false;
    }
    return !!token;
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
