"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ProductDetailsModalProps {
  product: any;
  open: boolean;
  onClose: () => void;
  onAddToCart: (item: any) => void;
}

export default function ProductDetailsModal({ product, open, onClose, onAddToCart }: ProductDetailsModalProps) {
  if (!open || !product) return null;

  const variations = product.itemData?.variations || [];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedVariation = variations[selectedIdx]?.itemVariationData;
  const price = selectedVariation?.priceMoney?.amount
    ? Number(selectedVariation.priceMoney.amount) / 100
    : 0;
  const optionName = selectedVariation?.name || product.itemData?.name;

  // Hardcoded image mapping for specific products (same as ProductCard)
  const productImages: Record<string, string> = {
    "Fruity Bites": "/Fruity-bites.jpg",
    "Super Boof": "/Super-boof.jpg",
    "Tropicana Cookies": "/Tropicana-cookies.jpg",
    "Pink Runtz": "/Pink-runtz.jpg",
    "Cereal Milk": "/Cereal-milk.jpg",
    "Mixed Batch": "/Mixed.jpg",
    "Comfort Brownies": "/Comfort-brownies.jpg",
    "Chocolate chip cookies": "/Chocolate-chip.jpg",
    "Cinnamon Toast Crunch": "/Cinnamon-toast.jpg",
    "Pre-rolls": "/Chocolate-chip-cookies.jpg",
  };
  const imageUrl = productImages[product.itemData?.name] || product.itemData?.imageUrl || product.imageUrl || product.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative flex flex-col items-center max-h-screen overflow-y-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl">&times;</button>
        <div className="w-64 h-64 mb-4 relative flex items-center justify-center">
          <Image src={imageUrl} alt={product.itemData?.name || product.name || 'Product Image'} fill style={{ objectFit: "cover", borderRadius: 16 }} />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">{product.itemData.name}</h2>
        <p className="mb-4 text-gray-700 text-center">{product.itemData.description || "No description available."}</p>
        {/* Variations Dropdown */}
        {variations.length > 1 && (
          <select
            value={selectedIdx}
            onChange={e => setSelectedIdx(Number(e.target.value))}
            className="mb-4 p-2 border rounded text-black"
          >
            {variations.map((v: any, idx: number) => (
              <option key={v.id} value={idx}>
                {v.itemVariationData.name} — $
                {v.itemVariationData.priceMoney?.amount
                  ? (Number(v.itemVariationData.priceMoney.amount) / 100).toFixed(2)
                  : '0.00'}
              </option>
            ))}
          </select>
        )}
        {variations.length === 1 && (
          <p className="text-green-700 font-bold mb-4">${price.toFixed(2)}</p>
        )}
        <button
          className="bg-green-600 text-white font-bold py-2 px-6 rounded hover:bg-green-700 transition mb-4"
          onClick={() => onAddToCart({
            id: variations[selectedIdx]?.id || product.id,
            name: product.itemData?.name || 'Product',
            price,
            quantity: 1,
            description: product.itemData?.description,
            variationId: variations[selectedIdx]?.id,
            variationName: optionName,
          })}
        >
          Add to Cart
        </button>
        <button
          className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded hover:bg-gray-300 transition"
          onClick={onClose}
        >
          Back to Shop
        </button>
      </div>
    </div>
  );
} 