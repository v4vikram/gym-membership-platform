// components/SidebarFilter.tsx
"use client";

import { Slider } from "@/components/ui/slider"; // Make sure slider is added via ShadCN
import { useState, useEffect } from "react";

export const SidebarFilter = ({
  selectedCategories,
  onChange,
  onPriceChange,
  onRatingChange,
  setPrice,
  price,
  setRating,
  rating,
  handleResetFilters
}) => {

  useEffect(() => {
    onPriceChange(price[0]);
  }, [price]);

  useEffect(() => {
    onRatingChange(rating);
  }, [rating]);

  const categories = ["electronics", "clothes", "fitness"]; // Replace with dynamic if needed

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        {categories.map((cat) => (
          <div key={cat} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => onChange(cat)}
              className="mr-2"
            />
            <label>{cat}</label>
          </div>
        ))}
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Price (Under ₹{price[0]})</h3>
        <Slider
          defaultValue={price}
          max={2000}
          step={10}
          onValueChange={setPrice}
        />
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Minimum Rating</h3>
        <select
          className="w-full p-2 border rounded"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">All</option>
          <option value="1">1★ & up</option>
          <option value="2">2★ & up</option>
          <option value="3">3★ & up</option>
          <option value="4">4★ & up</option>
          <option value="5">5★</option>
        </select>
      </div>

         <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
          >
            Reset Filters
          </button>
    </div>
  );
};
