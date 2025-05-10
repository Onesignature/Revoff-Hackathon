import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, ArrowUpRight, Check } from 'lucide-react';

interface Car {
  id: number;
  name: string;
  model: string;
  price: number;
  location: string;
  image: string;
  status: 'Available' | 'Funded' | 'Exited';
  specs: {
    engine: string;
    mileage: string;
    transmission: string;
  };
  returns: {
    totalReturn: number;
    yearlyReturn: number;
    projectedYield: number;
  };
  fundingProgress: number;
  isBalanced?: boolean;
  isHighYield?: boolean;
  isNewListing?: boolean;
}

const cars: Car[] = [
  {
    id: 1,
    name: "Mercedes-AMG",
    model: "GT Coupe",
    price: 759000,
    location: "Dubai",
    image: "/mercedes/cle.jpg",
    status: "Available",
    specs: {
      engine: "4.0L V8 Twin-Turbo",
      mileage: "1,200 km",
      transmission: "AMG SPEEDSHIFT"
    },
    returns: {
      totalReturn: 48.88,
      yearlyReturn: 9.78,
      projectedYield: 5.12
    },
    fundingProgress: 62,
    isBalanced: true
  },
  {
    id: 2,
    name: "Mercedes-AMG",
    model: "G63",
    price: 1273000,
    location: "Dubai",
    image: "/mercedes/g63.webp",
    status: "Available",
    specs: {
      engine: "4.0L V8 BiTurbo",
      mileage: "500 km",
      transmission: "9G-TRONIC"
    },
    returns: {
      totalReturn: 52.15,
      yearlyReturn: 10.43,
      projectedYield: 5.80
    },
    fundingProgress: 35,
    isHighYield: true,
    isNewListing: true
  },
  {
    id: 3,
    name: "Mercedes-Maybach",
    model: "GLS 600",
    price: 2199000,
    location: "Dubai",
    image: "/mercedes/maybach.avif",
    status: "Available",
    specs: {
      engine: "4.0L V8 BiTurbo",
      mileage: "350 km",
      transmission: "9G-TRONIC"
    },
    returns: {
      totalReturn: 49.73,
      yearlyReturn: 9.95,
      projectedYield: 5.45
    },
    fundingProgress: 34,
    isBalanced: true
  },
  {
    id: 4,
    name: "Mercedes-AMG",
    model: "C63",
    price: 689000,
    location: "Dubai",
    image: "/mercedes/s600.jpg",
    status: "Available",
    specs: {
      engine: "4.0L V8 BiTurbo",
      mileage: "1,100 km",
      transmission: "AMG SPEEDSHIFT"
    },
    returns: {
      totalReturn: 45.50,
      yearlyReturn: 9.10,
      projectedYield: 4.95
    },
    fundingProgress: 78,
    isHighYield: true
  },
  {
    id: 5,
    name: "Mercedes-Benz",
    model: "S-Class",
    price: 898000,
    location: "Dubai",
    image: "/mercedes/romeo.jpg",
    status: "Funded",
    specs: {
      engine: "3.0L I6 Turbo",
      mileage: "800 km",
      transmission: "9G-TRONIC"
    },
    returns: {
      totalReturn: 47.20,
      yearlyReturn: 9.44,
      projectedYield: 5.25
    },
    fundingProgress: 100,
    isBalanced: true
  },
  {
    id: 6,
    name: "Mercedes-Benz",
    model: "EQS",
    price: 949000,
    location: "Dubai",
    image: "/mercedes/eqs.avif",
    status: "Exited",
    specs: {
      engine: "Electric Dual-Motor",
      mileage: "650 km",
      transmission: "Single-Speed"
    },
    returns: {
      totalReturn: 54.30,
      yearlyReturn: 10.86,
      projectedYield: 6.10
    },
    fundingProgress: 100,
    isHighYield: true
  }
];

type Status = 'Available' | 'Funded' | 'Exited';

const Marketplace: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = React.useState<Status>('Available');
  const navigate = useNavigate();

  const filteredCars = cars.filter(car => car.status === selectedStatus);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cars..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button className="p-2 bg-white rounded-lg border border-gray-200">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        {(['Available', 'Funded', 'Exited'] as Status[]).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-6 py-2 rounded-full flex items-center gap-2 transition-colors ${
              selectedStatus === status
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {selectedStatus === status && <Check className="w-4 h-4" />}
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <div 
            key={car.id} 
            className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/app/marketplace/${car.id}`)}
          >
            <div className="relative">
              <img 
                src={car.image} 
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {car.isBalanced && (
                  <div className="px-3 py-1 bg-white rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Balanced
                  </div>
                )}
                {car.isHighYield && (
                  <div className="px-3 py-1 bg-white rounded-full text-sm font-medium flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4 text-red-500" />
                    High Yield
                  </div>
                )}
              </div>
              {car.isNewListing && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-gray-900 text-white rounded-full text-sm font-medium">
                  New Listing
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">{car.specs.engine}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-sm">{car.specs.mileage}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-sm">{car.specs.transmission}</span>
              </div>

              <h3 className="text-lg font-semibold mb-1">{car.name}</h3>
              <p className="text-gray-600 mb-2">{car.model}</p>
              <p className="text-gray-600 mb-4">{car.location}</p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl font-bold">AED {car.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500">{car.fundingProgress}% funded</span>
              </div>

              <div className="h-1 bg-gray-100 rounded-full mb-6">
                <div 
                  className="h-full bg-red-600 rounded-full"
                  style={{ width: `${car.fundingProgress}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{car.returns.totalReturn}%</p>
                  <p className="text-sm text-gray-500">3 year appreciation</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{car.returns.yearlyReturn}%</p>
                  <p className="text-sm text-gray-500">Annual rental yield</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{car.returns.projectedYield}%</p>
                  <p className="text-sm text-gray-500">Monthly income</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;