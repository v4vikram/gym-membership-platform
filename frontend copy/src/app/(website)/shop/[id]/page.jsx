"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductDetail } from "@/components/ProductDetail";
import { useProductsHook } from "@/hooks/useProductsHook";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const { data: products = [], isLoading, isError } = useProductsHook();

  useEffect(() => {
    if (params?.id && products.length > 0) {
      const found = products.find((p) => p._id === params.id);
      setProduct(found || null);
    }
  }, [params?.id, products]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load products.</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProductGallery image={product.image} />
      <ProductDetail product={product} />
    </div>
  );
}
