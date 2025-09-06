"use client";

import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectIfAuthenticated({ children }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/"); // or "/dashboard" if you have one
    }
  }, [user, loading, router]);

  // Don't flash content while loading user
  if (loading || user) return null;

  return children;
}
