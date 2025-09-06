"use client";

import React from 'react';
import { Check, Zap, Clock, Users, MapPin, Smartphone, Heart, Dumbbell, Wifi, Shield, Star } from 'lucide-react';

const BasicPlanTabs = () => {
  const [activeTab, setActiveTab] = React.useState('1m');

  const plans = {
    '1m': {
      title: 'Basic Plan – 1 Month',
      price: '₹499',
      originalPrice: '₹599',
      discount: 'Save ₹100',
      description: 'Perfect for trying out our facilities and getting started with your fitness journey.',
      features: [
        'Full gym equipment access',
        'Locker room facilities',
        'Mobile app access',
        'Basic workout guidance',
        'Community support forum'
      ]
    },
    '3m': {
      title: 'Basic Plan – 3 Months',
      price: '₹1299',
      originalPrice: '₹1497',
      discount: 'Save ₹198',
      description: 'Build consistency with our quarterly plan. Ideal for establishing a solid workout routine.',
      features: [
        'All 1-month features',
        'Progress tracking reports',
        'Workout plan templates',
        'Priority customer support',
        'Fitness assessment'
      ]
    },
    '6m': {
      title: 'Basic Plan – 6 Months',
      price: '₹2499',
      originalPrice: '₹2994',
      discount: 'Save ₹495',
      popular: true,
      description: 'Our most popular basic option. Perfect for seeing real transformation results.',
      features: [
        'All 3-month features',
        'Body composition tracking',
        '1 personal training session',
        'Nutrition basics guide',
        'Workout variation library'
      ]
    },
    '1y': {
      title: 'Basic Plan – 1 Year',
      price: '₹4499',
      originalPrice: '₹5988',
      discount: 'Save ₹1489',
      description: 'Commit to your fitness journey with our annual plan. Maximum savings and benefits.',
      features: [
        'All 6-month features',
        '2 personal training sessions',
        'Advanced progress analytics',
        'Priority equipment access',
        'Member appreciation events'
      ]
    },
    '2y': {
      title: 'Basic Plan – 2 Years',
      price: '₹7999',
      originalPrice: '₹11976',
      discount: 'Save ₹3977',
      bestValue: true,
      description: 'Ultimate commitment plan with maximum savings and exclusive long-term member benefits.',
      features: [
        'All 1-year features',
        '4 personal training sessions',
        'Premium support access',
        'Free guest passes (2/month)',
        'Exclusive workshops access'
      ]
    }
  };

  const TabsList = ({ children }) => (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-black-700 p-2 rounded-xl border border-gray-700">
      {children}
    </div>
  );

  const TabsTrigger = ({ value, children, isActive, onClick }) => (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 relative ${
        isActive 
          ? 'bg-[#ddff45] text-[#181818] shadow-lg' 
          : 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-[#ddff45]'
      }`}
    >
      {plans[value]?.popular && (
        <div className="absolute -top-2 -right-2">
          <Star className="w-4 h-4 text-[#ddff45] fill-[#ddff45]" />
        </div>
      )}
      {plans[value]?.bestValue && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-[#ddff45] to-green-400 text-[#181818] text-xs font-bold px-2 py-1 rounded-full">
            BEST VALUE
          </span>
        </div>
      )}
      {children}
    </button>
  );

  const TabsContent = ({ value, children, isActive }) => (
    isActive ? <div className="mt-6">{children}</div> : null
  );

  return (
    <div className="min-h-screen bg-[#181818] text-white py-16 px-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 bg-black-700 rounded-full mb-6">
            <Zap className="w-10 h-10 text-[#ddff45]" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#ddff45] to-white bg-clip-text text-transparent">
            Basic Plan Options
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect duration for your fitness journey. All plans include our core features with additional benefits for longer commitments.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <TabsList>
            <TabsTrigger 
              value="1m" 
              isActive={activeTab === '1m'} 
              onClick={setActiveTab}
            >
              1 Month
            </TabsTrigger>
            <TabsTrigger 
              value="3m" 
              isActive={activeTab === '3m'} 
              onClick={setActiveTab}
            >
              3 Months
            </TabsTrigger>
            <TabsTrigger 
              value="6m" 
              isActive={activeTab === '6m'} 
              onClick={setActiveTab}
            >
              6 Months
            </TabsTrigger>
            <TabsTrigger 
              value="1y" 
              isActive={activeTab === '1y'} 
              onClick={setActiveTab}
            >
              1 Year
            </TabsTrigger>
            <TabsTrigger 
              value="2y" 
              isActive={activeTab === '2y'} 
              onClick={setActiveTab}
            >
              2 Years
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        {Object.entries(plans).map(([key, plan]) => (
          <TabsContent key={key} value={key} isActive={activeTab === key}>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Plan Details Card */}
              <div className={`bg-gradient-to-b from-black to-black-500 rounded-2xl p-8 border-2 ${
                plan.popular ? 'border-[#ddff45] shadow-[#ddff45]/20 shadow-2xl' : 
                plan.bestValue ? 'border-green-400 shadow-green-400/20 shadow-2xl' : 
                'border-gray-700'
              } relative overflow-hidden.`}>
                
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ddff45]/5 rounded-full -translate-y-16 translate-x-16"></div>
                
                {/* Popular/Best Value Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#ddff45] text-[#181818] px-6 py-2 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                {plan.bestValue && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#ddff45] to-green-400 text-[#181818] px-6 py-2 rounded-full text-sm font-bold">
                      BEST VALUE
                    </div>
                  </div>
                )}

                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4 text-[#ddff45]">{plan.title}</h3>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">{plan.description}</p>
                  
                  {/* Pricing */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="text-5xl font-bold text-[#ddff45]">{plan.price}</span>
                      <span className="text-2xl text-gray-400 line-through">{plan.originalPrice}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {plan.discount}
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">One-time payment</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 text-white">What's Included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-5 h-5 text-[#ddff45] mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-[#ddff45] text-[#181818] py-4 rounded-xl font-bold text-lg hover:bg-[#c8e63d] transition-all duration-300 transform hover:scale-105 shadow-[#ddff45]/30 shadow-lg">
                    Choose This Plan
                  </button>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-8">
                {/* Core Features */}
                <div className="bg-gradient-to-b from-gray-900 to-[#181818] rounded-2xl p-8 border border-gray-700">
                  <h4 className="text-2xl font-bold mb-6 text-[#ddff45]">Core Basic Features</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: <Dumbbell className="w-6 h-6" />, text: "All Equipment Access" },
                      { icon: <Clock className="w-6 h-6" />, text: "6AM - 10PM Hours" },
                      { icon: <MapPin className="w-6 h-6" />, text: "Locker & Showers" },
                      { icon: <Smartphone className="w-6 h-6" />, text: "Mobile App" },
                      { icon: <Users className="w-6 h-6" />, text: "Community Access" },
                      { icon: <Wifi className="w-6 h-6" />, text: "Free WiFi" }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-black-700/50 rounded-lg">
                        <div className="text-[#ddff45]">{feature.icon}</div>
                        <span className="text-gray-300 text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment Access */}
                <div className="bg-gradient-to-b from-gray-900 to-[#181818] rounded-2xl p-8 border border-gray-700">
                  <h4 className="text-2xl font-bold mb-6 text-[#ddff45]">Equipment & Facilities</h4>
                  <div className="space-y-4">
                    {[
                      { category: "Cardio Zone", items: "Treadmills, Ellipticals, Stationary Bikes, Rowing Machines" },
                      { category: "Strength Training", items: "Free Weights, Dumbbells, Barbells, Weight Machines" },
                      { category: "Functional Area", items: "Resistance Bands, Kettlebells, Medicine Balls, TRX" },
                      { category: "Amenities", items: "Clean Lockers, Shower Facilities, Water Stations" }
                    ].map((section, index) => (
                      <div key={index} className="border-l-4 border-[#ddff45] pl-4">
                        <h5 className="font-semibold text-white mb-1">{section.category}</h5>
                        <p className="text-gray-400 text-sm">{section.items}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Support & Policies */}
                <div className="bg-gradient-to-b from-gray-900 to-[#181818] rounded-2xl p-8 border border-gray-700">
                  <h4 className="text-2xl font-bold mb-6 text-[#ddff45]">Support & Policies</h4>
                  <div className="space-y-4">
                    {[
                      { icon: <Shield className="w-5 h-5" />, title: "7-Day Money Back", desc: "Not satisfied? Get full refund within 7 days" },
                      { icon: <Heart className="w-5 h-5" />, title: "Health & Safety", desc: "Regular equipment maintenance and cleaning" },
                      { icon: <Users className="w-5 h-5" />, title: "24/7 Support", desc: "Customer service available round the clock" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="text-[#ddff45] mt-1">{item.icon}</div>
                        <div>
                          <h5 className="font-semibold text-white mb-1">{item.title}</h5>
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 max-w-4xl mx-auto border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-[#ddff45]">Ready to Start Your Fitness Journey?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of members who have already transformed their lives with our Basic Plan. 
              No hidden fees, no long-term contracts - just honest pricing and real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#ddff45] text-[#181818] px-8 py-3 rounded-lg font-bold hover:bg-[#c8e63d] transition-all duration-300">
                Start Free Trial
              </button>
              <button className="border-2 border-[#ddff45] text-[#ddff45] px-8 py-3 rounded-lg font-bold hover:bg-[#ddff45] hover:text-[#181818] transition-all duration-300">
                Schedule Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicPlanTabs;