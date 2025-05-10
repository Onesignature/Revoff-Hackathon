import React from 'react';
import { ArrowRight, Star, Shield, Clock, Gauge } from 'lucide-react';

const FAQSection: React.FC = () => {
  return (
    <section id="about" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-8 md:mb-16">
          Why REVOFF?
        </h2>

        <div className="bg-white rounded-3xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <img 
                  src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Performance" 
                  className="w-full sm:w-32 h-48 sm:h-24 object-cover rounded-xl"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Fractional Investment Platform</h3>
                  <p className="text-gray-600">
                    Invest in luxury vehicles with lower capital requirements and earn
                    passive income through our managed rental program
                  </p>
                </div>
              </div>

              <div className="space-y-6 border-l-2 border-gray-200 pl-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Smart Investment Options</span>
                  <span className="text-red-600">01</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Monthly Rental Yields</span>
                  <span className="text-red-600">02</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Professional Fleet Management</span>
                  <span className="text-red-600">03</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Flexible Exit Options</span>
                  <span className="text-red-600">04</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="REVOFF Experience"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Start earning from luxury cars
                </h3>
                <button className="flex items-center gap-2 text-white group">
                  <span className="font-medium">VIEW MORE</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white p-6 rounded-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              Handcrafted with precision using the finest materials and rigorous quality control
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Dedicated customer service and technical support available around the clock
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Gauge className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Performance First</h3>
            <p className="text-gray-600">
              Track-focused engineering delivering maximum performance and driver engagement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;