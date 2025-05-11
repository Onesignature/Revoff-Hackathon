import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  imageSrc: string;
  buttonText: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, imageSrc, buttonText }) => {
  return (
    <div className="relative bg-white bg-opacity-95 rounded-3xl p-6 overflow-hidden group">
      <div className="absolute right-4 top-4 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300">
        <ArrowUpRight className="h-5 w-5 text-red-600" />
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-1/2 h-56 rounded-xl overflow-hidden">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col">          <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>
          
          <button 
            onClick={() => window.location.href = '/app/cart'} 
            className="mt-auto border-2 border-red-600 text-red-600 px-4 py-2 rounded-full self-start hover:bg-red-600 hover:text-white transition-colors duration-300 text-sm font-medium"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;