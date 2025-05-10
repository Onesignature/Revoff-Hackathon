import React from 'react';
import { MapPin, Star, Heart, Calendar } from 'lucide-react';

const RentFavorites: React.FC = () => {
  const favorites = [
    {
      id: 1,
      car: "Porsche 911 GT3 RS",
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
      location: "Dubai Marina",
      price: 1500,
      rating: 4.9,
      reviews: 124,
      available: true
    },
    {
      id: 2,
      car: "Lamborghini Urus",
      image: "https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg",
      location: "Downtown Dubai",
      price: 2000,
      rating: 4.8,
      reviews: 98,
      available: false
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Favorites</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((car) => (
          <div key={car.id} className="bg-white rounded-xl overflow-hidden">
            <div className="relative">
              <img 
                src={car.image} 
                alt={car.car}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600 fill-current" />
              </button>
              {!car.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-medium">Currently Unavailable</span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{car.car}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{car.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">AED {car.price}</div>
                  <div className="text-sm text-gray-600">per day</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{car.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{car.reviews} reviews</span>
              </div>
              
              <button 
                className={`w-full px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                  car.available 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!car.available}
              >
                {car.available ? 'Rent Now' : 'Not Available'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentFavorites;