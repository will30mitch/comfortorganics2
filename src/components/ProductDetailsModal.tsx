"use client";
import React from "react";

interface ProductDetailsModalProps {
  product: any;
  open: boolean;
  onClose: () => void;
  onAddToCart: (product: any) => void;
}

export default function ProductDetailsModal({ product, open, onClose, onAddToCart }: ProductDetailsModalProps) {
  if (!open || !product) return null;

  const price = product.itemData.variations?.[0]?.itemVariationData.priceMoney?.amount;
  const currency = product.itemData.variations?.[0]?.itemVariationData.priceMoney?.currency;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl">&times;</button>
        <h2 className="text-2xl font-bold mb-2">{product.itemData.name}</h2>
        <p className="text-lg text-green-700 mb-2">
          {price ? `$${(price / 100).toFixed(2)} ${currency}` : "No price"}
        </p>
        <p className="mb-4 text-gray-700">{product.itemData.description || "No description available."}</p>
        <button
          className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
} 