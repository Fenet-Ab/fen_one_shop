"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

const images = [
    "/hero-1.png",
    "/hero-2.png",
    "/hero-3.png",
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden bg-[#FAFAFA] py-16 lg:py-24">
            {/* Background Ornaments */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-black/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Content */}
                    <div className="relative z-10">


                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1A1A1A] leading-[1.1]">
                            Elevate Your <span className="text-[#D4AF37]">Lifestyle</span>
                            <span className="block mt-2">with FenStore</span>
                        </h1>

                        <p className="mt-8 text-lg text-gray-600 leading-relaxed max-w-xl">
                            Specializing in premium electronics and trending fashion. From high-end
                            gadgets to custom apparel—experience quality without compromise.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href="/category/electronics"
                                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#D4AF37] text-white px-8 py-4 rounded-full font-bold hover:bg-[#B8860B] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl active:scale-95"
                            >
                                <span>Shop the Collection</span>
                                <ShoppingBag className="w-5 h-5" />
                            </Link>

                            <Link
                                href="/custom-order"
                                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-[#1A1A1A] border-2 border-gray-200 px-8 py-4 rounded-full font-bold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-sm active:scale-95"
                            >
                                <span>Custom Order</span>
                                <ArrowRight className="w-5 h-5 mt-0.5" />
                            </Link>
                        </div>

                        {/* Stats/Social Proof */}
                        <div className="mt-12 py-8 border-t border-gray-200 grid grid-cols-3 gap-4">
                            <div>
                                <span className="block text-2xl font-bold text-[#1A1A1A]">15k+</span>
                                <span className="text-sm text-gray-500">Active Users</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-bold text-[#1A1A1A]">99%</span>
                                <span className="text-sm text-gray-500">Fast Shipping</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-bold text-[#1A1A1A]">24/7</span>
                                <span className="text-sm text-gray-500">Live Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image/Visual */}
                    <div className="relative lg:h-[600px] flex items-center justify-center">
                        {/* Decorative circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border-[20px] border-[#D4AF37]/10 rounded-full animate-pulse-slow"></div>

                        <div className="relative w-full max-w-lg lg:max-w-none transform transition-all duration-700 hover:scale-105">
                            {/* Animated Images Container */}
                            <div className="relative z-10 w-full h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center animate-float">
                                {images.map((img, index) => (
                                    <img
                                        key={img}
                                        src={img}
                                        alt={`FenStore Collection ${index + 1}`}
                                        className={`absolute w-full h-full object-contain drop-shadow-2xl transition-all duration-1000 ease-in-out ${index === currentIndex
                                            ? "opacity-100 scale-100 rotate-0"
                                            : "opacity-0 scale-95 -rotate-3 pointer-events-none"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Image Indicators */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-1.5 transition-all duration-300 rounded-full ${index === currentIndex ? "w-8 bg-[#D4AF37]" : "w-2 bg-gray-300"
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>


                            {/* Floating Card UI - Absolute purely for aesthetic */}
                            <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 z-20 animate-bounce-slow hidden sm:block">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-[#D4AF37]/20 p-2 rounded-lg text-[#D4AF37]">
                                        <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Growth</p>
                                        <p className="text-lg font-bold text-[#1A1A1A]">+85%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                @keyframes pulse-slow {
                    0% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.1; transform: translate(-50%, -50%) scale(1.05); }
                    100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}

