"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  // const handleLogout = () => {
  //   localStorage.removeItem("token-jabalpur-estate-admin");
  //   localStorage.removeItem("token-time-jabalpur-estate-admin");

  //   router.push("/");
  // };
  function handleLogout(){
    localStorage.removeItem("token-name");
    localStorage.removeItem("token-time");

    router.push("/");
  }

  return (
    <>
      <div className="bg-[#FFEEB9] fixed  min-h-screen font-opensans">
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
    </>
  );
};

export default Sidebar;
