"use client";
import { BarChart3, CreditCard, Dumbbell, User } from "lucide-react";
import React, { useState } from "react";

const Footer = () => {
  const [activeTab, setActiveTab] = useState("gyms");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const handlePageTransition = (tab) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 150);
  };

  const navigationItems = [
    { id: "gyms", icon: Dumbbell, label: "Gyms" },
    { id: "membership", icon: CreditCard, label: "Membership" },
    { id: "activity", icon: BarChart3, label: "Activity" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="flex justify-around items-center">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handlePageTransition(item.id)}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-primary/10 scale-105"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <IconComponent
                  className={`w-6 h-6 ${isActive ? "animate-pulse" : ""}`}
                />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <div className="w-1 h-1 bg-primary rounded-full absolute -bottom-1" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Footer;
