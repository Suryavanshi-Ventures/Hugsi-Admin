"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const Role = session.user.role;

  const RouterRef = useRouter();

  useEffect(() => {
    if (Role === "patient") {
      RouterRef.back();
    }

    return () => {};
  }, [Role]);

  return <>{children}</>;
}
