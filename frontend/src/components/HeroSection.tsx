import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import Navbar from './Navbar';
import ProductCard from './ProductCard';

const HeroSection: React.FC = () => {
  return (
    <div id="home" className="relative h-screen overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center hidden md:block"
        style={{
          backgroundImage: 'url(/hero.png)',
          filter: 'brightness(0.8)'
        }}
      />
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center md:hidden"
        style={{
          backgroundImage: 'url(/mobhero.png)',
          filter: 'brightness(0.8)'
        }}
      />
      
      <Navbar />
      
      <div className="relative z-1 max-w-7xl mx-auto px-4 h-full flex flex-col">
        {/* Mobile Download Buttons */}
        <div className="md:hidden mt-auto mb-6 flex justify-between px-4">
          <a href="#" className="hover:opacity-90 transition-opacity transform hover:scale-105 transition-transform">
            <img src="/play.webp" alt="Get it on Google Play" className="h-16" />
          </a>
          <a href="#" className="hover:opacity-90 transition-opacity transform hover:scale-105 transition-transform">
            <img src="/apple.webp" alt="Download on App Store" className="h-16" />
          </a>
        </div>

        <div className="mt-auto mb-6 md:mb-12 hidden md:grid grid-cols-2 gap-4 md:gap-6">
          <ProductCard 
            title="Invest in Luxury Cars"
            description="Own a fraction of premium vehicles and earn monthly rental yields"
            imageSrc="/login.png"
            buttonText="START INVESTING"
          />
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-red-600 rounded-3xl p-6 text-white w-full md:w-1/2 flex flex-col items-center text-center">
              <div className="mb-6">
                <div>
                  <div className="text-6xl font-bold">4.9<span className="text-4xl">*</span></div>
                  <div className="text-sm">1200+ Investors Trust Us</div>
                </div>
              </div>
              
              <div className="mt-auto flex flex-col items-center">
                <div className="hidden md:flex flex-col gap-4">
                  <a href="#" className="hover:opacity-90 transition-opacity transform hover:scale-105 transition-transform">
                    <img src="/apple.webp" alt="Download on App Store" className="h-16" />
                  </a>
                  <a href="#" className="hover:opacity-90 transition-opacity transform hover:scale-105 transition-transform">
                    <img src="/play.webp" alt="Get it on Google Play" className="h-16" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-6 w-full md:w-1/2 flex flex-col justify-between">              <div>
                <h3 className="text-2xl font-bold text-gray-900">Fractional Ownership</h3>
                <p className="text-gray-600 mt-2">Own shares in luxury vehicles and earn passive income through our managed rental program</p>
              </div>
              
              <button 
                onClick={() => window.location.href = '/app/cart'} 
                className="mt-4 group flex items-center bg-red-600 text-white px-4 py-2 rounded-full self-start hover:bg-red-700 transition-colors"
              >
                <span className="mr-2">Explore More</span>
                <div className="w-6 h-6 flex items-center justify-center rounded-full transform group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;