"use client";
import React from "react";
import { Clock, MapPin, LogOut } from "lucide-react";

const UserVisitHistory = ({ visits }) => {
  // Mock data for demonstration
  const mockVisits = visits || [];

  if (!mockVisits || mockVisits.length === 0) {
    return (
      <div className="px-6 py-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">No visit history found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 mb-6">
      <h3 className="font-semibold text-lg mb-3 text-gray-900 mt-5">
        Visit History
      </h3>
      <div className="space-y-3">
        {mockVisits.map((visit) => (
          <div
            key={visit._id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            {/* Header Row */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900 text-base">
                  {visit.gym?.name || "Unknown Gym"}
                </h4>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  {visit.gym?.location || "Location not available"}
                </div>
              </div>
              <span className="text-xs text-gray-400 font-mono">
                {new Date(visit.checkInTime).toLocaleDateString()}
              </span>
            </div>

            {/* Time Row */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-green-500" />
                <span className="font-mono">
                  {new Date(visit.checkInTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {visit.checkOutTime ? (
                <div className="flex items-center text-sm text-gray-600">
                  <LogOut className="w-3.5 h-3.5 mr-1.5 text-red-500" />
                  <span className="font-mono">
                    {new Date(visit.checkOutTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                  <span className="text-xs text-orange-600 font-medium">
                    Active
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserVisitHistory;
