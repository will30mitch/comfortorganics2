"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductDetailsModal from "../components/ProductDetailsModal";
import { useCart } from "../context/CartContext";

const promoSlides = [
  { id: 1, image: "/Bud-Promo.png", title: "Premium Hemp Products" },
  { id: 2, image: "/Edible-Promo.png", title: "Organic Edibles" },
  { id: 3, image: "/Pre-roll-Promo.png", title: "Handcrafted Pre-rolls" },
];

const categories = [
  { key: "Flowers", label: "Newest Flower" },
  { key: "Edibles", label: "Newest Edible" },
  { key: "Pre-rolls", label: "Newest Pre-roll" },
  { key: "Budget", label: "New Budget Option" },
];

function DynamicProductCard({ category, label }: { category: string; label: string }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/products/page.tsx")
      .then((res) => res.json())
      .then((data) => {
        let filtered;
        if (category === "Budget") {
          filtered = data.products?.filter((p: any) => p.isBudget || p.category === "Budget");
          if (!filtered?.length) {
            filtered = [...(data.products || [])].sort((a, b) => a.price - b.price);
          }
        } else {
          filtered = data.products?.filter((p: any) => p.category === category);
        }
        if (filtered && filtered.length > 0) {
          setProduct(filtered[0]);
        } else {
          setProduct(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, [category]);

  if (loading) return <div className="bg-white rounded-2xl shadow p-8 text-center">Loading...</div>;
  if (error) return <div className="bg-white rounded-2xl shadow p-8 text-center">{error}</div>;
  if (!product) return <div className="bg-white rounded-2xl shadow p-8 text-center">No products found.</div>;

  return (
    <motion.section 
      className="w-full max-w-3xl mx-auto mb-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="bg-white rounded-2xl shadow p-8 flex flex-col md:flex-row items-center gap-8 border-t-4 border-green-400">
        <div className="relative w-48 h-48 flex-shrink-0 rounded-xl overflow-hidden bg-green-100">
          <Image 
            src={product.imageUrl || product.image || "/placeholder.png"} 
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold text-green-700 mb-2 text-center md:text-left">{label}</h2>
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-green-700 font-bold text-lg mb-2">${product.price?.toFixed(2) || "-"}</p>
          {product.description && <p className="text-gray-600 mb-4 text-center md:text-left">{product.description}</p>}
          <Link href={`/products/${product.id}`} className="bg-green-500 text-white font-bold py-2 px-6 rounded hover:bg-green-600 transition">View Details</Link>
        </div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch all products for newest section
  useEffect(() => {
    fetch("/api/square/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          // If products have a createdAt or similar field, sort by it. Otherwise, reverse for newest last.
          const sorted = [...data.products].reverse();
          setProducts(sorted);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(() => setProducts([]));
  }, []);

  // Handler for Add to Cart (expects cart item)
  const handleAddToCart = (item: any) => {
    addToCart(item);
    setSelectedProduct(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-200 to-yellow-100 py-12 px-4 flex flex-col items-center">
      {/* Hero Section with Slideshow */}
      <section className="w-full max-w-6xl bg-gradient-to-r from-green-500 to-yellow-400 rounded-2xl shadow-lg mb-12 p-8 flex flex-col items-center relative overflow-hidden">
        <div className="w-full h-80 relative mb-6 flex items-center justify-center">
          {promoSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0,
                zIndex: index === currentSlide ? 1 : 0
              }}
              transition={{ duration: 1 }}
              style={{ pointerEvents: index === currentSlide ? 'auto' : 'none' }}
            >
              <Image 
                src={slide.image} 
                alt={slide.title}
                width={1200}
                height={320}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                priority={index === 0}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">{slide.title}</h1>
                <Link href="/products" className="bg-white text-green-600 font-bold py-2 px-8 rounded shadow hover:bg-green-100 transition">Shop Now</Link>
              </div>
            </motion.div>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {promoSlides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full border-2 border-white ${index === currentSlide ? 'bg-white' : 'bg-transparent'}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newest Products Section - Only 2, wider cards */}
      <section className="w-full max-w-6xl mb-12 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Newest Products</h2>
        {loading ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center">Loading...</div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 w-full items-center justify-center">
            {products.slice(0, 2).map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border-t-4 border-green-400 transition-transform w-full max-w-xs sm:max-w-xl">
                <ProductCard 
                  product={product} 
                  onViewDetails={setSelectedProduct} 
                  onAddToCart={handleAddToCart} 
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <ProductDetailsModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </main>
  );
}
