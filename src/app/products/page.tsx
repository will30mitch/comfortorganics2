'use client';

import { useEffect, useState } from 'react';
import ProductDetailsModal from '../../components/ProductDetailsModal';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';

interface Product {
  id: string;
  itemData: {
    name: string;
    description?: string;
    variations?: { itemVariationData: { priceMoney?: { amount: number; currency: string } } }[];
    imageUrl?: string;
    imageIds?: string[];
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/square/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (item: any) => {
    addToCart(item);
    setSelectedProduct(null);
  };

  if (loading) return <div className="min-h-screen bg-gradient-to-b from-green-200 to-yellow-100 flex items-center justify-center"><div className="bg-white rounded-2xl shadow p-8 text-center">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-yellow-100 py-12 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-6xl bg-gradient-to-r from-green-500 to-yellow-400 rounded-2xl shadow-lg mb-12 p-8 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-white mb-2 text-center drop-shadow-lg">Products</h1>
        <p className="text-xl text-white text-center font-light">Browse our selection of premium hemp products</p>
      </div>
      {/* Product Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {Array.isArray(products) && products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center border-t-4 border-green-400">
            <ProductCard
              product={product}
              onViewDetails={setSelectedProduct}
              onAddToCart={handleAddToCart}
            />
          </div>
        ))}
      </div>
      <ProductDetailsModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
} 