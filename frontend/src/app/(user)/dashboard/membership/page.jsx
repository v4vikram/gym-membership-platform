"use client";
import MembershipInfo from "@/components/MembershipInfo";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserMemberStore } from "@/store/useUserMemberStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { user, getMe } = useAuthStore();
  const { loading, membership, getUserMembershipById } = useUserMemberStore();
  const router = useRouter();

  console.log("Rendering page component with user:", user);

  useEffect(() => {
    getMe(); // fetch user from backend
  }, []);

  useEffect(() => {
    if (user?._id) {
      getUserMembershipById(user._id);
    }
  }, [user?._id]); // run whenever user changes

  return (
    <div className="px-6 pt-5 pb-8 text-white relative overflow-hidden min-h-screen">
      <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out">
        <MembershipInfo
          membership={membership}
          loading={loading}
          userQrCode={user?.qrCode}
        />
      </div>
    </div>
  );
};

export default page;
