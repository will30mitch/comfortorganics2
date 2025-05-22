'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-green-500 via-green-400 to-yellow-400 px-4 sm:px-8 py-3 flex items-center justify-between shadow-md relative">
      {/* Logo */}
      <div className="flex items-center gap-4 z-20">
        <Link href="/">
          <div className="rounded-xl p-2 flex items-center justify-center">
            <Image src="/logo.png" alt="Comfort Organics Logo" width={48} height={48} style={{ borderRadius: '4px' }} />
          </div>
        </Link>
      </div>
      {/* Hamburger Button (Mobile) */}
      <button
        className="sm:hidden flex flex-col justify-center items-center w-10 h-10 z-20"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-white mb-1 transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white mb-1 transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>
      {/* Centered Nav Links */}
      <div className="hidden sm:flex flex-1 justify-center">
        <div className="flex gap-6 sm:gap-12 items-center">
          <Link href="/" className="text-white text-lg font-medium hover:underline">Home</Link>
          <Link href="/products" className="text-white text-lg font-medium hover:underline">Products</Link>
          <Link href="/about" className="text-white text-lg font-medium hover:underline">About</Link>
          <Link href="/contact" className="text-white text-lg font-medium hover:underline">Contact</Link>
          <Link href="/wholesale" className="text-white text-lg font-medium hover:underline">Wholesale</Link>
        </div>
      </div>
      {/* Cart and Profile Icons */}
      <div className="flex items-center gap-4 z-20">
        <Link href="/cart" className="relative">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L21 13M7 13V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v7" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{cartCount}</span>
          )}
        </Link>
        <Link href="/profile">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1 1 21 12a9 9 0 0 1-15.879 5.804z" />
          </svg>
        </Link>
      </div>
      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-gradient-to-b from-green-500 via-green-400 to-yellow-400 shadow-lg flex flex-col items-center py-4 gap-4 z-10 animate-fade-in">
          <Link href="/" className="text-white text-lg font-medium hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/products" className="text-white text-lg font-medium hover:underline" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link href="/about" className="text-white text-lg font-medium hover:underline" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" className="text-white text-lg font-medium hover:underline" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="/wholesale" className="text-white text-lg font-medium hover:underline" onClick={() => setMenuOpen(false)}>Wholesale</Link>
        </div>
      )}
    </nav>
  );
} 