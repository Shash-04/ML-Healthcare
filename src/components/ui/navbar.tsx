"use client"
import { useState } from "react"
import { Menu, X } from 'lucide-react';
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HeartPulse } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex justify-center items-center">
            <img src="Heart.svg" alt="" />
          
            <Link href="/" className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              HealthMonitor
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link href="/" className="text-gray-300 text-xl hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/dashboards" className="text-gray- text-xl hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link
                href="/login"
                className="bg-gradient-to-r text-xl from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              className="block px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;