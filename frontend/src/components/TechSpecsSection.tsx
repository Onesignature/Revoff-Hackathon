import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const TechSpecsSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Multi-Channel Rental Network</h3>
              <p className="text-gray-600 max-w-xl">
                Our fleet is listed on premium rental platforms including Dubizzle, ensuring
                maximum visibility and consistent bookings. We maintain an optimal occupancy
                rate to guarantee steady monthly yields for our investors.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Transparent Rental Process</h3>
              <h3 className="text-2xl font-bold text-gray-900">Real-time Performance Tracking</h3>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden bg-red-50 p-8">
            <img 
              src="lambo.png" 
              alt="Engine" 
              className="w-full h-[400px] object-cover rounded-2xl"
            />
          </div>
        </div>

        <div className="mt-20">
          <button className="px-6 py-2 border-2 border-gray-900 rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
            RENTAL PROGRAM
          </button>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
                Optimized for<br />
                maximum returns
              </h2>
              <p className="text-gray-600">
                Our professional fleet management ensures high occupancy rates through
                multiple rental channels. With strategic pricing and premium maintenance,
                we maximize returns while preserving vehicle value.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <ArrowUpRight className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">85% Occupancy</h3>
                <p className="text-gray-600">
                  Target monthly rental occupancy rate
                </p>
              </div>

              <div>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <ArrowUpRight className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Rental Network</h3>
                <p className="text-gray-600">
                  Listed on premium platforms like Dubizzle
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSpecsSection;