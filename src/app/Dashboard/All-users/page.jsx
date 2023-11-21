"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';

function AllUsers() {
//  const [users,setUsers]=useState()

  const users = [
  {
    id: 1,
    profile_pic: '/profile-pic.png',
    name: 'User 1',
    email: 'user1@example.com',
    dob: '1990-01-01',
    phone: '1234567890',
  },
  {
    id: 2,
    profile_pic: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    phone: '9876543210',
  },
  {
    id: 3,
    profile_pic: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    phone: '9876543210',
  },
  {
    id: 4,
    profile_pic: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    phone: '9876543210',
  },
  {
    id: 5,
    profile_pic: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    phone: '9876543210',
  },
  {
    id: 6,
    profile_pic: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    phone: '9876543210',
  },
  {
    id: 7,
    profile_pic: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    phone: '9876543210',
  },
  {
    id: 8,
    profile_pic: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    phone: '9876543210',
  },
  {
    id: 9,
    profile_pic: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    phone: '9876543210',
  },
  // Add more users as needed
];
  // const fetchData = async () => {
  //   try {
  //     const item = "";
     
  //     const response = await axios.get("https://backend.hugsi.com/get_all_users", 
  //       {
  //         headers: {
  //           Authorization: `Bearer ${item}`,
  //         },
  //       }
  //     );
      
  //     // setUsers(response.data.data);
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <h2 className='text-lg font-semibold mb-4 '>All users</h2>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-white uppercase bg-[#FFBF00] text-[15px]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Profile Picture
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Date of Birth
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile Number
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => (
              <tr
                key={user.id}
                className="bg-white dark:bg-gray-800 border-b-[1px] border-gray-200 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="pl-[80px] font-medium text-gray-900 whitespace-nowrap dark:text-white border-gray-200 dark:border-gray-700"
                >
                  {user.profile_pic && (
                    <Image
                      src={user.profile_pic}
                      alt={`Profile of ${user.name}`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                </th>
                <td className="px-6 py-4 border-gray-200 dark:border-gray-700">
                  {user.name}
                </td>
                <td className="px-6 py-4 border-gray-200 dark:border-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 border-gray-200 dark:border-gray-700">
                  {user.dob}
                </td>
                <td className="px-6 py-4">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllUsers;
