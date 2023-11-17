import React from "react";
import AppointmentsList from "./appointment list/appointments_list";
const MyAppointments = () => {
  return (
    <main>
      <div>
        <h2 className="text-base md:text-xl font-semibold mb-10">
          Appointments
        </h2>
      </div>
      <section>
        <AppointmentsList />
      </section>
    </main>
  );
};

export default MyAppointments;
