"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  Settings,
  Bell,
  CreditCard,
  Heart,
  Calendar,
  Trophy,
  Target,
  Clock,
  MapPin,
  Edit3,
  ChevronRight,
  Camera,
  Shield,
  HelpCircle,
  LogOut,
  Star,
  Award,
  Activity,
  Mail,
  Phone,
  Cake,
  Dumbbell,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserMemberStore } from "@/store/useUserMemberStore";
import MembershipInfo from "@/components/MembershipInfo";

const UserProfilePage = () => {
  const { user, getMe } = useAuthStore();
  const { loading, membership, getUserMembershipById } = useUserMemberStore();

  useEffect(() => {
    // getMe();
    getUserMembershipById(user?._id);
  }, []);
  // console.log("membership", membership);

  const [stats] = useState({
    totalWorkouts: 124,
    checkInsThisMonth: 18,
    streakDays: 12,
    caloriesBurned: 15420,
    favoriteTime: "6:00 AM",
    rating: 4.8,
  });

  const [achievements] = useState([
    {
      id: 1,
      name: "Early Bird",
      icon: "🌅",
      description: "50+ morning workouts",
    },
    { id: 2, name: "Consistency", icon: "🔥", description: "30-day streak" },
    {
      id: 3,
      name: "Strong",
      icon: "💪",
      description: "100+ strength sessions",
    },
    {
      id: 4,
      name: "Cardio King",
      icon: "❤️",
      description: "50+ cardio sessions",
    },
  ]);

  const menuSections = [
    {
      title: "Account",
      items: [
        {
          id: "personal-info",
          icon: <User className="w-5 h-5" />,
          label: "Personal Information",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          id: "membership",
          icon: <CreditCard className="w-5 h-5" />,
          label: "Membership & Billing",
          color: "text-green-600",
          bgColor: "bg-green-50",
        },
        {
          id: "favorites",
          icon: <Heart className="w-5 h-5" />,
          label: "Favorite Gyms",
          color: "text-red-600",
          bgColor: "bg-red-50",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          id: "notifications",
          icon: <Bell className="w-5 h-5" />,
          label: "Notifications",
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          id: "privacy",
          icon: <Shield className="w-5 h-5" />,
          label: "Privacy & Security",
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        },
        {
          id: "settings",
          icon: <Settings className="w-5 h-5" />,
          label: "App Settings",
          color: "text-gray-600",
          bgColor: "bg-gray-50",
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          id: "help",
          icon: <HelpCircle className="w-5 h-5" />,
          label: "Help Center",
          color: "text-indigo-600",
          bgColor: "bg-indigo-50",
        },
        {
          id: "logout",
          icon: <LogOut className="w-5 h-5" />,
          label: "Sign Out",
          color: "text-red-600",
          bgColor: "bg-red-50",
        },
      ],
    },
  ];

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-500 px-6 pt-5 pb-8 text-white relative overflow-hidden min-h-screen">
        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>

          {/* Profile Card */}
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm opacity-90">{user.email}</p>
                <p className="text-xs opacity-75">{user.joinDate}</p>
                <div className="flex items-center mt-2 space-x-1">
                  <Star className="w-4 h-4 fill-current text-yellow-300" />
                  <span className="text-sm font-medium">{stats.rating}</span>
                  <span className="text-xs opacity-75">rating</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                  {user.profileImage}
                </div>
              </div>
            </div>

            <button className="w-full bg-white/20 text-white py-2.5 rounded-xl font-medium hover:bg-white/30 transition-colors flex items-center justify-center space-x-2">
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute -right-8 -top-8 text-8xl opacity-10">🏆</div>
        <div className="absolute -left-4 -bottom-4 text-6xl opacity-10">⭐</div>
      </div>

    

      {/* Quick Stats */}
      {/* <div className="px-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Dumbbell className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {stats.totalWorkouts}
            </p>
            <p className="text-sm text-gray-600">Total Workouts</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="bg-green-100 p-2 rounded-full">
                <Target className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {stats.streakDays}
            </p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="bg-orange-100 p-2 rounded-full">
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {stats.caloriesBurned.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Calories Burned</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-lg font-bold text-gray-800">
              {stats.favoriteTime}
            </p>
            <p className="text-sm text-gray-600">Favorite Time</p>
          </div>
        </div>
      </div> */}

      {/* Personal Info Quick View */}
      {/* <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Quick Info</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-800">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Phone className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-800">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium text-gray-800">{user.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Achievements */}
      {/* <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Achievements</h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-3 text-center hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <h4 className="font-semibold text-sm text-gray-800">
                  {achievement.name}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Menu Sections */}
      {/* <div className="px-6 space-y-6 pb-8">
        {menuSections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-800">
                {section.title}
              </h3>
            </div>

            <div className="divide-y divide-gray-100">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group"
                  onClick={() => console.log(`Navigate to ${item.id}`)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`${item.bgColor} p-2 rounded-full group-hover:scale-110 transition-transform`}
                    >
                      <div className={`${item.color}`}>{item.icon}</div>
                    </div>
                    <span className="font-medium text-gray-800">
                      {item.label}
                    </span>
                  </div>
                  {item.id !== "logout" && (
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div> */}

      {/* App Info */}
      {/* <div className="px-6 pb-8 text-center">
        <p className="text-gray-500 text-sm">GymPass v2.1.0</p>
        <p className="text-gray-400 text-xs mt-1">
          Built with Next.js 15 & shadcn/ui
        </p>
      </div> */}
    </div>
  );
};

export default UserProfilePage;
