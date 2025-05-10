import React from 'react';
import { Calendar, MapPin, Star, Download } from 'lucide-react';

const RentHistory: React.FC = () => {
  const rentalHistory = [
    {
      id: 1,
      car: "Mercedes-AMG GT",
      image: "/mercedes/amg-gt.jpg",
      location: "Dubai Marina",
      startDate: "2024-02-15",
      endDate: "2024-02-22",
      price: 12600,
      rating: 5,
      review: "Amazing experience! The AMG GT was in perfect condition and delivered exhilarating performance."
    },
    {
      id: 2,
      car: "Mercedes-AMG G63",
      image: "/mercedes/g63.webp",
      location: "Downtown Dubai",
      startDate: "2024-01-10",
      endDate: "2024-01-17",
      price: 17500,
      rating: 4,
      review: "The G63 is an absolute beast! Perfect for Dubai's roads with a luxurious and commanding presence."
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Rental History</h1>

      <div className="grid grid-cols-1 gap-6">
        {rentalHistory.map((rental) => (
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
                  <div className="flex items-center gap-1">
                    {[...Array(rental.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
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
                    <div className="text-sm text-gray-600">Total Paid</div>
                    <div className="font-medium">AED {rental.price}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-medium">7 days</div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm text-gray-600">Your Review</div>
                  <p className="mt-2">{rental.review}</p>
                </div>

                <div className="flex gap-4 mt-6">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Rent Again
                  </button>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Invoice
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

export default RentHistory;