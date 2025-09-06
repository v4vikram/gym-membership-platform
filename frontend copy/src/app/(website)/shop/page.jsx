"use client";

import { useState } from "react";
import { useProductsHook } from "@/hooks/useProductsHook";
import { ProductList } from "@/components/ProductList";
import { SidebarFilter } from "@/components/SidebarFilter";

export default function ShopPage() {
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(800); // max price
   const [price, setPrice] = useState([800]);
  const [minRating, setMinRating] = useState("");
    const [rating, setRating] = useState("");

  const { data: products = [], isLoading, isError } = useProductsHook();

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter((p) => {
    const inCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p?.category);
    console.log(p?.price);
    const inPrice = p?.price <= maxPrice;

    const inRating = minRating ? p?.rating >= Number(minRating) : true;
    return inCategory && inPrice && inRating;
  });

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(800); // or your original max value
    setPrice([800])
    setMinRating("");
    setRating("")
  };
  console.log("rating", rating)

  return (
    <div className="container mx-auto p-6 mt-20">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 border-r pr-4 hidden md:block">
          <SidebarFilter
            selectedCategories={selectedCategories}
            onChange={toggleCategory}
            onPriceChange={setMaxPrice}
            onRatingChange={setMinRating}
            setPrice={setPrice}
            price={price}
            setRating={setRating}
            rating={rating}
            handleResetFilters={handleResetFilters}
            
          />
        </aside>

        {/* Products */}
        <main className="flex-1">
       
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p className="text-red-500">Failed to load products.</p>
          ) : (
            <ProductList products={filteredProducts} />
          )}
        </main>
      </div>
    </div>
  );
}
