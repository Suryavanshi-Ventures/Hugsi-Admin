"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const DoctorLayout = dynamic(() => import("../doctor/page"), {
  loading: () => <p>Loading...</p>,
});

const PatientLayout = dynamic(() => import("../patient/page"), {
  loading: () => <p>Loading...</p>,
});

const RootLayout = () => {
  const { data: session, status } = useSession();
  const Role = session.user.role;
  const UrlPath = usePathname();
  const RouterRef = useRouter();

  useEffect(() => {
    if (Role === "patient") {
      RouterRef.push("/dashboard/patient");
    } else if (Role === "doctor") {
      RouterRef.push("/dashboard/doctor");
    }

    return () => {};
  }, [Role]);

  if (Role === "patient") {
    return <PatientLayout />;
  } else if (Role === "doctor") {
    return <DoctorLayout />;
  }
};

export default RootLayout;
