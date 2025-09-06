"use client"
import { Bell, Dumbbell, Settings } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
       
      <header className="bg-gradient-to-r from-primary via-purple-600 to-pink-500 text-white p-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">GymPass</h1>
              <p className="text-xs opacity-90">Find your perfect gym</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
  )
}

export default Navbar