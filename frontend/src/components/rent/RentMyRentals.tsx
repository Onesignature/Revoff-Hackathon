import React from 'react';
import { Calendar, MapPin, Star, Shield, Clock, Car } from 'lucide-react';

const RentMyRentals: React.FC = () => {
  const activeRentals = [
    {
      id: 1,
      car: "Mercedes-AMG GT",
      image: "/mercedes/amg-gt.jpg",
      location: "Dubai Marina",
      startDate: "2024-03-15",
      endDate: "2024-03-22",
      price: 1800,
      status: "active"
    },
    {
      id: 2,
      car: "Mercedes-Benz S-Class",
      image: "/mercedes/sclass.jpg",
      location: "Downtown Dubai",
      startDate: "2024-03-18",
      endDate: "2024-03-25",
      price: 1500,
      status: "upcoming"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Rentals</h1>

      <div className="grid grid-cols-1 gap-6">
        {activeRentals.map((rental) => (
          <div key={rental.id} className="bg-white rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={rental.image}
                alt={rental.car}
                className="w-full md:w-64 h-48 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{rental.car}</h3>
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {rental.location}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    rental.status === 'active' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {rental.status === 'active' ? 'Active' : 'Upcoming'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <div className="text-sm text-gray-600">Start Date</div>
                    <div className="font-medium">{rental.startDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">End Date</div>
                    <div className="font-medium">{rental.endDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Daily Rate</div>
                    <div className="font-medium">AED {rental.price}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total</div>
                    <div className="font-medium">AED {rental.price * 7}</div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Extend Rental
                  </button>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentMyRentals;