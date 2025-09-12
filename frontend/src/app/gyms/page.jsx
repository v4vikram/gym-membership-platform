"use client";
import React, { useEffect, useState } from "react";
import { Dumbbell, MapPin, Phone, Search, X } from "lucide-react";
import { useGymStore } from "@/store/useGymStore";
import { useParams } from "next/navigation";

const gymsPage = () => {
  const { loading, gyms, getAllGym, searchGym } = useGymStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!searchQuery) {
      getAllGym();
    }
    searchGym(`q=${searchQuery}`);
  }, [searchQuery]);

  // console.log("Gyms data:", gyms);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading gyms...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-6">
      {/* Search Bar */}
      <div className="relative mb-5">
        {/* Search Icon */}
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

        {/* Input */}
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-100 rounded-2xl py-4 px-12 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-200"
        />

        {/* Reset Button */}
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Dumbbell className="w-5 h-5 text-blue-600" />
        Partner Gyms {`(${gyms.length})`}
      </h2>
      <div className="space-y-4">
        {gyms && gyms.length > 0 ? (
          gyms.map((gym) => (
            <div
              key={gym._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {gym.name}
              </h3>
              <div className="flex items-center gap-2 text-gray-600 mt-2">
                <MapPin className="w-4 h-4 text-purple-500" />
                <span>{gym.location || "No location info"}</span>
              </div>
              {gym.contactInfo && (
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>{gym.contactInfo}</span>
                </div>
              )}
              <p className="text-xs text-gray-400 mt-2">
                QR Code: {gym.qrCode}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No gyms found</p>
        )}
      </div>
    </div>
  );
};

export default gymsPage;
