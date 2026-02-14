"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { PlusIcon, ArrowLeft, Star, ShieldCheck, Truck, RefreshCw } from "lucide-react";

const allProducts = [
    { id: "1", name: "iPhone 14 Pro", price: 85000, image: "/hero-1.png", brand: "Apple", description: "The ultimate iPhone experience with the powerful A16 Bionic chip and a stunning 48MP camera." },
    { id: "2", name: "Wireless Headset", price: 3500, image: "/hero-1.png", brand: "Sony", description: "Premium noise-canceling headphones for an immersive audio experience." },
    { id: "3", name: "Men T-Shirt", price: 1200, image: "/hero-2.png", brand: "FenStore Fashion", description: "High-quality cotton t-shirt for daily comfort and style." },
    { id: "4", name: "Running Shoes", price: 4000, image: "/hero-2.png", brand: "Nike", description: "Lightweight and breathable running shoes for peak performance." },
    { id: "5", name: "Smart Watch", price: 5000, image: "/hero-1.png", brand: "Samsung", description: "Track your health and stay connected with this sleek smartwatch." },
    { id: "6", name: "AirPods Pro", price: 6000, image: "/hero-1.png", brand: "Apple", description: "Active Noise Cancellation for immersive sound." },
];

export default function ProductDetail() {
    const params = useParams();
    const product = allProducts.find(p => p.id === params.id) || allProducts[0];

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-[#D4AF37] transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                    Back to Collection
                </Link>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Image Section */}
                    <div className="relative aspect-[3/4] bg-[#FBFBFB] rounded-[3rem] overflow-hidden group">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-8 lg:p-16 transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute top-8 left-8">
                            <span className="bg-[#1A1A1A] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                                Premium Quality
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col h-full py-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-[#D4AF37] text-sm font-black uppercase tracking-[0.3em]">
                                    {product.brand}
                                </p>
                                <h1 className="text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-tight italic tracking-tighter">
                                    {product.name}
                                </h1>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex text-[#D4AF37]">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">(48 Reviews)</span>
                            </div>

                            <p className="text-3xl font-black text-[#1A1A1A] mt-6">
                                {product.price.toLocaleString()} <span className="text-sm font-bold text-[#D4AF37]">ETB</span>
                            </p>

                            <p className="text-gray-500 leading-relaxed text-lg pt-4">
                                {product.description}
                            </p>
                        </div>

                        {/* Order Options */}
                        <div className="mt-12 space-y-8">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 bg-[#1A1A1A] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#D4AF37] transition-all transform active:scale-95 shadow-xl flex items-center justify-center gap-3">
                                    <PlusIcon className="w-5 h-5" />
                                    Add to Cart
                                </button>
                                <button className="px-8 py-5 border-2 border-gray-100 rounded-2xl font-black uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                                    Custom Order
                                </button>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:text-[#D4AF37]">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">Fast Delivery</p>
                                        <p className="text-xs text-gray-400">Within 24 hours</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">Secure Payment</p>
                                        <p className="text-xs text-gray-400">100% Protection</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
