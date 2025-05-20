'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="w-full bg-gradient-to-r from-green-500 via-green-400 to-yellow-400 px-8 py-3 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <div className=" rounded-xl p-2 flex items-center justify-center">
            <Image src="/logo.png" alt="Comfort Organics Logo" width={66} height={66} style={{ borderRadius: '4px' }} />
          </div>
        </Link>
      </div>
      {/* Centered Nav Links */}
      <div className="flex-1 flex justify-center">
        <div className="flex gap-12 items-center">
          <Link href="/" className="text-white text-lg font-medium hover:underline">Home</Link>
          <Link href="/products" className="text-white text-lg font-medium hover:underline">Products</Link>
          <Link href="/about" className="text-white text-lg font-medium hover:underline">About</Link>
          <Link href="/contact" className="text-white text-lg font-medium hover:underline">Contact</Link>
          <Link href="/wholesale" className="text-white text-lg font-medium hover:underline">Wholesale</Link>
        </div>
      </div>
      {/* Cart and Profile Icons */}
      <div className="flex items-center gap-6">
        <Link href="/cart" className="relative">
          <div className="bg-orange-300 rounded-full p-3 flex items-center justify-center">
            {/* Cart SVG icon */}
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {/* Cart count badge */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-orange-500 text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-orange-300">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
        <Link href="/profile">
          <div className="bg-orange-300 rounded-full p-3 flex items-center justify-center">
            {/* User SVG icon */}
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
            </svg>
          </div>
        </Link>
      </div>
    </nav>
  );
} 