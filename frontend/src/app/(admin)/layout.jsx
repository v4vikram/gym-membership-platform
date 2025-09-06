// app/(user)/user/layout.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function adminLayout({ children }) {
  const { loading, auth, getMe } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    getMe();
  }, []);


  if (loading) return <p className="text-center mt-10">Checking admin access...</p>;
  if (!auth) return router.replace("login");

  return <>{children}</>;
}
