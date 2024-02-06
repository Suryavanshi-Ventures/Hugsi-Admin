"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import UserProfileModal from "@/app/Components/pop-up-allusers/page";
import Skeleton from "@/app/Components/skeleton/page";
import Pagination from "@/app/Components/pagination/page";
import NotificationModal from "@/app/Components/notification-modal/page";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [sendingSelectedIds, setSendingSelectedIds] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [SelectedUserNameForNotification, setSelectedUserNameForNotification] =
    useState(null);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [allDetailsOfUser, setAllDetailsOfUser] = useState();
  const [InputValue, setInputValue] = useState("");
  const [FilteredOptionsMedicalCond, setFilteredOptionsMedicalCond] = useState(
    []
  );

  const usersPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSendingSelectedIds(selectedId);
  }, [selectedId]);

  useEffect(() => {
    const storedSelectedIds = localStorage.getItem("selectedIds");
    if (storedSelectedIds) {
      setSelectedId(JSON.parse(storedSelectedIds));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedIds", JSON.stringify(selectedId));
  }, [selectedId]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin_get_users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data.data);
      setFilteredOptionsMedicalCond(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = (userId) => {
    setSelectedUser(userId);
  };

  const openNotificationModal = (userId) => {
    setAllDetailsOfUser(userId);
    setSendingSelectedIds(selectedId);
    setNotificationModalVisible(!notificationModalVisible);
    setSelectedUserNameForNotification(userId?.id);
  };

  const toggleSelectAll = () => {
    setSelectAllChecked(!selectAllChecked);
    setSelectedId(selectAllChecked ? [] : users.map((user) => user.id));
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const closeModal2 = () => {
    setNotificationModalVisible(null);
  };

  const handleMultipleIds = () => {
    setNotificationModalVisible(!notificationModalVisible);
  };

  const OnInputChange = (e) => {
    const text = e.target.value;
    setInputValue(text);
    const filtered = users.filter((option) =>
      option?.name?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredOptionsMedicalCond(filtered);
  };

  const handleCheckboxChange = (userId) => {
    if (userId === "select-all") {
      toggleSelectAll();
    } else {
      setSelectedId((prevSelected) => {
        const isSelected = prevSelected.includes(userId);
        return isSelected
          ? prevSelected.filter((id) => id !== userId)
          : [...prevSelected, userId];
      });
      setSelectAllChecked((prevSelectAll) => {
        if (prevSelectAll && selectedId.length === users.length - 1) {
          return false;
        }
        return selectedId.length === users.length - 1;
      });
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = FilteredOptionsMedicalCond.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // -------------------------------------

  return (
    <div>
      <div className="flex items-center justify-between my-5">
        <div className="flex justify-center items-center">
          <h2 className="text-lg font-semibold  ">All users</h2>
        </div>

        <div className="flex items-center  gap-5">
          <div className="flex   items-center ">
            {/* SEARCH INPUT */}
            <div className="relative">
              <span className="absolute top-0  inset-y-0 left-0 flex items-center  min-[576px]:pl-5">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.1759 13.201C15.267 11.8802 15.9561 10.1862 15.9561 8.31985C15.9561 4.12777 12.5393 0.710938 8.34719 0.710938C4.15511 0.710938 0.738281 4.12777 0.738281 8.31985C0.738281 12.5119 4.15511 15.9288 8.34719 15.9288C10.1848 15.9288 11.9076 15.2684 13.2284 14.1486L19.1432 20.0634C19.2868 20.207 19.4591 20.2644 19.6314 20.2644C19.8036 20.2644 19.9759 20.207 20.1195 20.0634C20.3779 19.805 20.3779 19.3456 20.1195 19.0872L14.1759 13.201ZM8.31848 14.5505C4.87294 14.5505 2.08779 11.7654 2.08779 8.31985C2.08779 4.8743 4.87294 2.08916 8.31848 2.08916C11.764 2.08916 14.5492 4.8743 14.5492 8.31985C14.5492 11.7654 11.764 14.5505 8.31848 14.5505Z"
                    fill="#C7C7C7"
                  />
                </svg>
              </span>
              <input
                type="text"
                name="search"
                className="w-full pl-10 min-[576px]:pl-14  border focus-visible:outline-primary border-primary rounded-lg p-[10px] text-xs md:text-sm"
                placeholder="Search..."
                value={InputValue}
                onChange={OnInputChange}
                // onChange={(event) => setSearchInputValue(event.target.value)}
              />
            </div>
          </div>

          {selectedId.length > 1 ? (
            <button
              onClick={handleMultipleIds}
              className=" flex   pl-3 py-2 w-40  text-white bg-[#FFBF00] rounded-lg font-semibold text-center transition duration-200 ease-out hover:shadow-md"
            >
              Send Notification
            </button>
          ) : (
            <button className="mb-4  hidden  bg-yellow-400">
              Send notification
            </button>
          )}
        </div>
      </div>
      <div className="relative overflow-x-auto">
        {loading ? (
          <Skeleton />
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md ">
            <thead className="text-white   bg-[#FFBF00] text-[15px]">
              <tr>
                <th scope="col" className=" text-center py-3 ">
                  {/* <button onClick={toggleSelectAll}> onClick={toggleSelectAll}   </button> */}

                  <div className="flex justify-center">
                    <Image
                      onClick={toggleSelectAll}
                      src="/selectall.svg"
                      height={25}
                      width={25}
                      alt="Select-all-image"
                      className="cursor-pointer"
                    />
                  </div>
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

            <tbody>
              {currentUsers.map((user, i) => (
                <tr
                  key={user?.id}
                  className="bg-white py-10     border-b-[1px] border-gray-200 "
                >
                  <td className="lg:px-6     px-3 lg:py-4 py-2 border-gray-200 dark:border-gray-700 text-center">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(user?.id)}
                      checked={
                        selectAllChecked || selectedId.includes(user?.id)
                      }
                      className="accent-yellow-700"
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
      {notificationModalVisible && (
        <NotificationModal
          isOpen={notificationModalVisible}
          onClose={closeModal2}
          userId={SelectedUserNameForNotification}
          userAllDetails={allDetailsOfUser}
          sendingSelectedIdsToNotification={sendingSelectedIds}
        />
      )}
    </div>
  );
}

export default AllUsers;
