"use client";

import React, { useState, useEffect } from "react";
import {
    User as UserIcon,
    ShoppingBag,
    Heart,
    Settings,
    LogOut,
    Package,
    CreditCard,
    MapPin,
    Bell,
    ChevronRight,
    Star,
    Zap,
    ShieldCheck,
    Wallet,
    Menu,
    X,
    Search,
    Trash2,
    Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "react-toastify";

// Modern Modal Component
const Modal = ({ isOpen, onClose, onConfirm, title, message, isLoading }: any) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
            <div className="bg-white rounded-[2.5rem] w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-10 text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-red-500">
                        <Trash2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black italic tracking-tight text-[#1A1A1A] mb-4">{title}</h3>
                    <p className="text-gray-500 font-medium mb-10 leading-relaxed">{message}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={onClose}
                            className="bg-gray-100 text-gray-400 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
                        >
                            Retreat
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="bg-red-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Expunge"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, orderId: "" });
    const [deleting, setDeleting] = useState(false);
    const { logout, isLoggedIn } = useAuth();
    const router = useRouter();

    const handleDeleteOrder = async () => {
        if (!deleteModal.orderId) return;
        setDeleting(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5000/api/order/${deleteModal.orderId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                toast.success("Order removed successfully");
                setOrders(orders.filter(o => o.id !== deleteModal.orderId));
                setDeleteModal({ isOpen: false, orderId: "" });
            } else {
                toast.error("Failed to remove order");
            }
        } catch (error) {
            toast.error("Network error");
        } finally {
            setDeleting(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!isLoggedIn) {
                // If not logged in, we check local storage just in case AuthContext hasn't updated yet
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/login");
                    return;
                }
            }

            try {
                const token = localStorage.getItem("token");
                const headers = { Authorization: `Bearer ${token}` };

                // Fetch Profile
                const profileRes = await fetch("http://localhost:5000/api/profile", { headers });
                if (profileRes.ok) {
                    const profile = await profileRes.json();
                    setUserData(profile);
                }

                // Fetch Orders
                const ordersRes = await fetch("http://localhost:5000/api/order/all", { headers });
                if (ordersRes.ok) {
                    const ordersList = await ordersRes.json();
                    setOrders(ordersList);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isLoggedIn, router]);

    const stats = {
        activeOrders: orders.filter(o => o.paymentStatus !== "PAID" || o.deliveryStatus === "NOT_DELIVERED").length,
        totalAcquisitions: orders.length,
        totalSpent: orders.reduce((acc, o) => acc + o.totalPrice, 0),
        loyaltyPoints: Math.floor(orders.reduce((acc, o) => acc + o.totalPrice, 0) / 10),
    };

    const getAvatar = (name: string) => {
        if (!name) return "U";
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    const menuItems = [
        { id: "overview", label: "Dashboard", icon: <UserIcon className="w-5 h-5" /> },
        { id: "orders", label: "My Orders", icon: <Package className="w-5 h-5" /> },
        { id: "wishlist", label: "Wishlist", icon: <Heart className="w-5 h-5" /> },
        { id: "addresses", label: "Shipping", icon: <MapPin className="w-5 h-5" /> },
        { id: "payments", label: "Payments", icon: <CreditCard className="w-5 h-5" /> },
        { id: "settings", label: "Account", icon: <Settings className="w-5 h-5" /> },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFCFB] flex justify-center items-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
                    <div className="mt-4 text-[#D4AF37] font-black italic animate-pulse">Loading Dossier...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
            </div>

            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? "w-80" : "w-24"} bg-[#0F0F0F] text-white transition-all duration-500 flex flex-col z-30 relative shadow-[10px_0_60px_rgba(0,0,0,0.1)]`}
            >
                {/* Sidebar Header */}
                <div className="p-8 flex items-center justify-between">
                    <div className={`flex items-center space-x-4 ${!isSidebarOpen && "hidden"}`}>
                        <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                            <span className="text-black font-black text-xl italic">F</span>
                        </div>
                        <span className="text-2xl font-black tracking-tight italic">Fen<span className="text-[#D4AF37]">Store</span></span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5 text-gray-400" /> : <Menu className="w-5 h-5 text-[#D4AF37]" />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto custom-scrollbar">
                    <div className={`px-4 mb-4 ${!isSidebarOpen && "hidden"}`}>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Personal Hub</p>
                    </div>
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === "orders") {
                                    router.push("/orders");
                                } else if (item.id === "settings") {
                                    router.push("/Profile");
                                } else {
                                    setActiveTab(item.id);
                                }
                            }}
                            className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative ${activeTab === item.id
                                ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <div className={`${activeTab === item.id ? "text-black" : "group-hover:text-[#D4AF37] transition-colors"}`}>
                                {item.icon}
                            </div>
                            {isSidebarOpen && (
                                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                            )}
                            {activeTab === item.id && isSidebarOpen && (
                                <div className="ml-auto w-1.5 h-1.5 bg-black rounded-full"></div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Sidebar Footer / Profile Info */}
                <div className="p-6 border-t border-white/5 bg-black/40 backdrop-blur-md">
                    <div className={`flex items-center space-x-4 ${!isSidebarOpen && "justify-center"}`}>
                        <div className="relative group/avatar">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#FFD700] p-0.5 shadow-lg group-hover/avatar:scale-110 transition-transform duration-300">
                                <div className="w-full h-full rounded-[0.9rem] bg-[#0F0F0F] flex items-center justify-center">
                                    <span className="text-sm font-black text-[#D4AF37]">{getAvatar(userData?.name)}</span>
                                </div>
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0F0F0F]"></div>
                        </div>
                        {isSidebarOpen && (
                            <div className="flex-1 flex flex-col min-w-0">
                                <span className="text-sm font-bold truncate text-white uppercase italic">{userData?.name || "Member"}</span>
                                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">{stats.totalSpent > 10000 ? "Platinum" : stats.totalSpent > 5000 ? "Gold" : "Silver"} Tier</span>
                            </div>
                        )}
                    </div>
                    {isSidebarOpen && (
                        <button
                            onClick={logout}
                            className="w-full mt-6 flex items-center justify-center space-x-2 py-3 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 text-xs font-black uppercase tracking-widest"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Exit Dashboard</span>
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 md:px-8 flex items-center justify-between z-20">
                    <div className="flex items-center gap-4 md:gap-8 flex-1">
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="md:hidden p-2 rounded-xl bg-gray-50 text-gray-600"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div className="relative group hidden lg:block max-w-md w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search orders, products..."
                                className="w-full bg-gray-50 border border-transparent rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:bg-white focus:border-[#D4AF37]/30 focus:ring-4 focus:ring-[#D4AF37]/5 transition-all text-gray-700"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6 shrink-0">
                        {/* Wallet & Points Pill */}
                        <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                            <div className="px-3 md:px-4 py-2 flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-[#D4AF37]" />
                                <span className="text-xs md:text-sm font-black italic hidden sm:inline">{stats.totalSpent.toLocaleString()} ETB</span>
                            </div>
                            <div className="h-4 w-px bg-gray-200"></div>
                            <div className="px-3 md:px-4 py-2 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                                <span className="text-xs md:text-sm font-black italic hidden sm:inline">{stats.loyaltyPoints}</span>
                            </div>
                        </div>

                        <button className="p-3.5 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all relative border border-gray-100 group shrink-0">
                            <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
                            <span className="absolute top-3.5 right-3.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-[#D4AF37] rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Dashboard Scroll View */}
                <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar-main">
                    {activeTab === "overview" && (
                        <>
                            {/* Page Intro */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#D4AF37]/20">
                                            Status: High Priority
                                        </div>
                                    </div>
                                    <h1 className="text-5xl font-black tracking-tighter text-[#1A1A1A] italic">
                                        The <span className="text-[#D4AF37]">Dossier</span>
                                    </h1>
                                    <p className="text-gray-400 font-medium text-lg mt-2">Welcome back, {userData?.name?.split(" ")[0] || "Member"}. Overviewing your luxury records.</p>
                                </div>

                            </div>

                            {/* Impact Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <StatCardMini
                                    title="Active Orders"
                                    value={stats.activeOrders.toString().padStart(2, '0')}
                                    icon={<Package className="w-5 h-5" />}
                                    color="gold"
                                />
                                <StatCardMini
                                    title="Loyalty Points"
                                    value={stats.loyaltyPoints >= 1000 ? `${(stats.loyaltyPoints / 1000).toFixed(1)}k` : stats.loyaltyPoints.toString()}
                                    icon={<Zap className="w-5 h-5" />}
                                    color="dark"
                                />
                                <StatCardMini
                                    title="Acquisitions"
                                    value={stats.totalAcquisitions.toString().padStart(2, '0')}
                                    icon={<ShoppingBag className="w-5 h-5" />}
                                    color="dark"
                                />
                                <StatCardMini
                                    title="Total Spent"
                                    value={stats.totalSpent >= 1000 ? `${(stats.totalSpent / 1000).toFixed(1)}k` : stats.totalSpent.toString()}
                                    icon={<Wallet className="w-5 h-5" />}
                                    color="gold"
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                {/* Acquisitions List */}
                                <div className="lg:col-span-2 bg-white/50 backdrop-blur-xl rounded-[3rem] border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.03)] overflow-hidden">
                                    <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                                        <h2 className="text-2xl font-black italic tracking-tight">Recent Acquisitions</h2>
                                        <button
                                            onClick={() => router.push("/orders")}
                                            className="text-[#D4AF37] text-sm font-black uppercase tracking-widest hover:underline flex items-center"
                                        >
                                            View Archive <ChevronRight className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>
                                    <div className="p-8 space-y-4">
                                        {orders.length > 0 ? (
                                            orders.slice(0, 3).map((order, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => router.push(`/orders/${order.id}`)}
                                                    className="group cursor-pointer bg-white p-6 rounded-3xl flex items-center justify-between border border-transparent hover:border-[#D4AF37]/20 hover:shadow-2xl hover:shadow-[#D4AF37]/5 transition-all duration-500"
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                                                            <ShoppingBag className="w-7 h-7" />
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-lg italic tracking-tight">Order #{order.id.slice(-6).toUpperCase()}</p>
                                                            <p className="text-xs font-bold text-gray-400 mt-0.5">
                                                                {new Date(order.createdAt).toLocaleDateString()} • {order.items?.length || 0} Items
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-4">
                                                        <div>
                                                            <p className="font-black text-xl italic">{order.totalPrice.toLocaleString()} ETB</p>
                                                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${order.paymentStatus === "PAID" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                                                                }`}>
                                                                {order.paymentStatus || "PENDING"}
                                                            </span>
                                                        </div>
                                                        {order.paymentStatus !== 'PAID' && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    setDeleteModal({ isOpen: true, orderId: order.id });
                                                                }}
                                                                className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all group/trash"
                                                                title="Remove Order"
                                                            >
                                                                <Trash2 className="w-4 h-4 transition-transform group-hover/trash:scale-110" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-10 text-gray-400 font-bold italic">No acquisitions found.</div>
                                        )}
                                    </div>
                                </div>

                                {/* Promo Sidebar Card */}
                                <div className="space-y-8">
                                    <div className="bg-[#0F0F0F] rounded-[3rem] p-8 relative overflow-hidden group shadow-2xl">
                                        <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-1000">
                                            <Star className="w-40 h-40 text-[#D4AF37] fill-[#D4AF37]" />
                                        </div>
                                        <div className="relative z-10">
                                            <h3 className="text-3xl font-black text-white italic leading-tight">Elite <span className="text-[#D4AF37]">Ascension.</span></h3>
                                            <p className="text-gray-400 text-sm font-medium mt-4 leading-relaxed">
                                                Track your journey to the next tier based on your acquisitions.
                                            </p>
                                            <div className="mt-8 space-y-4">
                                                <div className="flex justify-between items-end mb-1">
                                                    <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">Progress to Platinum</span>
                                                    <span className="text-xs font-bold text-white">{Math.min(100, Math.floor((stats.totalSpent / 10000) * 100))}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        style={{ width: `${Math.min(100, (stats.totalSpent / 10000) * 100)}%` }}
                                                        className="h-full bg-[#D4AF37] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-1000"
                                                    ></div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => router.push("/")}
                                                className="w-full mt-8 bg-white text-black py-4 rounded-2xl font-black text-sm hover:bg-[#D4AF37] transition-all transform hover:scale-105"
                                            >
                                                Acquire More
                                            </button>
                                        </div>
                                    </div>

                                    {/* Quick Security Tip */}
                                    <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/10 p-8 rounded-[3rem] group hover:bg-[#D4AF37]/10 transition-all">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                                            <span className="text-xs font-black uppercase tracking-widest">Secured Account</span>
                                        </div>
                                        <p className="text-sm text-gray-500 font-medium">Your account is active. Logged in as {userData?.email || "Guest"}.</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Placeholder for other tabs */}
                    {activeTab !== "overview" && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
                            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-gray-200/50 text-[#D4AF37] animate-bounce">
                                {menuItems.find(m => m.id === activeTab)?.icon}
                            </div>
                            <h2 className="text-3xl font-black italic tracking-tighter">Section Under Restoration</h2>
                            <p className="text-gray-400 text-lg font-medium mt-4 max-w-sm">Crafting a bespoke experience for your {activeTab} section.</p>
                            <button
                                onClick={() => setActiveTab("overview")}
                                className="mt-10 px-8 py-4 bg-[#0F0F0F] text-white rounded-2xl font-black tracking-tight hover:bg-[#D4AF37] hover:text-black transition-all"
                            >
                                Back to Dossier
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, orderId: "" })}
                onConfirm={handleDeleteOrder}
                title="Expunge Order?"
                message="Are you certain you wish to remove this acquisition from your records? This action cannot be reversed."
                isLoading={deleting}
            />

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,800&display=swap');
                body {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    overflow: hidden;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar-main::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar-main::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar-main::-webkit-scrollbar-thumb {
                    background: rgba(0,0,0,0.05);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}

function StatCardMini({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: "gold" | "dark" }) {
    return (
        <div className={`p-8 rounded-[2.5rem] border shadow-sm transition-all duration-500 hover:translate-y-[-5px] hover:shadow-2xl flex flex-col gap-4 relative overflow-hidden group ${color === "gold"
            ? "bg-white border-[#D4AF37]/20 hover:border-[#D4AF37]"
            : "bg-white border-gray-100 hover:border-black"
            }`}>
            <div className={`p-3 w-fit rounded-xl transition-colors duration-500 ${color === "gold" ? "bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black" : "bg-gray-50 text-black group-hover:bg-black group-hover:text-white"
                }`}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">{title}</p>
                <h3 className="text-3xl font-black tracking-tighter mt-1 italic">{value}</h3>
            </div>
            <div className="absolute -bottom-2 -right-2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: "w-24 h-24" })}
            </div>
        </div>
    );
}