"use client";
import UserProfileModal from "@/app/Components/pop-up-allusers/page";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Skeleton from "@/app/Components/skeleton/page";
import Pagination from "@/app/Components/pagination/page";
import NotificationModal from "@/app/Components/notification-modal/page";

// import axios from 'axios';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [SelectedUserNameForNotification, setSelectedUserNameForNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notificationModalVisible,setNotificationModalVisible]=useState(false)
  const [allDetailsOfUser,setAllDetailsOfUser] =useState()
  const usersPerPage = 10;
  const openModal = (userId) => {
    setSelectedUser(userId);
    // console.log(userId, "user");
  };

 const openNotificationModal=(userId)=>{
  setAllDetailsOfUser(userId)
  setNotificationModalVisible(!notificationModalVisible)
  setSelectedUserNameForNotification(userId?.id)
  }
  
  const closeModal2 = () => {
    setNotificationModalVisible(null);
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
      setLoading(false);
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
  const handleCheckboxChange = (userId) => {
    // Do something with the user ID, for example, store it in state
    console.log("Selected user ID:" ,userId);
  };
  


// console.log(indexOfLastUser,"curr")
// console.log(indexOfFirstUser,"curr")
// console.log(currentUsers,"curr")
  return (
    <div >
      <h2 className="text-lg font-semibold mb-4 ">All users</h2>
      <div className="relative overflow-x-auto">
        {loading ? (
          <Skeleton />
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md ">
            <thead className="text-white   bg-[#FFBF00] text-[15px]">
              <tr>
                <th scope="col" className="  text-center py-3 ">
                 
                </th>
                <th scope="col" className="  text-center py-3 ">
                  Profile Picture
                </th>
                <th scope="col" className="px-6 py-3 text-center ">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-center ">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Date of Birth
                </th>
                <th scope="col" className="px-6 py-3 text-center ">
                  Mobile Number
                </th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>

            <tbody >
              {currentUsers.map((user, i) => (
                <tr
                  key={user?.id}
                  className="bg-white py-10     border-b-[1px] border-gray-200 "
                >
                 <td className="lg:px-6     px-3 lg:py-4 py-2 border-gray-200 dark:border-gray-700 text-center">
                    <input type="checkbox" 
                    onChange={() => handleCheckboxChange(user?.id)}
                    />
                  </td>

                  <td
                    className="flex  justify-center pt-[6px]"
                    onClick={() => openModal(user?.id)}
                  >
                    <Image
                      src={user?.profile_pic || "/na.png"}
                      alt={`${user?.name}`}
                      width={40}
                      height={40}
                      className="rounded-full cursor-pointer"
                    />
                  </td>
                  <td className="lg:px-6     px-3 lg:py-4 py-2 border-gray-200 dark:border-gray-700 text-center">
                    {user?.name || "N/A"}
                  </td>
                  <td className="lg:px-6 px-3 lg:py-4 py-2 border-gray-200 dark:border-gray-700 text-center">
                    {user?.email || "N/A"}
                  </td>
                  <td className="lg:px-6 px-3 lg:py-4 py-2 border-gray-200 dark:border-gray-700">
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
                  <td className="group relative m-12">
                    {/* <span className="absolute top-[-2px] left-[-15px] scale-0 rounded  text-xs text-gray-400 group-hover:scale-100 transition-all duration-300 ease-in-out">
                    Notify User
                    </span> */}
                  <Image
                      // onClick={() => openNotificationModal(user?.id)}
                      onClick={() => openNotificationModal(user)}
                      src="/notiication-bell.svg"
                      width={25}
                      height={25}
                      alt="i-button"
                      className="cursor-pointer transition-transform transform hover:scale-125"
                    />
                    {console.log(user)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Pagination
          totalUsers={users.length}
          usersPerPage={usersPerPage}
          currentPage={currentPage}
          onPageChange={paginate}
        />
      </div>
      {selectedUser && (
        <UserProfileModal user={selectedUser} onClose={closeModal} />
      )}
      {
        notificationModalVisible && (
        <NotificationModal
        isOpen={notificationModalVisible}
        onClose={closeModal2}
        userId={SelectedUserNameForNotification}
        userAllDetails={allDetailsOfUser}
        />)
        }


    </div>
  );
}

export default AllUsers;
