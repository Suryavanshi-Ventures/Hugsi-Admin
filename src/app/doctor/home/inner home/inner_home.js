import React from "react";
import dynamic from "next/dynamic";

const StatisticsContainer = dynamic(
  () => import("../../../Components/statistics divs/statistics_container"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const InnerHome = () => {
  return (
    <section className="my-6">
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 min-[992px]:grid-cols-2  min-[1300px]:grid-cols-4 gap-5 min-[1920px]:gap-32">
        <div className="w-240">
          <StatisticsContainer
            totalCount={54}
            title="Total Appointments"
            iconName="total_appointments"
            backgroundColor="bg-[#7A6EFE]"
            textColor="text-white"
            borderColor="#C7C7C7"
          />
        </div>

        <div className="w-240">
          <StatisticsContainer
            totalCount={166}
            title="Total Patient"
            iconName="total_patient"
            backgroundColor="bg-[#FF5363]"
            textColor="text-white"
            borderColor="#C7C7C7"
          />
        </div>

        <div className="w-240">
          <StatisticsContainer
            totalCount={12}
            title="Clinic Consulting"
            iconName="clinic"
            backgroundColor="bg-[#FFA901]"
            textColor="text-white"
            borderColor="#C7C7C7"
          />
        </div>

        <div className="w-240">
          <StatisticsContainer
            totalCount="249"
            title="Call Consulting"
            iconName="consulting"
            backgroundColor="bg-[#24A8FA]"
            textColor="text-white"
            borderColor="#C7C7C7"
          />
        </div>
      </div>
    </section>
  );
};

export default InnerHome;
