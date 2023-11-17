"use client";
import React from "react";
import Table from "../../../Components/table/table";

const AppointmentsList = () => {
  const Data = [
    // Your data here, for example:
    {
      id: 1,
      doctor: "Alex",
      visit_types: "Follow up visit",
      date: "2023-11-03",
      time: "13:00",
      status: "Pending",
    },
    {
      id: 2,
      doctor: "Talal",
      visit_types: "Follow up visit",
      date: "2023-12-07",
      time: "17:00",
      status: "Pending",
    },

    // Add more rows as needed
  ];
  const Columns = [
    { key: "doctor", title: "Doctor" },
    { key: "visit_types", title: "Visit types" },
    { key: "date", title: "Date" },
    { key: "time", title: "Time" },
    { key: "status", title: "Status" },
  ];

  const handleActionClick = (row) => {
    // Handle the action button click for the given row
    console.log("Action clicked for row:", row);
  };
  return (
    <div>
      <Table
        tableType="appointments"
        data={Data}
        columns={Columns}
        onActionClick={handleActionClick}
      />
    </div>
  );
};

export default AppointmentsList;
