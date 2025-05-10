import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  discount: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Mercedes-Maybach GLS 600",
    price: 225000,
    discountedPrice: 189000,
    discount: 15,
    image: "/mercedes/maybach.avif"
  },
  {
    id: 2,
    name: "Mercedes-Benz EQS",
    price: 245000,
    discountedPrice: 209000,
    discount: 25,
    image: "/mercedes/eqs.avif"
  },
  {
    id: 3,
    name: "Mercedes-AMG C63",
    price: 198000,
    discountedPrice: 168000,
    discount: 30,
    image: "/mercedes/c63.webp"
  },
  {
    id: 4,
    name: "Mercedes-AMG E63",
    price: 145000,
    discountedPrice: 123000,
    discount: 15,
    image: "/mercedes/e63.jpg"
  }
];

const ProductsSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const visibleProducts = [...products.slice(startIndex), ...products.slice(0, startIndex)].slice(0, 3);

  return (
    <section id="investment-options" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900">
            Explore Our Products
          </h2>
          
          <div className="flex gap-4 self-end">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors group"
            >
              <ArrowRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {visibleProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-3xl p-6 group relative overflow-hidden"
            >
              <div className="absolute top-6 right-6 bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                -{product.discount}%
              </div>
              
              <div className="mb-6 rounded-2xl overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
              
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-xl font-bold text-red-600">
                  AED {product.discountedPrice.toLocaleString()}
                </span>
                <span className="text-gray-500 line-through">
                  AED {product.price.toLocaleString()}
                </span>
              </div>

              <button className="w-full bg-gray-900 text-white py-3 rounded-full hover:bg-red-600 transition-colors">
                Configure Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;