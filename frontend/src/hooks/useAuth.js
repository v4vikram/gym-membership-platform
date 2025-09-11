// hooks/useAuth.js
"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import axios  from "@/lib/axiosInstance";

export function useAuth() {
  const { user, setUser, loading, setLoading } = useAuthStore();

  useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      console.log("queryFn called");
      const res = await axios.get("/auth/me");
      console.log("queryFn response:", res.data);
      return res.data.user;
    },
    onSuccess: (data) => {
      console.log("on success", data);
      setUser(data);
      setLoading(false);
    },
    onError: (err) => {
      console.log("on error", err.response?.status || err.message);
      setUser(null);
      setLoading(false);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { user, loading };
}
