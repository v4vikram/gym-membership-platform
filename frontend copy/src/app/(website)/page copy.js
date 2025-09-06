'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCartHook } from "@/hooks/useCartHook";
import { useProductsHook } from "@/hooks/useProductsHook";
import { ProductCard } from "@/components/ProductCard";
import { Check } from "lucide-react";

const collections = [
  { title: "Men's Wear", image: "https://via.placeholder.com/400x300?text=Men's+Wear" },
  { title: "Women's Wear", image: "https://via.placeholder.com/400x300?text=Women's+Wear" },
  { title: "Electronics", image: "https://via.placeholder.com/400x300?text=Electronics" },
];

export default function HomePage() {
  const { data: featuredProducts = [], isLoading, isError } = useProductsHook();
  const { addToCart } = useCartHook();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="bg-black text-white font-sans">
      {/* Header */}
      {/* <header className="flex justify-between items-center p-4 px-6 bg-black text-white">
        <h1 className="text-2xl font-bold text-neon-green">🏋️‍♂️ Elevate Fit</h1>
        <nav className="space-x-6 hidden md:flex">
          <Link href="#" className="hover:text-neon-green">Home</Link>
          <Link href="#" className="hover:text-neon-green">Programs</Link>
          <Link href="#" className="hover:text-neon-green">Transformations</Link>
          <Link href="#" className="hover:text-neon-green">Pricing</Link>
          <Link href="#" className="hover:text-neon-green">FAQ</Link>
        </nav>
        <Button className="bg-neon-green text-black font-semibold">Login</Button>
      </header> */}

      {/* Hero Section */}
      <section className="bg-black hero-section">
        <div className="container-lg mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-16  gap-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-neon-green">Transform</span> Your Body <br /> Elevate Your Life
            </h1>
            <p className="text-gray-300">
              Train your body. Strengthen your mind. Become the version of you that you've always imagined.
            </p>
            <div className="flex gap-4">
              <Button className="bg-neon-green text-black">Join Now</Button>
              <Button variant="outline" className={"text-black"}>Watch Video</Button>
            </div>
          </div>
          <div className="flex-1 w-[]400px] h-[500px] relative img-gradient">
            <Image src="/assets/img/fitness-boy.webp" alt="Hero Image" fill className="w-full h-full object-contain" />
          </div>
        </div>

      </section>

      {/* Banner Slider */}
      {/* <section className="w-full">
        <Swiper slidesPerView={1} loop={true} autoplay>
          <SwiperSlide>
            <img
              src="https://via.placeholder.com/1200x400?text=Big+Sale+Banner+1"
              alt="Banner 1"
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://via.placeholder.com/1200x400?text=New+Arrivals+Banner+2"
              alt="Banner 2"
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </section> */}

      {/* Featured Products */}
      <section className="container-lg py-10">
        <h2 className="text-neon-green text-3xl font-bold mb-6 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map(
            (product) =>
              product.isFeatured === true && (
                <ProductCard key={product._id} product={product} />
              )
          )}
        </div>
      </section>

      {/*  Best Seller */}
      <section className="container-lg py-10">
        <h2 className="text-neon-green text-3xl font-bold mb-6 text-center">
          Best Seller
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map(
            (product) => {

              // console.log("product===>", product)
              return product.isBestSeller === true && (
                <ProductCard key={product._id} product={product} />
              )
            }

          )}
        </div>
      </section>

      {/* Gym Features */}
      <section className="bg-black text-white py-12 px-4 md:px-12">
        <div className="container-lg mx-auto flex flex-col md:flex-row items-center gap-8">

         
          <div className="md:w-1/2 space-y-6">
            <h2 className="h2 text-neon-green text-3xl font-bold mb-6">Why Choose <br />Our Gym</h2>
            

            <div className="space-y-4">
              
              <div className="flex items-start gap-4">
                <span className="text-neon-green text-xl"><Check/></span>
                <div>
                  <h4 className="font-semibold text-lg">Modern Equipment</h4>
                  <p className="text-sm text-gray-300">Train with confidence using our state-of-the-art fitness equipment, designed for maximum results.</p>
                </div>
              </div>

            
              <div className="flex items-start gap-4">
                <span className="text-neon-green text-xl"><Check/></span>
                <div>
                  <h4 className="font-semibold text-lg">Qualified Trainers</h4>
                  <p className="text-sm text-gray-300">Our certified trainers are dedicated to your success, offering motivation and guidance in each fitness journey.</p>
                </div>
              </div>

             
              <div className="flex items-start gap-4">
                <span className="text-neon-green text-xl"><Check/></span>
                <div>
                  <h4 className="font-semibold text-lg">Variety of Classes</h4>
                  <p className="text-sm text-gray-300">No matter your style—HIIT, yoga, or group sessions—we have a fitness program tailored to your goals.</p>
                </div>
              </div>

             
              <div className="flex items-start gap-4">
                <span className="text-neon-green text-xl"><Check/></span>
                <div>
                  <h4 className="font-semibold text-lg">Clean and Safe Environment</h4>
                  <p className="text-sm text-gray-300">Experience workouts in a safe, clean environment that promotes a fresh, healthy experience for every member.</p>
                </div>
              </div>
            </div>
          </div>

         
          <div className="md:w-1/2">
            <img src="/assets/img/why-choose-us.webp" alt="why-choose-us" className="w-full h-auto rounded-lg shadow-lg object-cover" width={500} height={500}/>
          </div>

        </div>
      </section>


      {/* Testimonials */}
      {/* <section className="bg-black py-16 px-6">
        <h3 className="text-3xl font-semibold text-center mb-12">What Our Members Are Saying</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {['"This program changed me..."', '"I feel stronger..."', '"Highly recommend this gym!"'].map((quote, idx) => (
            <Card key={idx} className="bg-gray-800">
              <CardContent className="p-6 text-white text-sm">{quote}</CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Pricing Plans */}
      <section className="bg-black py-16 px-6 text-center">
        <h3 className="text-3xl font-semibold mb-8">Perfect Plan For Your Fitness Goals</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: 'Basic Plan',
              price: '$29.99',
              features: ['Single personalized plan', 'Tailored to goals', 'Basic workouts', 'Meal suggestions', 'Email support'],
            },
            {
              title: 'Pro Plan',
              price: '$39.99',
              features: ['Training & meal plans', 'Weight tracking', 'Progress monitoring', 'Exclusive content', 'Chat support'],
              highlight: true,
            },
            {
              title: 'Elite Plan',
              price: '$69.99',
              features: ['One-on-one coaching', 'Weekly check-ins', 'Priority support', 'Expert guidance'],
            },
          ].map((plan, idx) => (
            <Card key={idx} className={`bg-black text-white border-neon-green ${plan.highlight ? 'bg-neon-green text-black' : ''}`}>
              <CardContent className="p-6">
                <h4 className="text-xl font-bold mb-2">{plan.title}</h4>
                <p className={`text-2xl  font-semibold mb-4 ${plan.highlight ? " text-black" : "text-neon-green"}`}>{plan.price}/month</p>
                <ul className="text-sm mb-4 space-y-1 text-left">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex gap-3 items-center mb-3"><Check className={plan.highlight ? 'bg-black text-neon-green rounded-full p-1' : 'bg-neon-green text-black rounded-full p-1'} /> {f}</li>
                  ))}
                </ul>
                <Button className={` w-full ${plan.highlight ? "bg-black text-neon-green hover:bg-black/90" : "bg-neon-green text-black hover:bg-neon-green/90"}`}>Join Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-center text-white py-8 border-t border-gray-700">
        <p className="text-xl font-bold mb-2">Join Our Community</p>
        <p className="text-sm">&copy;2025 Elevate Fit. All rights reserved.</p>
      </footer>
    </div>
  );
}
