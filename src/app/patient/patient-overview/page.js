import React from "react";
import Tabs from "../../Components/tab/tabs";
import dynamic from "next/dynamic";

const BodyTest = dynamic(() => import("./tabs/body test/body_test"), {
  loading: () => <p>Loading...</p>,
});
const UploadedFiles = dynamic(
  () => import("./tabs/uploaded files/uploaded_files"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const UploadPrescription = dynamic(
  () => import("./tabs/upload prescription/upload_prescription"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const MedicalCareTeam = dynamic(
  () => import("./tabs/medical care team/medical_care_team"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const PatientOverview = () => {
  const tabs = [
    {
      label: "Body Tests",
      content: <BodyTest />,
    },
    {
      label: "Uploaded files",
      content: <UploadedFiles />,
    },
    {
      label: "Uploaded prescription",
      content: <UploadPrescription />,
    },
    {
      label: "Medical care team",
      content: <MedicalCareTeam />,
    },
  ];

  return (
    <main>
      <Tabs tabs={tabs} />
    </main>
  );
};

export default PatientOverview;
