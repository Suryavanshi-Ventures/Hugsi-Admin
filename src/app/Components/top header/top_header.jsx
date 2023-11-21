"use client";
import React, { useState } from "react";
// import { useSession } from "next-auth/react";
// import Skeleton from "../../Components/Skeleton/skeleton";

const TopHeader = () => {
  // const { data: session, status } = useSession();
  const [SearchInputValue, setSearchInputValue] = useState("");

  return (
    <section className="px-6 py-5 md:px-14 border-b border-primary">
      <div className="grid min-[576px]:grid-cols-2 items-center">
        {/* NAME SECTION */}
        <div>
         
            <h5 className="text-sm md:text-base font-semibold mb-1">
              Hi 
            
            </h5>
         

          <p className="font-bold text-lg md:text-2xl">Welcome Back!</p>
        </div>

        {/* SEARCH INPUT SECTION */}
        <div className="flex mt-5 min-[576px]:mt-0  items-center justify-end">
          {/* NOTIFICATION */}
          {/* <div className="mr-8">
            <svg
              className="cursor-pointer group"
              width="42"
              height="42"
              viewBox="0 0 42 42"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="42" height="42" rx="7" fill="#F5F5F5" />
              <path
                className="group-hover:fill-primary transition-all duration-[0.3s] "
                d="M28.1116 24.2159C27.8417 23.9476 27.6892 23.5831 27.6876 23.2025V19.0625C27.6863 17.4522 27.1444 15.889 26.1487 14.6235C25.153 13.358 23.7611 12.4635 22.1963 12.0834C22.2606 11.9009 22.2946 11.7091 22.2969 11.5156C22.2969 11.0391 22.1076 10.582 21.7706 10.245C21.4337 9.90806 20.9766 9.71875 20.5001 9.71875C20.0235 9.71875 19.5664 9.90806 19.2295 10.245C18.8925 10.582 18.7032 11.0391 18.7032 11.5156C18.7055 11.7091 18.7395 11.9009 18.8038 12.0834C17.239 12.4635 15.8471 13.358 14.8514 14.6235C13.8557 15.889 13.3138 17.4522 13.3126 19.0625V23.2025C13.3109 23.5831 13.1584 23.9476 12.8885 24.2159C12.565 24.538 12.3089 24.9212 12.1349 25.3432C11.9609 25.7652 11.8726 26.2176 11.8751 26.6741V26.9688C11.8751 27.35 12.0265 27.7156 12.2961 27.9852C12.5657 28.2548 12.9313 28.4062 13.3126 28.4062H18.4732C18.3895 28.6367 18.3457 28.8798 18.3438 29.125C18.3438 29.6969 18.571 30.2453 18.9754 30.6497C19.3797 31.0541 19.9282 31.2812 20.5001 31.2812C21.0719 31.2812 21.6204 31.0541 22.0247 30.6497C22.4291 30.2453 22.6563 29.6969 22.6563 29.125C22.6544 28.8798 22.6106 28.6367 22.5269 28.4062H27.6876C28.0688 28.4062 28.4344 28.2548 28.704 27.9852C28.9736 27.7156 29.1251 27.35 29.1251 26.9688V26.6741C29.1275 26.2176 29.0392 25.7652 28.8652 25.3432C28.6912 24.9212 28.4351 24.538 28.1116 24.2159ZM20.1407 11.5156C20.1407 11.4445 20.1618 11.3751 20.2012 11.316C20.2407 11.2569 20.2969 11.2108 20.3625 11.1836C20.4282 11.1564 20.5005 11.1493 20.5702 11.1632C20.6399 11.177 20.7039 11.2112 20.7542 11.2615C20.8044 11.3118 20.8387 11.3758 20.8525 11.4455C20.8664 11.5152 20.8593 11.5875 20.8321 11.6532C20.8049 11.7188 20.7588 11.7749 20.6997 11.8144C20.6406 11.8539 20.5711 11.875 20.5001 11.875C20.4047 11.875 20.3133 11.8371 20.2459 11.7697C20.1785 11.7023 20.1407 11.6109 20.1407 11.5156Z"
                fill="#A8A6A6"
              />
            </svg>
          </div> */}
          {/* SEARCH INPUT */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 min-[576px]:pl-5">
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
              className="w-full pl-10 min-[576px]:pl-14  border focus-visible:outline-primary border-primary rounded-lg p-3 text-xs md:text-sm"
              placeholder="Search..."
              value={SearchInputValue}
              onChange={(event) => setSearchInputValue(event.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopHeader;
