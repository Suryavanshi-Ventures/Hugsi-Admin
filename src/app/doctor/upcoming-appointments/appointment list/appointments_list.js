"use client";
import React, { useState, useRef } from "react";
import Table from "../../../Components/table/table";
import CommonDropDown from "@/Main Common Components/Drop-Down/common_drop_down";
import Calendar from "@/Main Common Components/Calendar/calendar";

const AppointmentsList = () => {
  const [Data, setData] = useState([
    // Your data here, for example:
    {
      id: 1,
      patientName: "Alex",
      patientAge: "23 Years",
      date: "2023-11-03",
      visitTime: "13:00",
      reasonToVisit: "Neck Pain",
    },
    {
      id: 2,
      patientName: "Talal",
      patientAge: "25 Years",
      date: "2023-12-07",
      visitTime: "17:00",
      reasonToVisit: "Knee fracture",
    },
    {
      id: 3,
      patientName: "Talal",
      patientAge: "27 Years",
      date: "2023-12-07",
      visitTime: "17:00",
      reasonToVisit: "Multiple fracture",
    },
  ]);
  const [AppointmentStatus, setAppointmentStatus] = useState([
    "All",
    "Upcoming",
    "Pending",
    "Cancelled",
  ]);
  const InputRefCalendarPanel = useRef(null);
  const [OpenCalendar, setOpenCalendar] = useState(false);

  const Columns = [
    { key: "patientName", title: "Patient Name" },
    { key: "patientAge", title: "Patient age" },
    { key: "date", title: "Date" },
    { key: "visitTime", title: "Visit time" },
    { key: "reasonToVisit", title: "Reason to visit" },
  ];

  const OnActionClick = (row) => {
    const updatedData = Data.filter((item) => item.id !== row.id);
    setData(updatedData);
    console.log("Action clicked for row:", row);
  };
  const OnDropDownChange = (event) => {
    const updatedData = Data.filter((item) => item.status === event.date);
    console.log(updatedData, "LOG");
    setData(updatedData);
  };
  const OnChangeCalendar = (event) => {
    console.log(event, "FROM APPOINT");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 className="text-base text-[#3B3E45] md:text-xl font-semibold ">
            Upcoming Appointments
          </h2>
        </div>
        <div className="flex items-center">
          {/* DATE */}
          <div className="mr-4">
            {/* CALENDAR */}
            <div className="flex  items-center col-span-2 justify-end relative ">
              <div
                onClick={() => setOpenCalendar(!OpenCalendar)}
                ref={InputRefCalendarPanel}
                className="cursor-pointer transition-all duration-[0.3s] hover:scale-[1.2]"
              >
                <svg
                  className="shadow-xl rounded-full"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8  2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                    stroke="#1E7BAE"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.694 13.7002H15.703M15.694 16.7002H15.703M11.994 13.7002H12.004M11.994 16.7002H12.004M8.29297 13.7002H8.30297M8.29297 16.7002H8.30297"
                    stroke="#1E7BAE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <Calendar
                OpenCalendar={OpenCalendar}
                setOpenCalendar={setOpenCalendar}
                onCalendarChange={OnChangeCalendar}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <Table
          tableType="upcoming appointments"
          data={Data}
          columns={Columns}
          onActionClick={OnActionClick}
        />
      </div>
    </div>
  );
};

export default AppointmentsList;
