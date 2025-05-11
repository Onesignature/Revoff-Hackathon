import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, ArrowUpRight, Check, X, CreditCard } from 'lucide-react';
import { useCart } from '../../context/CartContext';

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

interface InvestmentModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onInvest: (amount: number) => void;
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({ car, isOpen, onClose, onInvest }) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(5000);
  
  if (!isOpen || !car) return null;
  
  const minInvestment = 500;
  const maxInvestment = 100000;
  
  const handleInvest = () => {
    onInvest(investmentAmount);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Invest in {car.name}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Model:</span>
            <span className="font-medium">{car.model}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Price:</span>
            <span className="font-medium">AED {car.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Expected Return (3yr):</span>
            <span className="font-medium text-green-600">{car.returns.totalReturn}%</span>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Investment Amount (AED)</label>
          <input
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
            min={minInvestment}
            max={maxInvestment}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <div className="flex justify-between text-sm mt-1">
            <span>Min: AED {minInvestment.toLocaleString()}</span>
            <span>Max: AED {maxInvestment.toLocaleString()}</span>
          </div>
        </div>
        
        <button
          onClick={handleInvest}
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <CreditCard className="w-5 h-5" />
          Invest Now
        </button>
      </div>
    </div>
  );
};

const Marketplace: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<Status>('Available');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const filteredCars = cars.filter(car => car.status === selectedStatus);
  
  const handleCarClick = (car: Car) => {
    navigate(`/app/marketplace/${car.id}`);
  };
  
  const openInvestModal = (e: React.MouseEvent, car: Car) => {
    e.stopPropagation();
    setSelectedCar(car);
    setIsModalOpen(true);
  };
  
  const handleInvest = (amount: number) => {
    if (!selectedCar) return;
    
    // Create investment item to add to cart
    const investmentItem = {
      id: selectedCar.id,
      name: `${selectedCar.name} ${selectedCar.model} - Investment`,
      image: selectedCar.image,
      price: amount,
      location: selectedCar.location,
      type: 'investment' as 'investment'
    };
    
    // Add to cart
    dispatch({ type: 'ADD_ITEM', payload: investmentItem });
    
    // Navigate to cart page
    navigate('/app/cart');
  };

  return (
    <div className="space-y-6">
      <InvestmentModal 
        car={selectedCar}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInvest={handleInvest}
      />
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
      </div>      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <div 
            key={car.id} 
            className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCarClick(car)}
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

              <div className="grid grid-cols-3 gap-4 text-center mb-4">
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
              
              {car.status === 'Available' && (
                <button
                  onClick={(e) => openInvestModal(e, car)}
                  className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition-colors"
                >
                  Invest Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;