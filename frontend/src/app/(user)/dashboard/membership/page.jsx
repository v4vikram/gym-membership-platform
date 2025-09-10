"use client";
import MembershipInfo from "@/components/MembershipInfo";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserMemberStore } from "@/store/useUserMemberStore";
import React, { useEffect } from "react";

const page = () => {
  const { user, getMe } = useAuthStore();
  const { loading, membership, getUserMembershipById } = useUserMemberStore();

  useEffect(() => {
    // getMe();
    getUserMembershipById(user?._id);
  }, []);
  return (
    <div className="px-6 pt-5 pb-8 text-white relative overflow-hidden min-h-screen">
      <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out">
        <MembershipInfo membership={membership} loading={loading} userQrCode={user?.qrCode}/>
      </div>
    </div>
  );
};

export default page;
