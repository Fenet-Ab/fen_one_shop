"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/app/context/AuthContext';

interface RegisterProps {
  initialIsLogin?: boolean;
}

const Register = ({ initialIsLogin = true }: RegisterProps) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const { login } = useAuth();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit (Signup or Login)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password, // Don't trim password
    };

    try {
      if (isLogin) {
        // ---- LOGIN ----
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: payload.email,
          password: payload.password,
        });

        const { token, role } = res.data;

        if (!token || !role) {
          toast.error("Invalid response from server");
          return;
        }

        // ✅ Save user info & token via context
        login(token, role, res.data.user?.id, res.data.user?.email);

        toast.success("Login successful!");

        // ✅ Redirect based on role
        setTimeout(() => {
          if (role === "admin") {
            router.push("/Admin");

          } else {
            router.push("/User");
          }
        }, 1500);
      } else {
        // ---- SIGNUP ----
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          name: payload.name,
          email: payload.email,
          password: payload.password,
        });

        toast.success("Signup successful! Redirecting to login...");

        // Clear form data and switch to login
        setFormData({ name: "", email: "", password: "" });

        // ⏳ Wait and switch to login view
        setTimeout(() => {
          setIsLogin(true);
        }, 2000);
      }
    } catch (error: any) {
      console.error("Auth Error:", error.response?.data);
      const errorData = error.response?.data;
      let message = "Something went wrong. Try again.";

      if (errorData) {
        if (typeof errorData.message === 'string') {
          message = errorData.message;
        } else if (Array.isArray(errorData.message)) {
          message = errorData.message.join(', ');
        }
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle between login/signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 transition-colors duration-500">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Main Container */}
      <div className="relative w-full max-w-[850px] h-[550px] bg-white rounded-[30px] shadow-2xl overflow-hidden">

        {/* Form Box (Sliding) */}
        <div
          className="absolute top-0 w-full md:w-1/2 h-full flex flex-col justify-center items-center p-10 transition-all duration-700 ease-in-out z-20 bg-white"
          style={{
            left: isLogin ? '0' : '50%',
            opacity: 1
          }}
        >
          <form onSubmit={handleSubmit} className="w-full max-w-[320px] flex flex-col items-center">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8 text-center">
              {isLogin ? 'Login' : 'Sign Up'}
            </h2>

            {/* Name Input (Signup only) */}
            {!isLogin && (
              <div className="relative w-full h-[50px] mb-6 group">
                <span className="absolute right-0 top-3 text-[#1A1A1A] text-lg">
                  <FaUser />
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full h-full bg-transparent border-0 border-b-2 border-gray-300 outline-none text-[#1A1A1A] text-base font-medium py-1 pr-8 peer transition-all focus:border-[#D4AF37]"
                  placeholder=" "
                />
                <label className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#D4AF37] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                  Name
                </label>
              </div>
            )}

            {/* Email Input */}
            <div className="relative w-full h-[50px] mb-6 group">
              <span className="absolute right-0 top-3 text-[#1A1A1A] text-lg">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-full bg-transparent border-0 border-b-2 border-gray-300 outline-none text-[#1A1A1A] text-base font-medium py-1 pr-8 peer transition-all focus:border-[#D4AF37]"
                placeholder=" "
              />
              <label className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#D4AF37] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                Email
              </label>
            </div>

            {/* Password Input */}
            <div className="relative w-full h-[50px] mb-6 group">
              <span className="absolute right-0 top-3 text-[#1A1A1A] text-lg cursor-pointer hover:text-[#D4AF37] transition-colors" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full h-full bg-transparent border-0 border-b-2 border-gray-300 outline-none text-[#1A1A1A] text-base font-medium py-1 pr-16 peer transition-all focus:border-[#D4AF37]"
                placeholder=" "
              />
              <label className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#D4AF37] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                Password
              </label>
            </div>

            {/* Remember & Forgot (Login only) */}
            {isLogin && (
              <div className="w-full flex justify-between items-center text-sm text-[#1A1A1A] mb-6 font-medium">
                <label className="flex items-center cursor-pointer hover:text-[#D4AF37] transition-colors">
                  <input type="checkbox" className="mr-2 accent-[#D4AF37]" /> Remember me
                </label>
                <Link href="#" className="hover:text-[#D4AF37] underline decoration-transparent hover:decoration-[#D4AF37] transition-all">
                  Forgot Password?
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[45px] bg-[#D4AF37] text-white text-base font-semibold rounded-full shadow-lg border-none cursor-pointer hover:bg-[#B8860B] hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? "Please wait..." : isLogin ? 'Login' : 'Sign Up'}
            </button>

            {/* Mobile Toggle Text */}
            <div className="md:hidden mt-6 text-center text-sm text-[#1A1A1A] font-medium">
              <p>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <span
                  onClick={toggleForm}
                  className="cursor-pointer text-[#D4AF37] font-bold hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </span>
              </p>
            </div>
          </form>
        </div>

        {/* Info Box (Sliding Overlay) - Hidden on Mobile */}
        <div
          className="hidden md:flex absolute top-0 w-1/2 h-full bg-gradient-to-br from-[#1A1A1A] to-[#2C2C2C] flex-col justify-center items-center text-center p-10 z-[100] transition-all duration-700 ease-in-out text-white"
          style={{
            left: isLogin ? '50%' : '0',
            // Simple clip path for angled look if desired, or just standard box
          }}
        >
          <div className="absolute inset-0 bg-[#D4AF37]/10 pointer-events-none" /> {/* Subtle gold tint overlay */}

          <h2 className="text-3xl font-bold mb-5 leading-tight animate-fade-in">
            {isLogin ? 'Welcome Back!' : 'New Here?'}
          </h2>
          <p className="text-base text-gray-300 mb-8 max-w-[280px]">
            {isLogin
              ? 'Login to continue shopping and managing your farm products.'
              : 'Sign up now to get started with our agricultural marketplace.'}
          </p>

          <ul className="space-y-4 text-left mb-8">
            <li className="flex items-center text-gray-200">
              <span className="text-[#D4AF37] mr-3 text-xl">✓</span>
              Premium Products
            </li>
            <li className="flex items-center text-gray-200">
              <span className="text-[#D4AF37] mr-3 text-xl">✓</span>
              Fast Delivery
            </li>
            <li className="flex items-center text-gray-200">
              <span className="text-[#D4AF37] mr-3 text-xl">✓</span>
              Expert Support
            </li>
          </ul>

          <button
            type="button"
            onClick={toggleForm}
            className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#1A1A1A] transition-all duration-300 transform hover:scale-105"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;