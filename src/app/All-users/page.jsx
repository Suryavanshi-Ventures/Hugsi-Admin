import Image from 'next/image';
import React from 'react';

const users = [
  {
    id: 1,
    profilePicture: '/profile-pic.png',
    name: 'User 1',
    email: 'user1@example.com',
    dob: '1990-01-01',
    mobileNumber: '1234567890',
  },
  {
    id: 2,
    profilePicture: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    mobileNumber: '9876543210',
  },
  {
    id: 3,
    profilePicture: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    mobileNumber: '9876543210',
  },
  {
    id: 4,
    profilePicture: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    mobileNumber: '9876543210',
  },
  {
    id: 5,
    profilePicture: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    mobileNumber: '9876543210',
  },
  {
    id: 6,
    profilePicture: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    mobileNumber: '9876543210',
  },
  {
    id: 7,
    profilePicture: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    mobileNumber: '9876543210',
  },
  {
    id: 8,
    profilePicture: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    mobileNumber: '9876543210',
  },
  {
    id: 9,
    profilePicture: '/profile-pic.png',
    name: 'User 2',
    email: 'user2@example.com',
    dob: '1995-05-05',
    mobileNumber: '9876543210',
  },
  // Add more users as needed
];

function AllUsers() {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-[#FFBF00]  text-[15px]">
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
          {users.map((user) => (
            <tr key={user.id} className="bg-white dark:bg-gray-800">
              <th scope="row" className="pl-[80px] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Image src={user.profilePicture} alt={`Profile of ${user.name}`} width={40} height={40} className=" rounded-full" />
              </th>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.dob}</td>
              <td className="px-6 py-4">{user.mobileNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllUsers;
