'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  category?: string;
};

type Props = {
  category: string;
};

const CategoryHero: React.FC<Props> = ({ category }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/products/page.tsx')
      .then((res) => res.json())
      .then((data) => {
        // Filter by category and get the newest (assuming sorted by createdAt desc or pick first)
        const filtered = data.products?.filter((p: Product) => p.category === category);
        if (filtered && filtered.length > 0) {
          setProduct(filtered[0]);
        } else {
          setProduct(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load product');
        setLoading(false);
      });
  }, [category]);

  if (loading) return <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center min-h-[300px] justify-center">Loading...</div>;
  if (error) return <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center min-h-[300px] justify-center text-red-500">{error}</div>;
  if (!product) return <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center min-h-[300px] justify-center">No products found.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
      {product.imageUrl && (
        <Image src={product.imageUrl} alt={product.name} width={120} height={120} className="rounded" />
      )}
      <h3 className="text-lg font-semibold mt-4">Newest {category.slice(0, 1).toUpperCase() + category.slice(1)}</h3>
      <p className="text-gray-800 font-bold text-xl mt-2">{product.name}</p>
      {product.price && <p className="text-green-600 font-bold mb-2">${product.price.toFixed(2)}</p>}
      {product.description && <p className="text-gray-600 mb-2 text-center">{product.description}</p>}
      <Link href={`/products/${product.id}`} className="bg-gradient-to-r from-green-400 to-yellow-400 text-white font-bold py-2 px-6 rounded-full shadow hover:scale-105 transition-transform mt-2">View Details</Link>
    </div>
  );
};

export default CategoryHero; 