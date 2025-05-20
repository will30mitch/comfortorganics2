'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    image: '/promo1.png',
    title: 'Spring Sale: 20% Off Flowers',
    subtitle: 'Enjoy our premium flower selection at a discount this season!',
    button: 'Shop Now',
    link: '/products?category=Flowers',
  },
  {
    image: '/promo2.png',
    title: 'New Edibles In Stock',
    subtitle: 'Try our delicious new edibles, crafted for taste and wellness.',
    button: 'Shop Edibles',
    link: '/products?category=Edibles',
  },
  {
    image: '/promo3.png',
    title: 'Pre-Rolls: Buy 2 Get 1 Free',
    subtitle: 'Stock up on pre-rolls with our exclusive bundle offer!',
    button: 'Shop Pre-rolls',
    link: '/products?category=Pre-rolls',
  },
];

const PromoCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full flex flex-col items-center py-10 bg-gradient-to-r from-green-600 to-yellow-500">
      <div className="w-full max-w-3xl relative">
        {slides.map((slide, idx) => (
          <div
            key={slide.title}
            className={`absolute w-full transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
              <Image src={slide.image} alt={slide.title} width={180} height={180} />
              <h2 className="text-2xl font-bold mt-4 mb-2 text-green-700">{slide.title}</h2>
              <p className="text-gray-700 mb-4">{slide.subtitle}</p>
              <a href={slide.link} className="bg-gradient-to-r from-green-400 to-yellow-400 text-white font-bold py-2 px-6 rounded-full shadow hover:scale-105 transition-transform">{slide.button}</a>
            </div>
          </div>
        ))}
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4 absolute left-1/2 -translate-x-1/2 bottom-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === current ? 'bg-yellow-400' : 'bg-white'} border border-green-400`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoCarousel; 