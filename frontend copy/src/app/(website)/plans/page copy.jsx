"use client"
import React, { useState } from 'react';
import { Check, Star, Zap, Crown, ArrowLeft, Clock, Users, MapPin, Smartphone, Heart, Shield, Calendar, Trophy, Dumbbell, Coffee, Wifi, Camera } from 'lucide-react';

const GymMembershipApp = () => {
  const [currentPage, setCurrentPage] = useState('overview');

  // Navigation Component
  const Navigation = ({ activePage, onPageChange }) => (
    <div className="flex justify-center mb-8">
      <div className="bg-gray-800 rounded-full p-1 border border-gray-700">
        <button
          onClick={() => onPageChange('overview')}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activePage === 'overview' 
              ? 'bg-[#ddff45] text-[#181818]' 
              : 'text-gray-300 hover:text-[#ddff45]'
          }`}
        >
          All Plans
        </button>
        <button
          onClick={() => onPageChange('basic')}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activePage === 'basic' 
              ? 'bg-[#ddff45] text-[#181818]' 
              : 'text-gray-300 hover:text-[#ddff45]'
          }`}
        >
          Basic
        </button>
        <button
          onClick={() => onPageChange('pro')}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activePage === 'pro' 
              ? 'bg-[#ddff45] text-[#181818]' 
              : 'text-gray-300 hover:text-[#ddff45]'
          }`}
        >
          Pro
        </button>
        <button
          onClick={() => onPageChange('elite')}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activePage === 'elite' 
              ? 'bg-[#ddff45] text-[#181818]' 
              : 'text-gray-300 hover:text-[#ddff45]'
          }`}
        >
          Elite
        </button>
      </div>
    </div>
  );

  // Basic Plan Page
  const BasicPlanPage = () => (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex p-6 bg-gray-800 rounded-full mb-6">
          <Zap className="w-12 h-12 text-[#ddff45]" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#ddff45] to-white bg-clip-text text-transparent">
          Basic Plan
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Perfect for beginners and casual gym-goers. Get access to all the essentials you need to start your fitness journey without breaking the bank.
        </p>
        <div className="text-center mb-8">
          <span className="text-6xl font-bold text-[#ddff45]">$29</span>
          <span className="text-gray-400 text-2xl ml-2">/month</span>
        </div>
        <button className="bg-[#ddff45] text-[#181818] px-12 py-4 rounded-xl font-bold text-xl hover:bg-[#c8e63d] transition-all duration-300 transform hover:scale-105">
          Start Basic Plan
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-gradient-to-b from-gray-900 to-[#181818] rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-[#ddff45]">What's Included</h3>
          <ul className="space-y-4">
            {[
              { icon: <Dumbbell className="w-5 h-5" />, text: "Full access to gym equipment" },
              { icon: <MapPin className="w-5 h-5" />, text: "Locker room and shower facilities" },
              { icon: <Smartphone className="w-5 h-5" />, text: "Mobile app with workout tracking" },
              { icon: <Users className="w-5 h-5" />, text: "Community support and forums" },
              { icon: <Clock className="w-5 h-5" />, text: "Access during standard hours (6AM-10PM)" },
              { icon: <Wifi className="w-5 h-5" />, text: "Free WiFi throughout the facility" }
            ].map((feature, index) => (
              <li key={index} className="flex items-center">
                <div className="text-[#ddff45] mr-3">{feature.icon}</div>
                <span className="text-gray-300">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-b from-gray-900 to-[#181818] rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-[#ddff45]">Perfect For</h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-[#ddff45] rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-white mb-2">Fitness Beginners</h4>
                <p className="text-gray-400">New to working out and want to establish a routine without overwhelming features.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-[#ddff45] rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-white mb-2">Budget-Conscious Members</h4>
                <p className="text-gray-400">Looking for affordable access to quality gym equipment and facilities.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-[#ddff45] rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-white mb-2">Casual Gym-Goers</h4>
                <p className="text-gray-400">Workout 2-3 times per week and prefer self-guided fitness routines.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Access */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 mb-16 border border-gray-700">
        <h3 className="text-3xl font-bold text-center mb-8 text-[#ddff45]">Equipment & Facilities Access</h3>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="w-16 h-16 bg-[#ddff45] rounded-full flex items-center justify-center mx-auto mb-4">
              <Dumbbell className="w-8 h-8 text-[#181818]" />
            </div>
            <h4 className="font-semibold mb-2">Cardio Zone</h4>
            <p className="text-gray-400 text-sm">Treadmills, bikes, ellipticals</p>
          </div>
          <div className="p-4">
            <div className="w-16 h-16 bg-[#ddff45] rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-[#181818]" />
            </div>
            <h4 className="font-semibold mb-2">Free Weights</h4>
            <p className="text-gray-400 text-sm">Dumbbells, barbells, plates</p>
          </div>
          <div className="p-4">
            <div className="w-16 h-16 bg-[#ddff45] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#181818]" />
            </div>
            <h4 className="font-semibold mb-2">Machine Area</h4>
            <p className="text-gray-400 text-sm">Resistance machines, cables</p>
          </div>
          <div className="p-4">
            <div className="w-16 h-16 bg-[#ddff45] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#181818]" />
            </div>
            <h4 className="font-semibold mb-2">Stretching Area</h4>
            <p className="text-gray-400 text-sm">Mats, foam rollers, bands</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Pro Plan Page
  const ProPlanPage = () => (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16 relative">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-[#ddff45] text-[#181818] px-8 py-3 rounded-full text-sm font-bold">
            MOST POPULAR
          </div>
        </div>
        <div className="inline-flex p-6 bg-gradient-to-r from-[#ddff45] to-[#b8d63a] rounded-full mb-6 mt-8">
          <Star className="w-12 h-12 text-[#181818]" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#ddff45] to-white bg-clip-text text-transparent">
          Pro Plan
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          The perfect balance of features and value. Ideal for dedicated fitness enthusiasts who want professional guidance and premium amenities.
        </p>
        <div className="text-center mb-8">
          <span className="text-6xl font-bold text-[#ddff45]">$59</span>
          <span className="text-gray-400 text-2xl ml-2">/month</span>
        </div>
        <button className="bg-[#ddff45] text-[#181818] px-12 py-4 rounded-xl font-bold text-xl hover:bg-[#c8e63d] transition-all duration-300 transform hover:scale-105 shadow-[#ddff45]/30 shadow-lg">
          Choose Pro Plan
        </button>
      </div>

      {/* Features Comparison */}
      <div className="bg-gradient-to-b from-gray-900 to-[#181818] rounded-2xl p-8 mb-16 border-2 border-[#ddff45] shadow-[#ddff45]/20 shadow-2xl">
        <h3 className="text-3xl font-bold text-center mb-8 text-[#ddff45]">Everything in Basic, Plus:</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <ul className="space-y-4">
            {[
              { icon: <Users className="w-5 h-5" />, text: "2 Personal Training Sessions/Month", highlight: true },
              { icon: <Calendar className="w-5 h-5" />, text: "Unlimited Group Fitness Classes", highlight: true },
              { icon: <Heart className="w-5 h-5" />, text: "Nutrition Consultation & Meal Plans", highlight: true },
              { icon: <Clock className="w-5 h-5" />, text: "Priority Class & Equipment Booking", highlight: true }
            ].map((feature, index) => (
              <li key={index} className="flex items-center">
                <div className="text-[#ddff45] mr-3">{feature.icon}</div>
                <span className="text-white font-medium">{feature.text}</span>
                {feature.highlight && <div className="ml-2 w-2 h-2 bg-[#ddff45] rounded-full animate-pulse"></div>}
              </li>
            ))}
          </ul>
          <ul className="space-y-4">
            {[
              { icon: <Users className="w-5 h-5" />, text: "2 Guest Passes Per Month", highlight: true },
              { icon: <Smartphone className="w-5 h-5" />, text: "Advanced Workout Analytics", highlight: true },
              { icon: <Trophy className="w-5 h-5" />, text: "Body Composition Analysis", highlight: true },
              { icon: <Coffee className="w-5 h-5" />, text: "Complimentary Towel Service", highlight: true }
            ].map((feature, index) => (
              <li key={index} className="flex items-center">
                <div className="text-[#ddff45] mr-3">{feature.icon}</div>
                <span className="text-white font-medium">{feature.text}</span>
                {feature.highlight && <div className="ml-2 w-2 h-2 bg-[#ddff45] rounded-full animate-pulse"></div>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Class Schedule Preview */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-gradient-to-b from-gray-900 to-[#181818] rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-[#ddff45]">Popular Classes Included</h3>
          <div className="space-y-4">
            {[
              { name: "HIIT Bootcamp", time: "Mon, Wed, Fri - 7:00 AM", intensity: "High" },
              { name: "Yoga Flow", time: "Tue, Thu - 6:30 PM", intensity: "Low" },
              { name: "Strength Training", time: "Sat - 10:00 AM", intensity: "Medium" },
              { name: "Cycling", time: "Daily - 5:30 PM", intensity: "High" }
            ].map((classItem, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-semibold text-white">{classItem.name}</h4>
                  <p className="text-gray-400 text-sm">{classItem.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  classItem.intensity === 'High' ? 'bg-red-500/20 text-red-400' :
                  classItem.intensity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {classItem.intensity}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-b from-gray-900 to-[#181818] rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-[#ddff45]">Personal Training Benefits</h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-[#ddff45] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-[#181818] font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Personalized Workout Plans</h4>
                <p className="text-gray-400">Custom routines designed for your specific goals and fitness level.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-[#ddff45] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-[#181818] font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Form Correction & Safety</h4>
                <p className="text-gray-400">Expert guidance to prevent injuries and maximize results.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-[#ddff45] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-[#181818] font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Progress Tracking</h4>
                <p className="text-gray-400">Regular assessments and adjustments to keep you on track.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}