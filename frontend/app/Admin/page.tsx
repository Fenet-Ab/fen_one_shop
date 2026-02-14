"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  ChevronRight,
  Menu,
  X,
  Plus
} from "lucide-react";
import { useRouter } from "next/navigation";
import ProductModal from "@/components/ProductModal";
import ProductsList from "@/components/ProductsList";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

interface CategoryProgressProps {
  label: string;
  percentage: number;
  color: string;
}

export default function AdminDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const router = useRouter();

  const handleProductSuccess = () => {
    // You can refresh the products list here if needed
    console.log('Product operation successful');
  };

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      isPositive: true,
      icon: <TrendingUp className="w-5 h-5 text-[#D4AF37]" />,
    },
    {
      title: "Active Orders",
      value: "156",
      change: "+12.5%",
      isPositive: true,
      icon: <Package className="w-5 h-5 text-[#D4AF37]" />,
    },
    {
      title: "Total Customers",
      value: "2,345",
      change: "+18.2%",
      isPositive: true,
      icon: <Users className="w-5 h-5 text-[#D4AF37]" />,
    },
    {
      title: "Sales Growth",
      value: "14.2%",
      change: "-2.4%",
      isPositive: false,
      icon: <BarChart3 className="w-5 h-5 text-[#D4AF37]" />,
    },
  ];

  const recentOrders = [
    {
      id: "ORD-7421",
      customer: "Alex Johnson",
      product: "Gold Premium Watch",
      amount: "$299.00",
      status: "Processing",
      date: "2 mins ago",
    },
    {
      id: "ORD-7420",
      customer: "Sarah Williams",
      product: "Leather Handbag",
      amount: "$150.00",
      status: "Delivered",
      date: "1 hour ago",
    },
    {
      id: "ORD-7419",
      customer: "Michael Brown",
      product: "Silk Scarf",
      amount: "$75.00",
      status: "Shipped",
      date: "3 hours ago",
    },
    {
      id: "ORD-7418",
      customer: "Emily Davis",
      product: "Diamond Bracelet",
      amount: "$1,200.00",
      status: "Pending",
      date: "5 hours ago",
    },
  ];

  return (
    <div className="flex h-screen bg-[#0F0F0F] text-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-20"
          } bg-[#161616] border-r border-gray-800 transition-all duration-300 flex flex-col z-20`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${!isSidebarOpen && "hidden"}`}>
            <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">F</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">FenStore</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-400"
          >
            {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            active
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            icon={<ShoppingBag className="w-5 h-5" />}
            label="Products"
            isOpen={isSidebarOpen}
            onClick={() => router.push('/products')}
          />
          <SidebarItem
            icon={<Package className="w-5 h-5" />}
            label="Orders"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            icon={<Users className="w-5 h-5" />}
            label="Customers"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            icon={<BarChart3 className="w-5 h-5" />}
            label="Analytics"
            isOpen={isSidebarOpen}
          />
          <div className="pt-4 mt-4 border-t border-gray-800">
            <SidebarItem
              icon={<Settings className="w-5 h-5" />}
              label="Account"
              isOpen={isSidebarOpen}
              onClick={() => router.push('/Profile')}
            />
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className={`flex items-center space-x-3 ${!isSidebarOpen && "justify-center"}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FFD700] p-0.5">
              <div className="w-full h-full rounded-full bg-[#161616] flex items-center justify-center">
                <span className="text-sm font-bold text-[#D4AF37]">AD</span>
              </div>
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">Admin User</span>
                <span className="text-xs text-gray-500">Super Admin</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-[#161616] border-b border-gray-800 px-8 flex items-center justify-between">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" />
            <input
              type="text"
              placeholder="Search analytics, orders, products..."
              className="w-full bg-[#0F0F0F] border border-gray-800 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="p-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors relative group">
              <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#D4AF37] rounded-full border-2 border-[#161616]"></span>
            </button>
            <button
              onClick={() => setIsProductModalOpen(true)}
              className="flex items-center space-x-2 bg-[#D4AF37] text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#B8860B] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#D4AF37]/20"
            >
              <Plus className="w-4 h-4" />
              <span>New Product</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-[#0A0A0A]">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">Command Center</h1>
              <p className="text-gray-400 mt-2 text-lg">Your business at a glance.</p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-transparent text-gray-400 px-5 py-2.5 rounded-xl text-sm font-semibold hover:text-white hover:bg-gray-800 transition-all border border-gray-800">
                Reports
              </button>
              <button className="bg-[#D4AF37] text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#B8860B] transition-all shadow-xl shadow-[#D4AF37]/10">
                Live View
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#161616] p-7 rounded-3xl border border-gray-800/50 hover:border-[#D4AF37]/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  {React.isValidElement(stat.icon) && React.cloneElement(stat.icon as React.ReactElement<any>, { className: "w-16 h-16" })}
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-[#0F0F0F] rounded-2xl group-hover:bg-[#D4AF37]/10 transition-colors border border-gray-800">
                    {stat.icon}
                  </div>
                  <button className="text-gray-600 hover:text-gray-400 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <span className="text-gray-500 font-medium text-sm tracking-wide uppercase">{stat.title}</span>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-3xl font-bold text-white">{stat.value}</span>
                    <div
                      className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-lg ${stat.isPositive
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                    >
                      {stat.isPositive ? (
                        <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 mr-1" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-[#161616] rounded-3xl border border-gray-800/50 overflow-hidden flex flex-col shadow-2xl">
              <div className="p-7 border-b border-gray-800 flex items-center justify-between bg-[#161616]/50 backdrop-blur-sm">
                <div>
                  <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
                  <p className="text-sm text-gray-500 mt-1">Updates on your latest sales</p>
                </div>
                <button className="text-[#D4AF37] text-sm font-bold hover:text-[#B8860B] transition-colors flex items-center group">
                  View Repository <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-500 text-xs uppercase tracking-[0.1em] border-b border-gray-800/50">
                      <th className="px-8 py-5 font-bold">Transaction ID</th>
                      <th className="px-8 py-5 font-bold">Client</th>
                      <th className="px-8 py-5 font-bold">Product</th>
                      <th className="px-8 py-5 font-bold">Amount</th>
                      <th className="px-8 py-5 font-bold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/30">
                    {recentOrders.map((order, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                      >
                        <td className="px-8 py-5 text-sm font-mono text-gray-400">{order.id}</td>
                        <td className="px-8 py-5">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                              {order.customer.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm font-medium text-gray-200">{order.customer}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm text-gray-400">{order.product}</td>
                        <td className="px-8 py-5 text-sm font-bold text-[#D4AF37]">{order.amount}</td>
                        <td className="px-8 py-5 text-sm text-right">
                          <span
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider ${order.status === "Delivered"
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : order.status === "Processing"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : order.status === "Shipped"
                                  ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                  : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                              }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar Cards */}
            <div className="space-y-8">
              <div className="bg-[#161616] rounded-3xl border border-gray-800/50 p-7 shadow-2xl">
                <h2 className="text-xl font-extrabold text-white mb-8 tracking-tight">Market Share</h2>
                <div className="space-y-7">
                  <CategoryProgress label="Electronics" percentage={85} color="#D4AF37" />
                  <CategoryProgress label="Clothing" percentage={65} color="#D4AF37" />
                  <CategoryProgress label="Accessories" percentage={45} color="#D4AF37" />
                  <CategoryProgress label="Home Decor" percentage={30} color="#D4AF37" />
                </div>
              </div>

              <div className="bg-[#161616] rounded-3xl border border-gray-800/50 p-7 shadow-2xl overflow-hidden relative group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#D4AF37]/10 blur-3xl rounded-full group-hover:bg-[#D4AF37]/20 transition-all"></div>
                <h2 className="text-xl font-extrabold text-white mb-8 tracking-tight">Elite Products</h2>
                <div className="space-y-5">
                  {[
                    { name: "Gold Premium Watch", price: "$299.00", sales: 124, trend: 12 },
                    { name: "Silk Designer Scarf", price: "$75.40", sales: 89, trend: 8 },
                    { name: "Leather Handbag", price: "$150.00", sales: 76, trend: -5 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#0F0F0F] rounded-2xl border border-gray-800 hover:border-[#D4AF37]/40 transition-all group/item hover:translate-x-1">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center font-black text-[#D4AF37] border border-gray-700 shadow-inner">
                          {item.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-200">{item.name}</p>
                          <p className="text-xs text-gray-500 font-medium">{item.price}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-[#D4AF37]">{item.sales}</p>
                        <div className={`flex items-center text-[10px] font-bold ${item.trend > 0 ? "text-green-500" : "text-red-500"}`}>
                          {item.trend > 0 ? "+" : ""}{item.trend}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products List Section */}
          <div className="pb-12">
            <ProductsList />
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1a1a1a;
          border-radius: 20px;
          border: 2px solid #0a0a0a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2a2a2a;
        }
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>

      {/* Product Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSuccess={handleProductSuccess}
        mode="create"
      />
    </div>
  );
}

function SidebarItem({ icon, label, active = false, isOpen = true, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${active
        ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
        : "text-gray-500 hover:bg-gray-800/50 hover:text-gray-200"
        }`}
    >
      <div className={`${active ? "text-black" : "group-hover:text-[#D4AF37] transition-colors"}`}>
        {icon}
      </div>
      {isOpen && (
        <span className="text-sm font-bold tracking-tight">{label}</span>
      )}
      {active && isOpen && (
        <div className="absolute right-4 w-1.5 h-1.5 bg-black rounded-full"></div>
      )}
    </button>
  );
}

function CategoryProgress({ label, percentage, color }: CategoryProgressProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</span>
        <span className="text-sm font-black text-white">{percentage}%</span>
      </div>
      <div className="h-2.5 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
            boxShadow: `0 0 20px ${color}30`,
          }}
        ></div>
      </div>
    </div>
  );
}