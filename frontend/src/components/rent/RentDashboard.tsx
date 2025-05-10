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
                src="/mercedes/amg-gt.jpg"
                alt="Mercedes-AMG GT"
                className="w-32 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-medium">Mercedes-AMG GT</h3>
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
          {[
            { 
              id: 1,
              image: "/mercedes/sclass.jpg",
              name: "Mercedes-Benz S-Class",
              location: "Downtown Dubai",
              rating: 4.8,
              reviews: 98,
              price: 1500
            },
            { 
              id: 2,
              image: "/mercedes/g63.webp",
              name: "Mercedes-AMG G63",
              location: "Palm Jumeirah",
              rating: 5.0,
              reviews: 76,
              price: 2500
            },
            { 
              id: 3,
              image: "/mercedes/e63.jpg",
              name: "Mercedes-AMG E63",
              location: "Dubai International Financial Centre",
              rating: 4.9,
              reviews: 87,
              price: 1900
            }
          ].map((car) => (
            <div key={car.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium">{car.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{car.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-600">{car.rating} ({car.reviews} reviews)</span>
                </div>
                <div className="mt-4">
                  <span className="text-lg font-bold">AED {car.price}</span>
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