"use client";
import React, { useState, useEffect } from "react";
import {
  Dumbbell,
  Search,
  CreditCard,
  BarChart3,
  User,
  Bell,
  Settings,
  MapPin,
  Clock,
  Star,
  Wifi,
  Car,
  Waves,
  Heart,
  ChevronRight,
  Calendar,
  Award,
  Target,
} from "lucide-react";
import Footer from "@/components/Footer";
import axios from "@/lib/axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("gyms");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, getMe } = useAuthStore();

  useEffect(() => {
    async function loadGetMe() {
      // await getMe
    }
    loadGetMe();
  }, [getMe]);

  // Mock data for gyms
  const gyms = [
    {
      id: 1,
      name: "FitZone Premium",
      location: "Sector 29, Gurugram",
      distance: "0.8 km",
      rating: 4.8,
      reviews: 124,
      image: "🏋️‍♂️",
      status: "OPEN",
      price: "₹2,999/month",
      amenities: ["Pool", "Sauna", "24/7", "Parking"],
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      name: "Iron Paradise",
      location: "Golf Course Road",
      distance: "1.2 km",
      rating: 4.6,
      reviews: 89,
      image: "💪",
      status: "OPEN",
      price: "₹1,999/month",
      amenities: ["CrossFit", "Personal Training", "Nutrition"],
      gradient: "from-orange-500 to-red-600",
    },
    {
      id: 3,
      name: "Zen Fitness Studio",
      location: "DLF Phase 2",
      distance: "2.1 km",
      rating: 4.9,
      reviews: 156,
      image: "🧘‍♀️",
      status: "CLOSES SOON",
      price: "₹3,499/month",
      amenities: ["Yoga", "Meditation", "Spa", "Organic Cafe"],
      gradient: "from-green-500 to-teal-600",
    },
  ];

  const filters = ["All", "24/7", "Pool", "Yoga", "CrossFit", "Parking"];

  const membershipData = {
    currentPlan: "Premium Monthly",
    gym: "FitZone Premium",
    validUntil: "Dec 15, 2025",
    checkInsThisMonth: 18,
    favoriteTime: "6:00 AM",
  };

  const activityData = [
    { day: "Mon", workouts: 2, calories: 450 },
    { day: "Tue", workouts: 1, calories: 320 },
    { day: "Wed", workouts: 3, calories: 680 },
    { day: "Thu", workouts: 1, calories: 290 },
    { day: "Fri", workouts: 2, calories: 520 },
    { day: "Sat", workouts: 1, calories: 380 },
    { day: "Sun", workouts: 0, calories: 0 },
  ];

  const dummyPlans = [
    {
      _id: "68b038cc935b69a99adc2a73",
      name: "Monthly Plan",
      planCode: "MONTHLY_2500",
      price: 2500,
      currency: "INR",
      durationDays: 30,
      description: "Access to all gyms for 1 month",
      features: ["Unlimited gym access"],
      maxVisits: null,
      isActive: true,
    },
    {
      _id: "68b02386ff9e1b6617c77b8d",
      name: "Quarterly Plan",
      planCode: "QUARTERLY_5000",
      price: 5000,
      currency: "INR",
      durationDays: 90,
      description: "Access to all gyms for 3 months",
      features: ["Unlimited gym access", "Priority support"],
      maxVisits: null,
      isActive: true,
    },
    {
      _id: "68b69d11438a79306fd34779",
      name: "Premium Plan",
      planCode: "PREMIUM_8000",
      price: 8000,
      currency: "INR",
      durationDays: 180,
      description: "Access to all gyms for 6 months with extra perks",
      features: [
        "Unlimited gym access",
        "Free consultation",
        "Priority booking",
      ],
      maxVisits: null,
      isActive: true,
    },
  ];

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (membershipId) => {
    if (!user) {
      router.replace("/login");
    }
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // 1️⃣ Create order on backend
    const { data } = await axios.post(`/memberships/payments/create-order`, {
      membershipId,
      userId: user._id, // ✅ send user
    });
    const { order, membership } = data;

    // 2️⃣ Razorpay options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Gym Membership",
      description: membership.name,
      order_id: order.id,
      handler: async function (response) {
        // 3️⃣ Verify & assign membership
        await axios.post("/memberships/assign", {
          userId: user._id,
          membershipId: membership._id,
          paymentId: response.razorpay_payment_id,
        });
        alert("Payment successful!");
        // refresh dashboard / membership status
      },
      theme: { color: "#6b21a8" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const renderGymsPage = () => (
    <div className="animate-in slide-in-from-right-4 duration-300">
      {/* Quick Filters */}
      {/* <div className="px-4 mb-6">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedFilter === filter
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div> */}

      {/* Plans Section */}
      <div className="px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Plans</h2>

        {/* Grid layout for multiple plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyPlans.map((plan) => (
            <div
              key={plan._id}
              className="relative rounded-2xl overflow-hidden shadow-lg transform transition-transform hover:scale-105"
            >
              {/* Gradient background */}
              <div className=" bg-gradient-to-r from-primary via-purple-600 to-pink-500 text-white p-6 relative z-10">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm opacity-90 mb-2">{plan.description}</p>
                <p className="text-sm opacity-90 mb-4">
                  Price: ₹{plan.price} ({plan.durationDays} days)
                </p>
                {/* Features list */}
                <ul className="text-sm mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="before:content-['✔'] before:mr-1">
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors"
                  onClick={() => handlePayment("68bac09485aeb03f4f5b6aba")}
                >
                  Buy Now
                </button>
              </div>
              {/* Decorative emoji */}
              <div className="absolute -right-4 -top-4 text-6xl opacity-20 select-none">
                🎯
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      {/* <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Featured Gyms</h2>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Premium Membership</h3>
            <p className="text-sm opacity-90 mb-4">
              Access 50+ gyms across the city
            </p>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors">
              Learn More
            </button>
          </div>
          <div className="absolute -right-4 -top-4 text-6xl opacity-20">🎯</div>
        </div>
      </div> */}

      {/* Gym Cards */}
      {/* <div className="px-4 space-y-4 mb-6">
        {gyms.map((gym, index) => (
          <div
            key={gym.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative">
              <div
                className={`h-40 bg-gradient-to-br ${gym.gradient} flex items-center justify-center relative`}
              >
                <span className="text-5xl">{gym.image}</span>
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                    gym.status === "OPEN"
                      ? "bg-green-500 text-white"
                      : "bg-orange-500 text-white"
                  }`}
                >
                  {gym.status}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{gym.rating}</span>
                  </div>
                  <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                    {gym.reviews} reviews
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {gym.name}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{gym.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary text-lg">{gym.price}</p>
                  <p className="text-xs text-gray-500">{gym.distance} away</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {gym.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                  Join Now
                </button>
                <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );

  const renderMembershipPage = () => (
    <div className="p-4 animate-in slide-in-from-right-4 duration-300">
      {/* Current Membership Card */}
      <div className="bg-gradient-to-br from-primary to-purple-600 rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold">Current Membership</h2>
              <p className="text-sm opacity-90">{membershipData.currentPlan}</p>
            </div>
            <div className="bg-white/20 p-2 rounded-full">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="opacity-90">Gym:</span>
              <span className="font-medium">{membershipData.gym}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Valid Until:</span>
              <span className="font-medium">{membershipData.validUntil}</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 text-8xl opacity-10">
          🎫
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {membershipData.checkInsThisMonth}
              </p>
              <p className="text-sm text-gray-600">Check-ins</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">
                {membershipData.favoriteTime}
              </p>
              <p className="text-sm text-gray-600">Favorite time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Benefits */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <h3 className="font-bold text-lg mb-4 text-gray-800">
          Membership Benefits
        </h3>
        <div className="space-y-3">
          {[
            { icon: "🏊‍♂️", text: "Access to all pools", active: true },
            { icon: "🧘‍♀️", text: "Unlimited yoga classes", active: true },
            { icon: "👨‍💼", text: "Personal trainer sessions", active: false },
            { icon: "🍎", text: "Nutrition consultation", active: false },
          ].map((benefit, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{benefit.icon}</span>
                <span
                  className={benefit.active ? "text-gray-800" : "text-gray-500"}
                >
                  {benefit.text}
                </span>
              </div>
              <div
                className={`w-3 h-3 rounded-full ${benefit.active ? "bg-green-500" : "bg-gray-300"}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Options */}
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-gray-800">Upgrade Options</h3>
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold">Premium Plus</h4>
              <p className="text-sm opacity-90">Unlock all features</p>
            </div>
            <div className="text-right">
              <p className="font-bold">₹4,999</p>
              <button className="bg-white text-orange-500 px-4 py-1 rounded-full text-xs font-medium mt-1">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivityPage = () => (
    <div className="p-4 animate-in slide-in-from-right-4 duration-300">
      {/* Weekly Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          This Week's Activity
        </h2>

        {/* Activity Chart */}
        <div className="space-y-4">
          {activityData.map((day, index) => {
            const maxCalories = Math.max(
              ...activityData.map((d) => d.calories)
            );
            const widthPercentage =
              day.calories > 0 ? (day.calories / maxCalories) * 100 : 0;

            return (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-8 text-sm font-medium text-gray-600">
                  {day.day}
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-3 relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${widthPercentage}%`,
                      animationDelay: `${index * 100}ms`,
                    }}
                  />
                </div>
                <div className="w-16 text-sm text-gray-600 text-right">
                  {day.calories} cal
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-6 h-6" />
            <span className="text-2xl font-bold">12</span>
          </div>
          <p className="text-sm opacity-90">Workouts This Month</p>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-6 h-6" />
            <span className="text-2xl font-bold">85%</span>
          </div>
          <p className="text-sm opacity-90">Goal Achievement</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <h3 className="font-bold text-lg mb-4 text-gray-800">
          Recent Activities
        </h3>
        <div className="space-y-3">
          {[
            {
              activity: "Upper Body Workout",
              time: "2 hours ago",
              duration: "45 min",
              calories: 320,
            },
            {
              activity: "Yoga Session",
              time: "Yesterday",
              duration: "60 min",
              calories: 180,
            },
            {
              activity: "Cardio Training",
              time: "2 days ago",
              duration: "30 min",
              calories: 250,
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {activity.activity}
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  {activity.duration}
                </p>
                <p className="text-xs text-gray-500">{activity.calories} cal</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfilePage = () => (
    <div className="p-4 animate-in slide-in-from-right-4 duration-300">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary to-purple-600 rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
        <div className="flex items-center space-x-4 relative z-10">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-sm opacity-90">Premium Member</p>
            <p className="text-xs opacity-75">Member since Jan 2024</p>
          </div>
        </div>
        <div className="absolute -right-6 -bottom-6 text-6xl opacity-10">
          🏆
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button className="bg-white rounded-xl p-4 shadow-lg flex flex-col items-center space-y-2 hover:shadow-xl transition-all">
          <Calendar className="w-8 h-8 text-primary" />
          <span className="text-sm font-medium text-gray-800">
            Book Session
          </span>
        </button>

        <button className="bg-white rounded-xl p-4 shadow-lg flex flex-col items-center space-y-2 hover:shadow-xl transition-all">
          <Heart className="w-8 h-8 text-red-500" />
          <span className="text-sm font-medium text-gray-800">Favorites</span>
        </button>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-lg text-gray-800">Account Settings</h3>
        </div>

        <div className="divide-y divide-gray-100">
          {[
            {
              icon: <User className="w-5 h-5" />,
              label: "Personal Information",
              color: "text-blue-600",
            },
            {
              icon: <CreditCard className="w-5 h-5" />,
              label: "Payment Methods",
              color: "text-green-600",
            },
            {
              icon: <Bell className="w-5 h-5" />,
              label: "Notifications",
              color: "text-orange-600",
            },
            {
              icon: <Settings className="w-5 h-5" />,
              label: "Preferences",
              color: "text-gray-600",
            },
          ].map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`${item.color}`}>{item.icon}</div>
                <span className="font-medium text-gray-800">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* App Info */}
      <div className="mt-6 text-center">
        <p className="text-gray-500 text-sm">GymPass v2.1.0</p>
        <p className="text-gray-400 text-xs mt-1">Built with Next.js 15</p>
      </div>
    </div>
  );

  const navigationItems = [
    { id: "gyms", icon: Dumbbell, label: "Gyms" },
    { id: "membership", icon: CreditCard, label: "Membership" },
    { id: "activity", icon: BarChart3, label: "Activity" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative shadow-2xl overflow-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Header */}

      {/* Main Content */}
      <main className="pb-20 bg-gray-50 min-h-screen">
        {activeTab === "gyms" && renderGymsPage()}
        {activeTab === "membership" && renderMembershipPage()}
        {activeTab === "activity" && renderActivityPage()}
        {activeTab === "profile" && renderProfilePage()}
      </main>

      {/* Bottom Navigation */}

      {/* Floating Action Button */}
      {/* {activeTab === 'gyms' && (
        <button className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-primary to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-200 z-30">
          <MapPin className="w-6 h-6" />
        </button>
      )} */}
    </div>
  );
};

export default HomePage;
