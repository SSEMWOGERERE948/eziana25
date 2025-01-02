"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/logo2.png"
                alt="Eziana Palm Hotels Logo"
                className="h-12 w-12 rounded-full object-cover"
              />
              <span className="text-xl font-bold">Eziana Palm Hotels</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/rooms" className="hover:text-primary transition-colors">
              Rooms
            </Link>
            <Link href="/amenities" className="hover:text-primary transition-colors">
              Amenities
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <ThemeToggle />
            <Button asChild>
              <Link href="/book">Book Now</Link>
            </Button>
          </div>

          {/* Burger Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-primary focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link
              href="/"
              onClick={toggleMenu}
              className="block px-4 py-2 text-sm hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/rooms"
              onClick={toggleMenu}
              className="block px-4 py-2 text-sm hover:text-primary transition-colors"
            >
              Rooms
            </Link>
            <Link
              href="/amenities"
              onClick={toggleMenu}
              className="block px-4 py-2 text-sm hover:text-primary transition-colors"
            >
              Amenities
            </Link>
            <Link
              href="/contact"
              onClick={toggleMenu}
              className="block px-4 py-2 text-sm hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <ThemeToggle />
            <Button asChild>
              <Link href="/book" onClick={toggleMenu}>
                Book Now
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
