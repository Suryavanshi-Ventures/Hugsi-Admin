"use client";
import React from "react";
import FileUploader from "../uploaded files/file uploader/file_uploader";
import Table from "../../../../Components/table/table";

const UploadPrescription = () => {
  const Data = [
    // Your data here, for example:
    {
      id: 1,
      prescription: "Sugar report",
      file_name: "medella.pdf",
      uploaded: "2021-11-03",
    },
    {
      id: 2,
      prescription: "Lipid report",
      file_name: "report.pdf",
      uploaded: "2021-11-11",
    },

    // Add more rows as needed
  ];
  const Columns = [
    { key: "prescription", title: "Prescription" },
    { key: "file_name", title: "File Name" },
    { key: "uploaded", title: "Uploaded" },
  ];

  const handleActionClick = (row) => {
    // Handle the action button click for the given row
    console.log("Action clicked for row:", row);
  };

  return (
    <main>
      <section className="mb-8">
        <FileUploader id="prescription_uploader" />
      </section>
      <section>
        <h2 className="text-base md:text-lg font-semibold mb-3">
          All Uploaded Prescriptions
        </h2>
        <Table
          tableType="uploaded-prescriptions"
          data={Data}
          columns={Columns}
          onActionClick={handleActionClick}
        />
      </section>
    </main>
  );
};

export default UploadPrescription;
