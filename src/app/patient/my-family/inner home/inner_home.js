"use client";
import React, { useState } from "react";
import Table from "../../../Components/table/table";

const InnerHome = () => {
  const [SearchInputValue, setSearchInputValue] = useState("");

  const Data = [
    // Your data here, for example:
    {
      id: 1,
      memberName: "Alex",
      relation: "Friend",
      uploadedDate: "2021-11-03",
    },
    {
      id: 2,
      memberName: "Talal",
      relation: "Friend",
      uploadedDate: "2021-11-11",
    },

    // Add more rows as needed
  ];
  const Columns = [
    { key: "memberName", title: "Member Name" },
    { key: "relation", title: "Relation" },
    { key: "uploadedDate", title: "Uploaded Date" },
  ];

  const handleActionClick = (row) => {
    // Handle the action button click for the given row
    console.log("Action clicked for row:", row);
  };

  return (
    <div className="py-8">
      {/* SEARCH INPUT SECTION */}
      <section className="mb-10">
        <div className="flex max-xs:justify-center justify-between max-xs:flex-wrap  mt-5 min-[576px]:mt-0  items-center">
          {/* SEARCH INPUT */}
          <div className="relative md:mr-8 max-xs:mb-5 max-xs:w-full">
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
              placeholder="Search Member..."
              value={SearchInputValue}
              onChange={(event) => setSearchInputValue(event.target.value)}
            />
          </div>
          {/* ADD MEMBER BUTTON */}
          <div>
            <button className="text-sm md:text-base text-white px-4 py-2 bg-primary inline-block rounded-full shadow-lg transition-all duration-[0.3s]">
              Add Member
            </button>
          </div>
        </div>
      </section>

      <section>
        <Table
          tableType="my-family"
          data={Data}
          columns={Columns}
          onActionClick={handleActionClick}
        />
      </section>
    </div>
  );
};

export default InnerHome;
