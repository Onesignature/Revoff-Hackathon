import React from 'react';
import { Calendar, MapPin, Star, Shield, Clock, Car, ArrowRight } from 'lucide-react';

const RentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-gray-600 mb-2">Active Rentals</h3>
          <div className="text-3xl font-bold">2</div>
          <div className="mt-4 text-sm text-gray-500">Next return: 2 days</div>
        </div>

        <div className="bg-white rounded-xl p-6">
          <h3 className="text-gray-600 mb-2">Total Spent</h3>
          <div className="text-3xl font-bold">AED 15,500</div>
          <div className="mt-4 text-sm text-gray-500">This month</div>
        </div>

        <div className="bg-white rounded-xl p-6">
          <h3 className="text-gray-600 mb-2">Reward Points</h3>
          <div className="text-3xl font-bold">2,500</div>
          <div className="mt-4 text-sm text-gray-500">Valid until Dec 2024</div>
        </div>
      </div>

      {/* Current Rentals */}
      <div className="bg-white rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Current Rentals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex gap-4">
              <img
                src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg"
                alt="Porsche 911"
                className="w-32 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-medium">Porsche 911 GT3 RS</h3>
                <div className="text-sm text-gray-600 mt-1">Dubai Marina</div>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">2 days remaining</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Extend Rental
            </button>
          </div>
        </div>
      </div>

      {/* Available Cars */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Available Cars</h2>
          <button className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-2">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <img
                src={`https://images.pexels.com/photos/378${i}091/pexels-photo-378${i}091.jpeg`}
                alt="Car"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium">Lamborghini Urus</h3>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Downtown Dubai</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-600">4.9 (124 reviews)</span>
                </div>
                <div className="mt-4">
                  <span className="text-lg font-bold">AED 2,500</span>
                  <span className="text-gray-600"> / day</span>
                </div>
                <button className="w-full mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentDashboard;