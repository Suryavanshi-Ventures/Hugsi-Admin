"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutModal from "../logout_modal/page";
import { useRouter, usePathname } from "next/navigation";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };

  const handleCancelLogout = () => {
    setLogoutModalOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="md:flex hidden h-full">
        <div className="bg-[#FFEEB9]   w-[250px] font-opensans  ">
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
                <Image
                  src="/icon1.png"
                  width={15}
                  height={15}
                  alt="image-icon"
                />
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
                <Image
                  src="/icon2.png"
                  width={18}
                  height={18}
                  alt="image-icon"
                />

                <h2 className="">All Users</h2>
              </Link>

              <Link
                href="/Dashboard/Quiz"
                className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBF00] 
      py-3 rounded-md w-full px-10 items-center
        ${
          pathname === "/Dashboard/Quiz"
            ? "rounded-md  bg-[#FFBF00] text-white"
            : ""
        }`}
              >
                <svg
                  id="Capa_1"
                  enable-background="new 0 0 512 512"
                  height="20"
                  viewBox="0 0 512 512"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="m473.909 188.982h-121.034c14.132-19.61 22.47-43.66 22.47-69.624 0-65.814-53.544-119.358-119.36-119.358-65.814 0-119.358 53.544-119.358 119.358 0 25.964 8.338 50.014 22.47 69.624h-121.006c-21.003 0-38.091 17.088-38.091 38.091v192.355c0 21.003 17.088 38.091 38.091 38.091h164.723l45.716 51.145c1.897 2.122 4.608 3.335 7.454 3.336h.002c2.846 0 5.557-1.212 7.454-3.333l45.746-51.147h164.724c21.003 0 38.091-17.087 38.091-38.091v-192.356c-.001-21.003-17.089-38.091-38.092-38.091zm-217.924-168.982c54.787 0 99.359 44.572 99.359 99.358s-44.572 99.359-99.359 99.359c-54.786 0-99.358-44.572-99.358-99.359s44.572-99.358 99.358-99.358zm236.015 399.428c0 9.976-8.115 18.091-18.091 18.091h-169.196c-2.846 0-5.557 1.212-7.454 3.333l-41.271 46.145-41.244-46.142c-1.897-2.123-4.609-3.336-7.456-3.336h-169.197c-9.976 0-18.091-8.115-18.091-18.091v-192.355c0-9.975 8.115-18.091 18.091-18.091h139.157c21.03 18.498 48.594 29.735 78.737 29.735s57.708-11.237 78.738-29.735h139.186c9.976 0 18.091 8.116 18.091 18.091z" />
                    <path d="m326.907 266.083c-5.522 0-10 4.477-10 10v96.404c0 5.523 4.478 10 10 10s10-4.477 10-10v-96.404c0-5.523-4.477-10-10-10z" />
                    <path d="m446.641 362.487h-45.866l52.742-80.945c2.003-3.074 2.161-6.998.413-10.224s-5.123-5.235-8.792-5.235h-60.83c-5.522 0-10 4.477-10 10s4.478 10 10 10h42.379l-52.741 80.945c-2.004 3.074-2.162 6.998-.414 10.224s5.123 5.235 8.792 5.235h64.317c5.522 0 10-4.477 10-10s-4.478-10-10-10z" />
                    <path d="m271.265 266.083c-5.522 0-10 4.477-10 10v66.273c0 4.791-1.313 11.822-12.688 17.554-3.376 1.71-7.216 2.577-11.373 2.577-4.683-.018-8.745-1.171-12.439-3.537-7.444-4.741-10.48-9.532-10.48-16.538v-66.33c0-5.523-4.478-10-10-10s-10 4.477-10 10v66.33c0 14.021 6.456 24.949 19.716 33.394 6.871 4.4 14.652 6.647 23.165 6.681 7.365 0 14.245-1.593 20.431-4.726 19.563-9.857 23.67-24.694 23.67-35.405v-66.273c-.002-5.523-4.48-10-10.002-10z" />
                    <path d="m161.439 357.283c6.485-9.389 10.296-20.761 10.296-33.012 0-32.085-26.103-58.188-58.188-58.188-32.101 0-58.217 26.103-58.217 58.188 0 32.101 26.116 58.216 58.217 58.216 12.633 0 24.33-4.062 33.88-10.931l7.606 7.606c1.953 1.953 4.512 2.929 7.071 2.929s5.118-.977 7.071-2.929c3.905-3.905 3.905-10.237 0-14.142zm-47.891 5.204c-21.073 0-38.217-17.144-38.217-38.216 0-21.057 17.144-38.188 38.217-38.188 21.057 0 38.188 17.131 38.188 38.188 0 6.714-1.745 13.025-4.795 18.513l-8.605-8.605c-3.906-3.905-10.236-3.905-14.143 0-3.905 3.905-3.905 10.237 0 14.142l8.814 8.814c-5.703 3.395-12.356 5.352-19.459 5.352z" />
                    <path d="m255.985 175.773c-5.522 0-10 4.477-10 10v.057c0 5.523 4.478 9.972 10 9.972s10-4.505 10-10.028-4.477-10.001-10-10.001z" />
                    <path d="m225.655 93.217c5.522 0 10-4.477 10-10 0-1.043.061-1.972.188-2.861 1.429-10.182 10.271-17.675 20.551-17.5 10.613.229 19.357 8.691 19.907 19.265.293 5.641-1.682 10.997-5.56 15.082-3.885 4.092-9.125 6.345-14.756 6.345-5.522 0-10 4.477-10 10v31.719c0 5.523 4.478 10 10 10s10-4.477 10-10v-22.99c7.29-1.877 14.012-5.774 19.261-11.303 7.691-8.102 11.608-18.717 11.027-29.891-1.091-20.979-18.419-37.768-39.464-38.222-.273-.005-.545-.008-.816-.008-20.058 0-37.158 14.794-39.953 34.7-.259 1.812-.385 3.666-.385 5.665 0 5.522 4.478 9.999 10 9.999z" />
                  </g>
                </svg>
                <h2 className="">Quiz</h2>
              </Link>

              <div
                onClick={handleLogout}
                className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBF00] 
            py-3 rounded-md w-full px-10 items-center cursor-pointer
              ${
                pathname === "/Dashboard/logout"
                  ? "bg-[#FFBD59]  text-white rounded-md"
                  : ""
              }`}
              >
                <Image
                  src="/icon3.png"
                  width={17}
                  height={17}
                  alt="image-icon"
                />

                <h2 className="">Logout</h2>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>

      <div>
        {" "}
        <Image
          onClick={handleOpen}
          src={`${open ? "" : "/icons/ham.svg"}`}
          width={20}
          height={20}
          alt="hamburger-manu"
          className="absolute top-1 left-1 z-50  md:hidden cursor-pointer"
        />
      </div>
      <div className="flex md:hidden h-full fixed z-50">
        <Image
          onClick={handleOpen}
          src={`${open ? "/icons/arrow-left.svg" : ""}`}
          width={20}
          height={20}
          alt="hamburger-manu"
          className="absolute top-1 left-1 z-50 "
        />
        {open && (
          <div className="flex bg-[#FFEEB9] flex-col space-y-5 px-2 pt-5 items-center ">
            <div className=" pb-3 w-[150px] flex justify-center">
              <Image
                src="/hugsi-logo.webp"
                width={86}
                height={75}
                alt="hugsi-logo"
              />
            </div>
            <div className="flex flex-col space-y-5 w-full text-gray-600   font-medium">
              <Link
                href="/Dashboard/overview"
                className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBF00] 
      py-3 rounded-md w-full px-3  items-center
        ${
          pathname === "/Dashboard/overview"
            ? "bg-[#FFBF00] text-white rounded-md "
            : ""
        }`}
              >
                <Image
                  src="/icons/overview-icon.png"
                  width={15}
                  height={15}
                  alt="image-icon"
                />
                <h2 className="">Overview</h2>
              </Link>
              <Link
                href="/Dashboard/All-users"
                className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBF00] 
      py-3 rounded-md w-full px-3  items-center
        ${
          pathname === "/Dashboard/All-users"
            ? "rounded-md  bg-[#FFBF00] text-white"
            : ""
        }`}
              >
                <Image
                  src="/icons/all-user.svg"
                  width={18}
                  height={18}
                  alt="image-icon"
                />

                <h2 className="">All Users</h2>
              </Link>

              <div
                onClick={handleLogout}
                className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBF00] 
      py-3 rounded-md w-full px-3 items-center cursor-pointer
        ${
          pathname === "/Dashboard/contactus-inquires"
            ? "bg-[#FFBD59]  text-white rounded-md"
            : ""
        }`}
              >
                <Image
                  src="/icons/logout-icon.png"
                  width={17}
                  height={17}
                  alt="image-icon"
                />

                <h2 className="">Logout</h2>
              </div>
              {/*  */}
            </div>
          </div>
        )}
      </div>
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={handleCancelLogout}
        onLogout={handleConfirmLogout}
      />
    </>
  );
};

export default Sidebar;
