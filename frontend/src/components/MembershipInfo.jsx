import {
  Crown,
  Calendar,
  DollarSign,
  FileText,
  Loader2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MembershipInfo({ loading, membership, userQrCode }) {
  const [toggleQrCode, setToggleQrCode] = useState(false);
  console.log("Rendering MembershipInfo with:", userQrCode);
  // Mock data for demonstration

  function handleQrCode() {
    setToggleQrCode(!toggleQrCode);
  }

  return (
    <div className="">
      {toggleQrCode && userQrCode &&  (
        <div className="fixed top-0 left-0 flex justify-center items-center z-50 p-2 rounded-lg border border-gray-300 w-full h-screen bg-black  ">
          {/* Reset Button */}
          {toggleQrCode && (
            <button
              type="button"
              onClick={() => setToggleQrCode(false)}
              className="absolute right-4 top-8 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <img
            src={userQrCode}
            alt="User QR Code"
            className="object-cover rounded-lg cursor-pointer"
          />
        </div>
      )}

      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
       {
        membership && (<span>
           {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-2 py-4">
          <div className="flex items-start justify-between space-x-3">
            <div className="">
              <div
                className="bg-white/20 w-20 h-20  rounded-xl"
                onClick={handleQrCode}
              >
                <img
                  src={userQrCode}
                  alt="User QR Code"
                  className="object-cover rounded-lg m-auto"
                />
              </div>
              <p className="text-sm">Scan for enter</p>
            </div>
            {/* <h3 className="font-bold text-xl text-white">Scan for Enter</h3> */}
            {/* Status Badge */}
            <div className="flex justify-center">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-2 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-xl text-white">Membership</h3>
          </div>
        </div>

        </span>)
       }
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <p className="ml-3 text-gray-600">
                Loading membership details...
              </p>
            </div>
          ) : membership ? (
            <div className="space-y-6">
              {/* Plan Name Card */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 flex items-center border border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  {/* <p className="text-sm font-medium text-blue-700">Plan Name</p> */}
                </div>
                <p className="font-bold text-sm text-gray-800 ml-4">
                  {membership.name}
                </p>
              </div>

              {/* Price and Duration Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Price Card */}
                <div className="bg-green-50 rounded-xl p-4 flex items-center border border-green-100">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500 p-2 rounded-lg">
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                    {/* <p className="text-sm font-medium text-green-700">Price</p> */}
                  </div>
                  <p className="font-bold text-sm text-gray-800 ml-4">
                    ₹{membership.price.toLocaleString()}
                  </p>
                </div>

                {/* Duration Card */}
                <div className="bg-orange-50 rounded-xl p-4 flex items-center border border-orange-100">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-500 p-2 rounded-lg">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    {/* <p className="text-sm font-medium text-orange-700">
                      Duration
                    </p> */}
                  </div>
                  <p className="font-bold text-sm text-gray-800 ml-4">
                    {membership.durationDays} days
                  </p>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center border border-gray-200">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="bg-gray-500 p-2 rounded-lg mt-0.5">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  {/* <p className="text-sm font-medium text-gray-700">
                    Description
                  </p> */}
                </div>
                <p className="font-bold text-sm text-gray-800 ml-4">
                  {membership.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium mb-2">
                No Active Membership
              </p>
              <p className="text-gray-400 text-sm">
                Subscribe to a plan to get started
              </p>
              <Link
                href={"/dashboard"}
                className="block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Browse Plans
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
