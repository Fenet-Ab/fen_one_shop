import Link from "next/link";
import { Plus as PlusIcon, Loader2 } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import StarRating from "@/app/components/StarRating/StarRating";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    brand?: string;
    averageRating?: number;
    ratingCount?: number;
}

export default function ProductCard({
    id,
    name,
    price,
    image,
    brand = "FenStore Premium",
    averageRating = 0,
    ratingCount = 0,
}: ProductCardProps) {
    const { addToCart } = useCart();
    const [adding, setAdding] = useState(false);

    const handleAddToCart = async () => {
        setAdding(true);
        await addToCart(id);
        setAdding(false);
    };

    return (
        <div className="group flex flex-col items-center text-center bg-transparent transition-all duration-500 h-full">
            {/* Image Container - Sharp Rectangle Sizing */}
            <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 bg-[#F9F9F9] border border-gray-100/50">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Hover Quick Actions Overlay - Rectangular Buttons */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 backdrop-blur-[1px]">
                    <button
                        onClick={handleAddToCart}
                        disabled={adding}
                        className="bg-[#1A1A1A] text-white p-4 transition-all duration-500 hover:bg-[#D4AF37] shadow-xl disabled:opacity-50"
                    >
                        {adding ? <Loader2 className="w-6 h-6 animate-spin" /> : <PlusIcon className="w-6 h-6" />}
                    </button>
                    <Link
                        href={`/products/${id}`}
                        className="bg-white text-[#1A1A1A] font-bold text-[10px] uppercase tracking-widest px-8 py-3 shadow-sm transition-all duration-500 hover:bg-[#1A1A1A] hover:text-white"
                    >
                        View Details
                    </Link>
                </div>
            </div>

            {/* Content Section - Minimalist & Rectangular */}
            <div className="space-y-1 w-full px-1 mt-auto">
                <div className="min-h-[2.5rem] flex flex-col justify-center">
                    <h3 className="text-[13px] font-medium text-gray-800 leading-tight">
                        {name}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em] mt-1">
                        {brand}
                    </p>
                </div>

                {/* Star Rating */}
                <div className="py-1.5 flex justify-center">
                    <StarRating
                        rating={averageRating}
                        totalRatings={ratingCount}
                        size="sm"
                        showCount={true}
                    />
                </div>

                <p className="text-[14px] font-bold text-[#1A1A1A] mt-2">
                    {price.toLocaleString()} <span className="text-[9px] font-medium text-gray-400">ETB</span>
                </p>
            </div>
        </div>


    );
}
