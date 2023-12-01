"use client";
import UserProfileModal from "@/app/Components/pop-up-allusers/page";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Skeleton from "@/app/Components/skeleton/page";

function OverView() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const openModal = (userid) => {
    setSelectedUser(userid);
    console.log(userid,"id h bero")
  };

  const closeModal = () => {
    setSelectedUser(null);
  };
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin_get_users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data.data);
      setLoading(false) 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="sm:w-[20%] w-[40%] bg-[#FFBF00] h-[70px] flex  items-center justify-around rounded-md">
        <div>
          <Image
            src="/profile.png"
            alt="image"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="text-white font-semibold">
          Total User : {users.length}
        </div>
      </div>

      <h2 className="text-lg font-semibold my-4 ">Recent User</h2>
      <div className="relative overflow-x-auto">

      {loading ? (
         
          <Skeleton />
        ) : (
        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className=" text-white  bg-[#FFBF00]  text-[15px] ">
          <tr>
              <th scope="col" className="  text-center py-3">
                Profile Picture
              </th>
              <th scope="col" className="px-3  lg:px-6 lg:py-4 py-2 text-center">
                Name
              </th>
              <th scope="col" className="px-3  lg:px-6 lg:py-4 py-2 text-center">
                Email
              </th>
              <th scope="col" className="px-3  lg:px-6 lg:py-4 py-2">
                Date of Birth
              </th>
              <th scope="col" className="px-3  lg:px-6 lg:py-4 py-2 text-center">
                Mobile Number
              </th>
              <th scope="col" className="px-3  lg:px-6 lg:py-4 py-2">
                
              </th>
            </tr>
          </thead>

          <tbody>
            {users.slice(-5).map((user, i) => (
               <tr
               key={user?.id}
               className="bg-white  border-b-[1px] border-gray-200 "
               
             >
               <td className="flex justify-center pt-[6px]" >
                 <Image
                   src={user?.profile_pic || "/na.png"}
                   alt={`${user?.name}`}
                   width={40}
                   height={40}
                   onClick={() => openModal(user?.id)}
                   className="rounded-full cursor-pointer"
                 />
               </td>
               <td className=" px-3  lg:px-6 lg:py-4 py-2 border-gray-200 dark:border-gray-700 text-center">
                 {user?.name || "N/A"}
               </td>
               <td className="px-3  lg:px-6 lg:py-4 py-2 border-gray-200 dark:border-gray-700 text-center">
                 {user?.email || "N/A"}
               </td>
               <td className="px-3  lg:px-6 lg:py-4 py-2 border-gray-200 dark:border-gray-700">
                 {user?.dob || "N/A"}
               </td>
               <td className=" py-4 text-center">{user?.phone || "N/A"}</td>
               <td className="group relative m-12">
           {/* <span className="absolute top-[-2px] left-[-15px] scale-0 rounded  text-xs text-gray-400 group-hover:scale-100 transition-all duration-300 ease-in-out">
             View Profile
           </span> */}
           <Image
             onClick={() => openModal(user?.id)}
             src="/icons/i-button.png"
             width={25}
             height={25}
             alt="i-button"
             className="cursor-pointer transition-transform transform hover:scale-125"
           />
         </td>
             </tr>
            ))}
          </tbody>
        </table>
          )}
      </div>
      {selectedUser && (
        <UserProfileModal user={selectedUser} onClose={closeModal} />
      )}
    </>
  );
}

export default OverView;
