import React from 'react';
import { ArrowUpRight, Gauge, Zap, Wrench } from 'lucide-react';

const SpecsSection: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Heading */}
        <div className="flex items-start gap-2 mb-20">
          <span className="text-red-600">
            <ArrowUpRight className="w-8 h-8" />
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Transform luxury cars<br />
            into smart<br />
            investments
          </h2>
        </div>

        {/* Specs List */}
        <div className="border-l-4 border-gray-900 pl-8 mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Fractional Investment Model</h3>
            <p className="text-gray-600 max-w-xl">
              Start investing with as little as $500. Our fractional ownership model allows you
              to own a share of premium vehicles while our platform manages rentals and
              maintenance, delivering monthly yields to investors.
            </p>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-gray-900">Professional Fleet Management</h4>
              <h4 className="text-xl font-bold text-gray-900">Guaranteed Buyback Options</h4>
            </div>
          </div>
        </div>

        {/* Image and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden">
            <img 
              src="/mercedes/sclass.jpg"
              alt="Car Performance"
              className="w-full h-[500px] object-cover"
            />
          </div>

          <div className="space-y-8">
            <button className="px-6 py-2 border-2 border-gray-900 rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
              START INVESTING
            </button>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Secure investment<br />
              with proven returns
            </h2>

            <p className="text-gray-600">
              REVOFF provides a secure platform for luxury car investments. Our professional
              fleet management ensures optimal returns through our rental program, while
              maintaining the value of your investment.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <Gauge className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Monthly Returns</h3>
                <p className="text-gray-600">
                  Earn consistent monthly yields from rental income
                </p>
              </div>

              <div>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">15% Returns</h3>
                <p className="text-gray-600">
                  Target annual returns through rental yields
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;