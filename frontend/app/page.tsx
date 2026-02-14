"use client";

import CategorySection from "./components/Category/CategorySection";
import Hero from "./components/Hero/Hero";
import { ChevronDown } from "lucide-react";
const dummyProducts = [
  {
    id: "1",
    name: "Designer Laptop",
    price: 85000,
    image: "/hero-1.png",
    brand: "FenStore Pro"
  },
  {
    id: "2",
    name: "Premium Headphones",
    price: 3500,
    image: "/hero-1.png",
    brand: "FenStore Audio"
  },
  {
    id: "3",
    name: "Luxury Handbag",
    price: 12000,
    image: "/hero-2.png",
    brand: "FenStore Fashion"
  },
  {
    id: "4",
    name: "Designer Watch",
    price: 4500,
    image: "/hero-2.png",
    brand: "FenStore Luxe"
  },
  {
    id: "5",
    name: "Smart Home Hub",
    price: 5000,
    image: "/hero-3.png",
    brand: "FenStore Life"
  },
  {
    id: "6",
    name: "Premium Stationery",
    price: 600,
    image: "/hero-3.png",
    brand: "FenStore Life"
  },
];

export default function Home() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col pb-32">
      <Hero />

      {/* Scroll Indicator Button */}
      <div className="flex justify-center -mt-16 pb-16 relative z-30">
        <button
          onClick={scrollToContent}
          className="group flex flex-col items-center gap-3 text-gray-400 hover:text-[#D4AF37] transition-all duration-300"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70 group-hover:opacity-100">Explore</span>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 scale-125 animate-ping"></div>
            <div className="relative p-2.5 bg-white rounded-full shadow-lg border border-gray-100 group-hover:border-[#D4AF37] group-hover:shadow-[#D4AF37]/10 transition-all">
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>
        </button>
      </div>

      {/* Featured Sections */}
      <CategorySection title="Clothing" products={dummyProducts} />
      <CategorySection title="Electronics" products={dummyProducts} />
      <CategorySection title="Shoes" products={dummyProducts} />
      <CategorySection title="Accessories" products={dummyProducts} />





    </main>
  );
}



