"use client";
import React, { useEffect, useState } from "react";
import Skeleton from "@/app/Components/skeleton/page";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [recentActiveUsers, setRecentActiveUsers] = useState([]);
  const [InputValue, setInputValue] = useState("");
  const [InputActiveValue, setInputActiveValue] = useState("");
  const [FilteredOptionsMedicalCond, setFilteredOptionsMedicalCond] = useState(
    []
  );
  const [
    filteredActiveOptionsMedicalCond,
    setFilteredActiveOptionsMedicalCond,
  ] = useState([]);
  const usersPerPage = 10;

  const [AlertDetails, setAlertDetails] = useState({
    isOpen: false,
    message: "",
    duration: 3000,
    position: "bottom",
    type: "success",
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin_get_users?filltr=newadded`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.data);
      setFilteredOptionsMedicalCond(response.data.data);
      setLoading(false);
    } catch (error) {
      setAlertDetails({
        isOpen: true,
        message: "Error fetching recent  users:",
        duration: 3000,
        position: "top",
        type: "danger",
      });
      console.error("Error fetching data:", error);
    }
  };
  const fetchRecentActiveUsers = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin_get_users?filltr=recentactive`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecentActiveUsers(response.data.data);
      setFilteredActiveOptionsMedicalCond(response.data.data);
      setLoading(false);
    } catch (error) {
      setAlertDetails({
        isOpen: true,
        message: "Error fetching recent active users",
        duration: 3000,
        position: "top",
        type: "danger",
      });
      console.error("Error fetching recent active users:", error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = FilteredOptionsMedicalCond.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const currentActiveUsers = filteredActiveOptionsMedicalCond.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  useEffect(() => {
    fetchData();
    fetchRecentActiveUsers();
  }, []);

  const OnInputChange = (e) => {
    const text = e.target.value;
    setInputValue(text);
    const filtered = users.filter((option) =>
      option?.name?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredOptionsMedicalCond(filtered);
  };
  const OnInputActiveChange = (e) => {
    const text = e.target.value;
    setInputActiveValue(text);
    const filtered = recentActiveUsers.filter((option) =>
      option?.name?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredActiveOptionsMedicalCond(filtered);
  };

  const item2 = [
    {
      title: "Total Gift Sent",
      value: 244,
    },
    {
      title: "Total Gift Recevied Users",
      value: 129.6,
    },
  ];
  return (
    <>
      <h2 className="text-lg font-semibold mb-3">Dashboard</h2>
      <div className="flex gap-5 w-full">
        <div className="w-4/6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg  flex flex-col gap-2 bg-[#FFEFE7] p-6">
              <h4 className="font-medium text-lg">Total Users</h4>
              <h1 className="font-medium text-3xl">{users.length}K</h1>
            </div>
            <div className="rounded-lg  flex flex-col gap-2 bg-[#E8F0FB] p-6">
              <h4 className="font-medium text-lg">Active Users</h4>
              <h1 className="font-medium text-3xl">
                {recentActiveUsers.length}K
              </h1>
            </div>
            <div className="rounded-lg  flex flex-col gap-2 bg-[#FDEBF9] p-6">
              <h4 className="font-medium text-lg">Recent Users</h4>
              <h1 className="font-medium text-3xl">{users.length}K</h1>
            </div>
          </div>

          {/* <div className="grid grid-cols-2 gap-4">
            {item2.map((item, i) => (
              <div className="rounded-lg flex flex-col gap-2 border border-[#E0E0E0] p-6">
                <h4 className="font-medium text-lg">{item.title}</h4>
                <h1 className="font-medium text-3xl">{item.value}K</h1>
                <div className="flex justify-end">
                  <button className="rounded-lg bg-[#FEBE15] text-white px-5 py-2">
                    See All
                  </button>
                </div>
              </div>
            ))}
          </div> */}
          {/* Top Active Users */}
          <div className="bg-white border border-[#E0E0E0] px-4 py-2 rounded-md">
            <div className="flex justify-between">
              <div>
                <h2 className="text-lg font-medium my-4">Top Active Users</h2>
              </div>
              {/* SEARCH INPUT */}
              <div className="relative w-3/5 flex items-center justify-end">
                <input
                  type="text"
                  name="search"
                  className="pl-10 min-[576px]:pl-10 w-2/6 border cursor-pointer text-gray-400 border-[#C7C7C7]  px-3 py-1 rounded-[7px] focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all text-xs md:text-sm"
                  placeholder="Search..."
                  value={InputActiveValue}
                  onChange={OnInputActiveChange}
                />{" "}
                <span className="absolute top-0 inset-y-0 left-[68%] flex items-center  min-[576px]:pl-2">
                  <svg
                    width="18"
                    height="18"
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
              </div>
            </div>
            <div className="relative overflow-x-auto">
              {loading ? (
                <Skeleton />
              ) : (
                <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  {currentActiveUsers.map((user, i) => (
                    <div
                      key={user?.id}
                      className="bg-[#FAFAFA] border border-[#E0E0E0] flex justify-between px-4 rounded-md mb-2"
                    >
                      <div className="flex">
                        <div className="pt-[6px] flex items-center">
                          <Image
                            src={user?.profile_pic || "/na.png"}
                            alt={`${user?.name}`}
                            width={40}
                            height={40}
                            onClick={() => openModal(user?.id)}
                            className="rounded-full cursor-pointer"
                          />
                        </div>
                        <div className="px-3 lg:px-6 lg:py-4 py-2 border-gray-200 dark:border-gray-700 text-start flex flex-col">
                          <h2>{user?.name || "N/A"}</h2>
                          <h4>{user?.email || "N/A"}</h4>
                        </div>
                      </div>
                      <div className="group relative flex items-center">
                        <Image
                          onClick={() => openModal(user?.id)}
                          src="/icons/i-button.png"
                          width={25}
                          height={25}
                          alt="i-button"
                          className="cursor-pointer transition-transform transform hover:scale-125"
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Link
                      href="/Dashboard/All-users"
                      className="font-semibold text-[#FEBE15] px-5 py-2"
                    >
                      See All
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-2/6 flex flex-col gap-4">
          <div className="flex flex-col  rounded-lg">
            <div className="bg-[#FEBE15] px-4 py-2 rounded-t-lg text-white">
              Sent Notification
            </div>

            <div className="flex max-lg:flex-wrap gap-2 items-center rounded-b-lg bg-[#FFEEB9] pl-3 pr-6 py-6">
              <div>
                <Image
                  src={"/icons/notification.png"}
                  alt="notification"
                  width={150}
                  height={150}
                  unoptimized
                />
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="font-semibold">
                  Send Notifications and updates
                </h2>
                <Link
                  href="/Dashboard/All-users"
                  className="bg-[#FEBE15] rounded-lg px-4 py-2 text-white"
                >
                  Send Notifications
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white border border-[#E0E0E0] px-4 py-2 rounded-md">
            <div className="flex justify-between">
              <div>
                <h2 className="text-lg font-medium my-4">Recent Users</h2>
              </div>
              {/* SEARCH INPUT */}
              <div className="relative w-3/5 flex items-center justify-end">
                <input
                  type="text"
                  name="search"
                  className="pl-10 min-[576px]:pl-10 w-3/4 border cursor-pointer text-gray-400 border-[#C7C7C7]  px-3 py-1 rounded-[7px] focus:ring-0.5 focus:shadow-sm focus:shadow-[#FFBF00] focus:ring-[#FFBF00] focus:border-[#FFBF00] transition-all text-xs md:text-sm"
                  placeholder="Search..."
                  value={InputValue}
                  onChange={OnInputChange}
                />{" "}
                <span className="absolute top-0 inset-y-0 left-14 flex items-center  min-[576px]:pl-2">
                  <svg
                    width="18"
                    height="18"
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
              </div>
            </div>
            <div className="relative overflow-x-auto">
              {loading ? (
                <Skeleton />
              ) : (
                <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  {currentUsers.slice(0, 4).map((user, i) => (
                    <div
                      key={user?.id}
                      className="bg-[#FAFAFA] border border-[#E0E0E0] flex justify-between px-4 rounded-md mb-2"
                    >
                      <div className="flex">
                        <div className="pt-[6px] flex items-center">
                          <Image
                            src={user?.profile_pic || "/na.png"}
                            alt={`${user?.name}`}
                            width={40}
                            height={40}
                            onClick={() => openModal(user?.id)}
                            className="rounded-full cursor-pointer"
                          />
                        </div>
                        <div className="px-3 lg:px-6 lg:py-4 py-2 border-gray-200 dark:border-gray-700 text-start flex flex-col">
                          <h2>{user?.name || "N/A"}</h2>
                          <h4 className="whitespace-normal break-words">
                            {user?.email && user.email.length > 20
                              ? user.email.substring(0, 20) + "..."
                              : user?.email || "N/A"}
                          </h4>
                        </div>
                      </div>
                      <div className="group relative flex items-center">
                        <Image
                          onClick={() => openModal(user?.id)}
                          src="/icons/i-button.png"
                          width={25}
                          height={25}
                          alt="i-button"
                          className="cursor-pointer transition-transform transform hover:scale-125"
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Link
                      href="/Dashboard/All-users"
                      className="font-semibold text-[#FEBE15] px-5 py-2"
                    >
                      See All
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
