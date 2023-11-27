"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
  const Sidebar = () => {
  const [open,setOpen] =useState(false)
  const pathname = usePathname();
  const router = useRouter();
  
  function handleLogout(){
    localStorage.removeItem("access_token");
    

    router.push("/");
  }
  function handleOpen() {
    setOpen(!open); 
  }
  

  return (
    <>
    <div className="md:flex hidden h-full">
    <div className="bg-[#FFEEB9]   w-[250px] font-opensans  ">
        <div className="flex flex-col space-y-5 p-4 items-center mt-[10px]">
          <div className=" pb-3 w-full flex justify-center">
            <Image
              src="/hugsi-logo.webp"
              width={86}
              height={75}
              alt="hugsi-logo"
            />
          </div>
          <div className="flex flex-col space-y-5 w-full text-gray-600  text-[20px] font-medium">
            <Link
              href="/Dashboard/overview"
              className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBF00] 
            py-3 rounded-md w-full px-10 items-center
              ${
                pathname === "/Dashboard/overview"
                  ? "bg-[#FFBF00] text-white rounded-md "
                  : ""
              }`}
            >
             <Image src="/icons/overview-icon.png" width={15} height={15} alt="image-icon"/>
              <h2 className="">Overview</h2>
            </Link>
            <Link
              href="/Dashboard/All-users"
              className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBF00] 
            py-3 rounded-md w-full px-10 items-center
              ${
                pathname === "/Dashboard/All-users"
                  ? "rounded-md  bg-[#FFBF00] text-white"
                  : ""
              }`}
            >
              <Image src="/icons/all-user.svg" width={18} height={18} alt="image-icon"/>

              <h2 className="">All Users</h2>
            </Link>
           
          
            <div onClick={handleLogout}
              
              className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBF00] 
            py-3 rounded-md w-full px-10 items-center cursor-pointer
              ${
                pathname === "/Dashboard/contactus-inquires"
                  ? "bg-[#FFBD59]  text-white rounded-md"
                  : ""
              }`}
            >
             <Image src="/icons/logout-icon.png" width={17} height={17} alt="image-icon"/>

              <h2 className="">Logout</h2>
            </div>
            {/*  */}
            
          
          </div>
        </div>
      </div>
    </div>

    <div> <Image onClick={handleOpen} src={`${open?"": "/icons/ham.svg"}`}   width={20} height={20} alt="hamburger-manu" className="absolute top-1 left-1 z-50  md:hidden cursor-pointer"/></div>
    <div className="flex md:hidden h-full fixed z-50">
      <Image onClick={handleOpen} src={`${open?"/icons/arrow-left.svg": ""}`}   width={20} height={20} alt="hamburger-manu" className="absolute top-1 left-1 z-50 "/>
    {open &&
    <div className="flex bg-[#FFEEB9] flex-col space-y-5 px-2 pt-5 items-center ">
    <div className=" pb-3 w-[150px] flex justify-center">
      <Image
        src="/hugsi-logo.webp"
        width={86}
        height={75}
        alt="hugsi-logo"
      />
    </div>
    <div className="flex flex-col space-y-5 w-full text-gray-600   font-medium">
      <Link
        href="/Dashboard/overview"
        className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBF00] 
      py-3 rounded-md w-full px-3  items-center
        ${
          pathname === "/Dashboard/overview"
            ? "bg-[#FFBF00] text-white rounded-md "
            : ""
        }`}
      >
       <Image src="/icons/overview-icon.png" width={15} height={15} alt="image-icon"/>
        <h2 className="">Overview</h2>
      </Link>
      <Link
        href="/Dashboard/All-users"
        className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBF00] 
      py-3 rounded-md w-full px-3  items-center
        ${
          pathname === "/Dashboard/All-users"
            ? "rounded-md  bg-[#FFBF00] text-white"
            : ""
        }`}
      >
        <Image src="/icons/all-user.svg" width={18} height={18} alt="image-icon"/>

        <h2 className="">All Users</h2>
      </Link>
     
    
      <div onClick={handleLogout}
        
        className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBF00] 
      py-3 rounded-md w-full px-3 items-center cursor-pointer
        ${
          pathname === "/Dashboard/contactus-inquires"
            ? "bg-[#FFBD59]  text-white rounded-md"
            : ""
        }`}
      >
       <Image src="/icons/logout-icon.png" width={17} height={17} alt="image-icon"/>

        <h2 className="">Logout</h2>
      </div>
      {/*  */}
      
    
    </div>
  </div>
    }
      
    
    </div>
    </>
  );
};

export default Sidebar;
