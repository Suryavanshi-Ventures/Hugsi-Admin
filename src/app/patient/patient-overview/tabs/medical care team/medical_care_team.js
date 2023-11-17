"use client";
import Image from "next/image";
import React, { useState } from "react";

const MedicalCareTeam = () => {
  const [SearchInputValue, setSearchInputValue] = useState("");

  const [TeamData, setTeamData] = useState([
    {
      teamCategory: "Dentist",
      teamDescription: "Test description",
      membersInTeam: 12,
    },
    {
      teamCategory: "Cardiologist",
      teamDescription: "This is a description for Team 02.",
      membersInTeam: 23,
    },
    {
      teamCategory: "Blood Patient",
      teamDescription: "This is a description for Team 03.",
      membersInTeam: 66,
    },
  ]);

  const AddTeam = () => {
    const newTeam = {
      teamCategory: "New Team",
      teamDescription: "This is a description for the new team.",
      membersInTeam: 0,
    };
    setTeamData([...TeamData, newTeam]);
  };

  return (
    <div>
      {/* SEARCH INPUT SECTION */}
      <section className="mb-10">
        <div className="flex justify-between mt-5 min-[576px]:mt-0  items-center">
          {/* SEARCH INPUT */}
          <div className="relative mr-8">
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
              placeholder="Search Doctors..."
              value={SearchInputValue}
              onChange={(event) => setSearchInputValue(event.target.value)}
            />
          </div>
          <div>
            <button
              onClick={() => AddTeam()}
              className="text-sm md:text-base text-white px-4 py-2 bg-primary inline-block rounded-full shadow-lg transition-all duration-[0.3s]"
            >
              Add Team
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="grid md:grid-cols-2 min-[992px]:grid-cols-3 gap-10">
          {TeamData.map((data, index) => {
            return (
              <div
                key={index}
                className="bg-[#FBFBFB] border border-[#CECECE] rounded-lg p-5"
              >
                <div className="bg-[#18A0FB] inline-block px-6 py-4 rounded mb-5">
                  <p className="text-white">{index + 1}</p>
                </div>
                {/* DETAILS SECTION */}
                <div className="mb-10">
                  <h2 className="font-semibold mb-3">{data.teamCategory}</h2>
                  <p className="text-sm md:text-base font-medium">
                    {data.teamDescription}
                  </p>
                </div>
                {/* PROFILE IMAGE SECTION */}
                <div className="flex justify-between items-center">
                  <div>
                    <Image
                      width={40}
                      height={40}
                      alt="profile icons"
                      src="/icons/Patient dashboard icons/Patient overview icons/profile_icon.svg"
                    ></Image>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MedicalCareTeam;
