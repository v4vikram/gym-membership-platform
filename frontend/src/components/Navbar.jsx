"use client";
import { Bell, Dumbbell, Settings, User, LogOut, LogIn } from "lucide-react";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

const Navbar = () => {
  const { logout, getMe, auth, user } = useAuthStore();
  // const getMe = useAuthStore((state) => state.getMe);

  console.log("getMe", user);

  useEffect(() => {
    async function loadGetMe() {
      getMe();
    }
    loadGetMe();
  }, []);

  return (
    <header className="bg-gradient-to-r from-primary via-purple-600 to-pink-500 text-white p-4 sticky top-0 z-40 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo / Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">GymPass</h1>
            <p className="text-xs opacity-90">Don't skip today's workout</p>
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex space-x-2">
          {/* Notifications */}
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          {/* Settings Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-44 p-3 rounded-xl shadow-md bg-white">
              <div className="flex flex-col space-y-0 text-gray-800">
                {user ? (
                  <>
                    {/* User info */}
                    <p className="text-sm font-medium border-b pb-2 mb-2">
                        👋 Hello,{" "}
                        <span className="font-semibold">{user?.name}</span>
                      </p>

                    {/* Profile button */}
                    <Link href={'/dashboard/profile'} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>

                    {/* Logout button */}
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Login button */}
                    <Link href={'/login'} className="flex items-center gap-2 px-3 py-2 rounded-lg text-green-600 hover:bg-green-50 transition">
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
