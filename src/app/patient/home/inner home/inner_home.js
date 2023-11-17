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
            title="Total Booking"
            iconName="total_booking_icon"
            backgroundColor="bg-white"
            textColor="black"
            borderColor="#C7C7C7"
          />
        </div>

        <div className="w-240">
          <StatisticsContainer
            totalCount={42}
            title="Booking success"
            iconName="booking_success_icon"
            backgroundColor="bg-white"
            textColor="black"
            borderColor="#C7C7C7"
          />
        </div>

        <div className="w-240">
          <StatisticsContainer
            totalCount={12}
            title="Booking cancel"
            iconName="booking_cancel_icon"
            backgroundColor="bg-white"
            textColor="black"
            borderColor="#C7C7C7"
          />
        </div>

        <div className="w-240">
          <StatisticsContainer
            totalCount="$1249"
            title="Paid amount"
            iconName="amount_paid_icon"
            backgroundColor="bg-white"
            textColor="black"
            borderColor="#C7C7C7"
          />
        </div>
      </div>
    </section>
  );
};

export default InnerHome;
