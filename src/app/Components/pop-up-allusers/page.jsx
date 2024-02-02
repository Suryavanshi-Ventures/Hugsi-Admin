"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import styles from "../pop-up.module.css";
import ChangePass from "../change-pass/page";

function UserProfileModal({ user, onClose }) {
  const [users, setUsers] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [openInput, setOpeninput] = useState(false);
  const [openConfirmationPass, setOpenConfirmationPass] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState();
  console.log(user, "user");
  // -----------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin_get_user?id=${user}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  if (!users) {
    return null;
  }

  const handleCopyLink = async (index) => {
    try {
      await navigator.clipboard.writeText(users?.wishlist[index]?.link);
      setIsLinkCopied(true);
    } catch (error) {
      console.error("Error copying link to clipboard:", error);
    }
  };
  const truncateLink = (link) => {
    const words = link.split(" ");
    const truncatedWords = words.map((word, index) =>
      index < 10 ? word : index === 10 ? `${word}...` : ""
    );
    return truncatedWords.join(" ");
  };
  function HandleOpenInput() {
    setOpeninput(!openInput);
  }
  function handleOpenModal() {
    setOpenConfirmationPass(true);
  }
  const handleCancelChange = () => {
    setOpenConfirmationPass(false);
  };
  // console.log(newPassword,"newpass")
  // console.log(user,"user")
  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin_change_user_password`,
        {
          id: user, // Assuming user is the variable holding the user ID
          pw: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status_code === 200) {
        setConfirm(true);
        alert("Password Change successfully");
      } else {
        setConfirm(false);
      }
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error updating password:", error);
    }
    setOpenConfirmationPass(false);
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) {
      return { date: '0-0-0000', time: '00:00' };
    }
    
    const [date, time] = dateTimeString.split(' ');
    return { date, time };
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center mx-auto max-w-screen-3xl ">
      <div
        className={`md:w-1/2 w-[80%] max-h-[80vh] overflow-y-scroll bg-white rounded-lg flex flex-col ${styles.scrollbar_yellow}`}
      >
        {/* --------------------profile--------- */}
        <div className="bg-[#FFBF00] w-full h-[150px] relative">
          <div className="flex justify-end   right-0 absolute ">
            <Image
              src="/icons/close.png"
              alt="Close"
              onClick={onClose}
              className="float-right cursor-pointer transition-transform transform m-1 hover:scale-110 fixed"
              width={25}
              height={25}
            />
          </div>

          <div className="flex rounded-full justify-center pt-[50px]">
            <Image
              src={users?.profile_pic || "/na.png"}
              alt={`${users?.name}`}
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
        </div>

        <div className="flex justify-end text-xs gap-2 my-[12px] px-[60px]">
          <p className="font-bold text-[#FFBF00]">Last Login : </p>
          <div className="text-gray-500">
            {formatDateTime(users?.last_login).date}
          </div>
          <span className="text-gray-500">at</span>
          <div className="text-gray-500">
            {formatDateTime(users?.last_login).time}
          </div>
        </div>
        {/* -----------------------form---------------------- */}
        <div className=" mt-[80px] md:px-[40px] xl:px-[60px] px-[30px]">
          <div className="flex md:justify-between justify-center flex-wrap w-full  ">
            {/* -------------- */}
            <div className="my-2">
              <div>First Name :</div>
              <input
                disabled
                type="text"
                placeholder={`${users?.name?.split(" ")[0] || "N/A"}`}
                className="border border-solid border-gray-200 md:h-[40px] md:px-8 bg-[#ffca2a1c] text-center md:text-left rounded-lg"
              />
            </div>
            {/* ---------------- */}
            <div className="my-2">
              <div>Last Name :</div>
              <input
                disabled
                type="text"
                placeholder={`${users?.name?.split(" ")[1] || "N/A"}`}
                className="border border-solid border-gray-200  md:h-[40px] md:px-8 bg-[#ffca2a1c] text-center md:text-left rounded-lg"
              />
            </div>
          </div>
          <div className="flex md:justify-between justify-center flex-wrap my-5 ">
            {/* -------------- */}
            <div className="my-2">
              <div>Email :</div>
              <input
                disabled
                type="text"
                placeholder={`${users?.email || "N/A"}`}
                className="border border-solid border-gray-200 md:h-[40px] md:px-8 bg-[#ffca2a1c] text-center md:text-left  rounded-lg"
              />
            </div>
            {/* ---------------- */}
            <div className="my-2">
              <div>Phone Number :</div>
              <input
                disabled
                type="text"
                placeholder={`${users?.phone || "N/A"}`}
                className="border border-solid border-gray-200  md:h-[40px] md:px-8 bg-[#ffca2a1c] text-center md:text-left rounded-lg"
              />
            </div>
          </div>
          <div className="flex md:justify-between justify-center gap-4  flex-wrap my-5  ">
            {/* -------------- */}
            <div>
              <div>DOB</div>
              <div className="flex justify-around border gap-5 p-[10px] bg-[#ffca2a1c] rounded-lg">
                <div>
                  <Image
                    src="/calender.png"
                    width={20}
                    height={22}
                    alt="icon"
                  />
                </div>
                <div>{users?.dob || "N/A"}</div>
              </div>
            </div>
            <div>
              <div>Gift Search:</div>
              <div className="flex justify-around border gap-5 p-[10px] bg-[#ffca2a1c] rounded-lg">
                <div>
                  <Image src="/gift.png" width={20} height={22} alt="icon" />
                </div>
                <div> {users?.gift_search || "N/A"}</div>
              </div>
            </div>
            <div>
              <div>Connections:</div>
              <div className="flex justify-around border gap-5 p-[10px] bg-[#ffca2a1c] rounded-lg">
                <div>
                  <Image
                    src="/connection.png"
                    width={20}
                    height={22}
                    alt="icon"
                  />
                </div>
                <div> {users?.connections || "N/A"}</div>
              </div>
            </div>
            <div>
              <div>Pending request:</div>
              <div className="flex justify-around border gap-5 p-[10px] bg-[#ffca2a1c] rounded-lg">
                <div>
                  <Image
                    src="/pending-icon.png"
                    width={20}
                    height={22}
                    alt="icon"
                  />
                </div>
                <div> {users?.pending_reqs || 0}</div>
              </div>
            </div>
          </div>
          {/* --------interest-------- */}
          <div className="">
            <div className="md:text-left text-center py-2 font-semibold">
              Interest:
            </div>

            <div className="bg-[#F6F6F6] rounded-md flex flex-wrap gap-3 p-2 md:p-5">
              {users?.interest?.map((data, i) => (
                <div
                  key={i}
                  className="rounded-full px-3 py-2   bg-white border-2 border-solid border-[#FFBF00] "
                >
                  {data}
                </div>
              ))}
            </div>
          </div>
          {/* ---------------------Gift language------------------    */}
          <div className=" my-3">
            <div className="md:text-left text-center py-2 font-semibold">
              Gift Language:
            </div>

            <div className="bg-[#F6F6F6] rounded-md flex flex-wrap gap-3 p-5">
              {Object.entries(users?.gift_lan || {}).map(([key, value]) => (
                <div
                  key={key}
                  className="mt-1 rounded-full px-3 py-2   border-2 border-solid border-[#FFBF00] bg-[#FFBF001F]"
                >
                  {key}: <span className="text-[#767676]">{value}%,</span>{" "}
                </div>
              ))}
            </div>
          </div>
          {/* -----------------------pssycholigical---------------------------     */}

          <div className="">
            <div className="md:text-left text-center py-2 font-semibold">
              Psychological Q/A:
            </div>
            <div className="bg-[#F6F6F6] rounded-md p-5 my-2">
              <div className="font-semibold ">
                {users?.psych_ans &&
                  users?.psych_ans.map((data, index) => (
                    <div key={index}>
                      <h4>Q. {data.que}</h4>
                      <h4 className="text-[#767676] py-3">A. {data.ans}</h4>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* ------------------------Whishlist:------------------------------   */}
          <div className="">
            <div className="md:text-left text-center py-2 font-semibold">
              Whishlist:
            </div>

            {users?.wishlist &&
              users?.wishlist.map((data, index) => (
                <div
                  key={index}
                  className="bg-[#F6F6F6]  flex md:justify-around flex-col md:flex-row md:p-5"
                >
                  <div className="flex md:justify-between justify-center    p-2">
                    <div className=" rounded-full p-[2px]  mr-1">
                      <Image
                        src="/box.png"
                        width={20}
                        height={20}
                        alt="image-link"
                      />
                    </div>
                    <div className=""> {data?.name}</div>
                  </div>
                  <div className="flex md:justify-between justify-center p-2">
                    <div
                      className="p-[5px] mr-1"
                      onClick={() => handleCopyLink(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <Image
                        src="/link.png"
                        width={15}
                        height={15}
                        alt="image-link"
                      />
                    </div>
                    <div className="overflow-hidden w-[200px] h-[50px]">
                      {data?.link ? (
                        <Link href={data?.link} className="text-[#767676]">
                          <span className="overflow-hidden">
                            {truncateLink(data?.link)}
                          </span>
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>
                  <div className="flex md:justify-between justify-center    p-2">
                    <div className=" p-[2px]  mr-1">
                      <Image
                        src="/dollar.png"
                        width={20}
                        height={20}
                        alt="image-link"
                      />
                    </div>
                    <div>Price: {data?.price || "N/A"}</div>
                  </div>
                </div>
              ))}
          </div>
          {/* -------------------------------strength--------------------------------- */}
          <div className=" my-3">
            <div className="md:text-left text-center py-2 font-semibold">
              Strength:
            </div>

            <div className="bg-[#F6F6F6] rounded-md flex flex-wrap gap-3 p-5">
              <div className="rounded-full px-3 py-2   border-2 border-solid border-[#FFBF00] bg-[#FFBF001F] ">
                Gift Language: {users?.strength?.items?.gift_lan ?? 0}%
              </div>
              <div className="rounded-full px-3 py-2   bg-[#FFBF001F]   border-2 border-solid border-[#FFBF00] ">
                Interest: {users?.strength?.items?.interest}%
              </div>
              <div className="rounded-full px-3 py-2   bg-[#FFBF001F]   border-2 border-solid border-[#FFBF00] ">
                Profile Pic: {users?.strength?.items?.profile_pic ?? 0} %
              </div>
              <div className="rounded-full px-3 py-2   bg-[#FFBF001F]   border-2 border-solid border-[#FFBF00] ">
                Physiological Answer: {users?.strength?.items?.psych_ans ?? 0}%
              </div>
              <div className="rounded-full px-3 py-2   bg-[#FFBF001F]   border-2 border-solid border-[#FFBF00] ">
                Wishlist: {users?.strength?.items?.wishlist ?? 0}%
              </div>
            </div>
          </div>
          {/* -------------change password------------------------ */}

          <div className="flex lg:flex-row flex-col my-5 gap-1">
            <button
              onClick={HandleOpenInput}
              className="relative inline-flex items-center justify-center px-3 py-2 overflow-hidden  font-medium tracking-tighter hover:font-semibold  text-black bg-[#F6F6F6] rounded-lg group "
            >
              <span className="absolute w-0 h-0 transition-all duration-500  ease-out bg-[#FFBF001F]    rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="absolute inset-0 w-full h-full -mt-1  rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent "></span>
              <span className="relative">Change Password</span>
            </button>

            {openInput && (
              <>
                <input
                  type="text"
                  id="text"
                  name="text"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className=" border border-gray-300 px-1 py-1 rounded-lg focus:outline-none focus:border-[#FFBF00]"
                  placeholder="Enter new password"
                />
                <button
                  onClick={handleOpenModal}
                  className="relative inline-flex items-center justify-center px-2 py-2 overflow-hidden  font-medium tracking-tighter hover:font-semibold  text-black bg-[#F6F6F6] rounded-lg group "
                >
                  <span className="absolute w-0 h-0 transition-all duration-500  ease-out bg-[#FFBF001F]    rounded-full group-hover:w-56 group-hover:h-56"></span>
                  <span className="absolute inset-0 w-full h-full -mt-1  rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent "></span>
                  <span className="relative">Update Password</span>
                  <svg
                    class="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>{" "}
              </>
            )}
          </div>
          {/* <div>
           {confirm && (<div className="text-green-500 font-semibold">
            Password Change Successfully
           </div>)  }
           
           </div> */}
        </div>
        <ChangePass
          isOpen={openConfirmationPass}
          onClose={handleCancelChange}
          onHandleChange={handleChangePassword}
        />
      </div>
    </div>
  );
}

export default UserProfileModal;
