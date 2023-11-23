"use client";
import UserProfileModal from "@/app/Components/pop-up-allusers/page";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// import axios from 'axios';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const openModal = (user) => {
    setSelectedUser(user);
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

      setUsers(response.data.data); // Assuming you want to use response.data.data here
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-4 ">All users</h2>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-white  bg-[#FFBF00] text-[15px]">
            <tr>
              <th scope="col" className="  text-center py-3">
                Profile Picture
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Date of Birth
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Mobile Number
              </th>
              <th scope="col" className="px-6 py-3">
                
              </th>
            </tr>
          </thead>

          <tbody>
  {currentUsers.map((user, i) => (
    <tr
      key={user?.id}
      className="bg-white  border-b-[1px] border-gray-200 "
      
    >
      <td className="flex justify-center pt-[6px]" onClick={() => openModal(user)}>
        <Image
          src={user?.profile_pic || "/na.png"}
          alt={`${user?.name}`}
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
        />
      </td>
      <td className="px-6 py-4 border-gray-200 dark:border-gray-700 text-center">
        {user?.name || "N/A"}
      </td>
      <td className="px-6 py-4 border-gray-200 dark:border-gray-700 text-center">
        {user?.email || "N/A"}
      </td>
      <td className="px-6 py-4 border-gray-200 dark:border-gray-700">
        {user?.dob || "N/A"}
      </td>
      <td className=" py-4 text-center">{user?.phone || "N/A"}</td>
      <td className="group relative m-12">
  <span className="absolute top-[-2px] left-[-15px] scale-0 rounded  text-xs text-black group-hover:scale-100 transition-all duration-300 ease-in-out">
    View Profile
  </span>
  <Image
    onClick={() => openModal(user)}
    src="/icons/i-button.png"
    width={25}
    height={25}
    alt="i-button"
    className="cursor-pointer"
  />
</td>
    </tr>
  ))}
</tbody>

        </table>

        <div className="flex justify-center mt-4 ">
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-2 mx-1 border ${
                currentPage === index + 1 ? "bg-[#FFBF00] text-white" : "bg-[#FFEEB9]"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      {selectedUser && (
        <UserProfileModal user={selectedUser} onClose={closeModal} />
      )}
    </>
  );
}

export default AllUsers;
