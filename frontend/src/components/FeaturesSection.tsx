import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-16">
          {/* Header */}
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Own your dream car<br />
              through <span className="text-red-600">smart investing</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Join our platform to invest in luxury vehicles, earn monthly rental yields,
              and participate in the growing car-sharing economy with flexible exit options.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors group">
              <ArrowRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl overflow-hidden">
              <img 
                src="/Smart.png" 
                alt="Performance" 
                className="w-full h-80 object-cover"
              />
              <h3 className="text-2xl font-bold mt-6 mb-2">Smart Investment</h3>
              <p className="text-gray-600">
                Invest in fractions of premium vehicles and earn consistent rental yields
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden">
              <img 
                src="/lambo.png" 
                alt="Design" 
                className="w-full h-80 object-cover"
              />
              <h3 className="text-2xl font-bold mt-6 mb-2">Flexible Ownership</h3>
              <p className="text-gray-600">
                Sell your stake back to the platform with our hassle-free exit options
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden">
              <img 
                src="/passive.png"
                alt="Technology" 
                className="w-full h-80 object-cover"
              />
              <h3 className="text-2xl font-bold mt-6 mb-2">Passive Income</h3>
              <p className="text-gray-600">
                Earn monthly returns through our managed rental program
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-end">
            <button className="bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition-colors text-lg font-medium">
              START INVESTING
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;