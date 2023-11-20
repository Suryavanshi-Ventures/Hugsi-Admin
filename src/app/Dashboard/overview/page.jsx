import Image from 'next/image'
import React from 'react'

function OverView() {
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
      name: 'User 3',
      email: 'user2@example.com',
      dob: '1995-05-05',
      mobileNumber: '9876543210',
    },
    {
      id: 4,
      profilePicture: '/profile-pic.png',
      name: 'User 4',
      email: 'user2@example.com',
      dob: '1995-05-05',
      mobileNumber: '9876543210',
    },]
  return (
    <>
    <div className='w-[15%] bg-[#FFBF00] h-[70px] flex  items-center justify-around rounded-md'>
  <div>
  <Image
      src="/profile.png"
      alt="image"
      width={40}
      height={40}
      className="rounded-full"
    />
  </div>
  <div className='text-white font-semibold'>Total User {users.length}</div>
    </div>

    <h2 className='text-lg font-semibold my-4 '>Recent User</h2>
<div className="relative overflow-x-auto"> 

  <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className=" text-white uppercase bg-[#FFBF00]  text-[15px] ">
      <tr >
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
    <Image
      src={user.profilePicture}
      alt={`Profile of ${user.name}`}
      width={40}
      height={40}
      className="rounded-full"
    />
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
  <td className="px-6 py-4">{user.mobileNumber}</td>
</tr>
))}
</tbody>

   
  </table>
 
</div>
</>
  )
}

export default OverView
