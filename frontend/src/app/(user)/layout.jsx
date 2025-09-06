// app/(user)/user/layout.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Navbar from "@/components/Navbar";
import StatusCard from "@/components/StatusCard";
import Footer from "@/components/Footer";

export default function UserLayout({ children }) {
  const { loading, auth, getMe } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (!loading && !auth) {
      router.replace("/login"); // ✅ safe redirect
    }
  }, [loading, auth, router]);

  if (loading) {
    return (
      <StatusCard
        status="loading"
        title="Checking user access..."
        subtitle="Please wait while we verify your profile"
      />
    );
  }

  if (!auth) {
    // while redirect is happening, render nothing
    return null;
  }

  return (
    <>
      <Navbar />
      {children}
       <Footer />
    </>
  );
}
