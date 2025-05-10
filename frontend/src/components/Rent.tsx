import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Filter, Search, Star, Shield, Clock, Car } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

interface RentalCar {
  id: number;
  name: string;
  image: string;
  price: number;
  location: string;
  rating: number;
  reviews: number;
  features: string[];
  available: boolean;
}

const rentalCars: RentalCar[] = [
  {
    id: 1,
    name: "Porsche 911 GT3 RS",
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
    price: 1500,
    location: "Dubai Marina",
    rating: 4.9,
    reviews: 124,
    features: ["500+ HP", "PDK Transmission", "Track Ready"],
    available: true
  },
  {
    id: 2,
    name: "Lamborghini Urus",
    image: "https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg",
    price: 2000,
    location: "Downtown Dubai",
    rating: 4.8,
    reviews: 98,
    features: ["650 HP", "SUV", "All-Wheel Drive"],
    available: true
  },
  {
    id: 3,
    name: "Ferrari SF90",
    image: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg",
    price: 2500,
    location: "Palm Jumeirah",
    rating: 5.0,
    reviews: 76,
    features: ["Hybrid", "1000 HP", "All-Wheel Drive"],
    available: false
  }
];

const Rent: React.FC = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');

  const handleRentNow = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center">
        <img 
          src="/amg.png" 
          alt="Luxury Cars"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Rent Luxury Cars in Dubai
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12">
            Experience the thrill of driving the world's finest vehicles
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="bg-white rounded-xl p-6 -mt-24 relative z-20 shadow-xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Start Date"
              />
            </div>
            
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="End Date"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Location"
              />
            </div>
            
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Search Cars
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button className="px-6 py-3 bg-white rounded-full text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            All Cars
          </button>
          <button className="px-6 py-3 bg-white rounded-full text-gray-600 hover:bg-gray-50 transition-colors">
            Available Now
          </button>
          <button className="px-6 py-3 bg-white rounded-full text-gray-600 hover:bg-gray-50 transition-colors">
            Sports Cars
          </button>
          <button className="px-6 py-3 bg-white rounded-full text-gray-600 hover:bg-gray-50 transition-colors">
            SUVs
          </button>
          <button className="px-6 py-3 bg-white rounded-full text-gray-600 hover:bg-gray-50 transition-colors">
            Luxury Sedans
          </button>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentalCars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl overflow-hidden">
              <div className="relative">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                {!car.available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium">Currently Rented</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
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
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{car.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{car.reviews} reviews</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {car.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>Insurance included</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Car className="w-4 h-4" />
                    <span>Free delivery within Dubai</span>
                  </div>
                </div>
                
                <button 
                  className={`w-full mt-6 px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                    car.available 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!car.available}
                  onClick={car.available ? handleRentNow : undefined}
                >
                  {car.available ? 'Rent Now' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Rent;