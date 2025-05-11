import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calculator, Clock, Gauge, ArrowUpRight, Car, Shield, ChevronRight, ArrowLeft, Eye, Flame, TrendingUp, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const VehicleDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const { dispatch } = useCart();
  
  const vehicle = {
    id: Number(id),
    name: "Porsche 911 GT3 RS",
    model: "(992)",
    price: 759000,
    monthlyRent: 15000,
    location: "Dubai",
    stats: {
      views: 1847,
      trending: true,
      hot: true,
      timeLeft: '2 days'
    },
    funding: {
      progress: 62,
      totalInvestors: 184,
      remainingAmount: 288420,
      topInvestors: [
        { name: "Alex M.", amount: 50000 },
        { name: "Sarah K.", amount: 35000 },
        { name: "Michael R.", amount: 25000 }
      ]
    },
    images: [
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
      "https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg",
      "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg"
    ],
    specs: {
      engine: "4.0L Flat-6",
      power: "525 hp",
      transmission: "7-speed PDK",
      acceleration: "3.2s 0-100 km/h",
      topSpeed: "296 km/h",
      mileage: "1,200 km"
    },
    investment: {
      minAmount: 5000,
      maxAmount: 100000,
      expectedROI: 15.8,
      annualYield: 9.2,
      monthlyIncome: 5.4,
      totalAppreciation: 48.88
    }
  };

  const calculateReturns = (amount: number) => {
    return {
      monthlyIncome: (amount * vehicle.investment.monthlyIncome) / 100,
      annualYield: (amount * vehicle.investment.annualYield) / 100,
      totalReturn: (amount * vehicle.investment.totalAppreciation) / 100
    };
  };

  const returns = calculateReturns(investmentAmount);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/app/marketplace')}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Marketplace
        </button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Eye className="w-5 h-5" />
            <span>{vehicle.stats.views} views</span>
          </div>
          {vehicle.stats.trending && (
            <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
            </div>
          )}
          {vehicle.stats.hot && (
            <div className="px-3 py-1 bg-red-50 text-red-600 rounded-full flex items-center gap-2">
              <Flame className="w-4 h-4" />
              <span>Hot Deal</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-start bg-white rounded-xl p-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{vehicle.name}</h1>
          <div className="flex items-center gap-4 mb-2">
            <p className="text-gray-600">{vehicle.model} · {vehicle.location}</p>
            <div className="flex items-center gap-2 text-red-600">
              <div className="w-2 h-2 rounded-full bg-red-600"></div>
              <span className="text-sm font-medium">Live Funding</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">AED {vehicle.price.toLocaleString()}</div>
        </div>
        
        <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">
          <Timer className="w-5 h-5 text-red-600" />
          <span className="text-red-600 font-medium">Only {vehicle.stats.timeLeft} left to invest!</span>
        </div>
      </div>
      
      {/* Image Gallery and Investment Calculator Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Image */}
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src="/urus.jpg"
              alt={vehicle.name}
              className="w-full h-[400px] object-cover"
            />
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-3 gap-4">
            <img 
              src="/side1.webp"
              alt={`${vehicle.name} side view`}
              className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
            />
            <img 
              src="/side2.webp"
              alt={`${vehicle.name} front view`}
              className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
            />
            <img 
              src="/side3.png"
              alt={`${vehicle.name} rear view`}
              className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
            />
          </div>
        </div>

        {/* Investment Calculator - Now on the right side */}
        <div className="bg-white rounded-xl p-6 h-fit">
          <h2 className="text-xl font-bold mb-6">Investment Calculator</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Investment Amount (AED)</label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                min={vehicle.investment.minAmount}
                max={vehicle.investment.maxAmount}
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Monthly Income</span>
                <span className="font-medium">AED {returns.monthlyIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Annual Yield</span>
                <span className="font-medium">AED {returns.annualYield.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Total Return (3 years)</span>
                <span className="font-medium">AED {returns.totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>              </div>
            </div>            <button 
              onClick={() => {
                // Create investment item
                const investmentItem = {
                  id: vehicle.id,
                  name: `${vehicle.name} ${vehicle.model} - Investment`,
                  image: vehicle.images[0],
                  price: investmentAmount,
                  location: vehicle.location,
                  type: 'investment' as 'investment'
                };
                
                // Add to cart
                dispatch({ type: 'ADD_ITEM', payload: investmentItem });
                
                // Navigate to cart page
                navigate('/app/cart');
              }}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>Invest Now - Guaranteed Yields in 30 Days</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <p className="text-sm text-center text-emerald-600 font-medium">
              ✓ Guaranteed monthly yields starting in 30 days
            </p>
          </div>
        </div>
      </div>

      {/* Funding Progress */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Funding Progress</h2>
            <p className="text-gray-600">AED {vehicle.funding.remainingAmount.toLocaleString()} remaining</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-900">{vehicle.funding.progress}%</div>
            <p className="text-gray-600">{vehicle.funding.totalInvestors} investors</p>
          </div>
        </div>
        
        <div className="h-2 bg-gray-100 rounded-full mb-6">
          <div 
            className="h-full bg-red-600 rounded-full"
            style={{ width: `${vehicle.funding.progress}%` }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vehicle.funding.topInvestors.map((investor, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Top Investor {index + 1}</p>
              <p className="font-medium">{investor.name}</p>
              <p className="text-sm text-gray-600">AED {investor.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vehicle Details */}
        <div className="space-y-8">
          {/* Market Analytics */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Market Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Market Demand</span>
                    <span className="text-red-600">Very High</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Price Trend</span>
                    <span className="text-red-600">Upward</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Rental Demand</span>
                    <span className="text-red-600">High</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium mb-3">Key Insights</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    <span>Limited GT3 RS allocation worldwide</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    <span>Strong resale value history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    <span>High collector demand</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Vehicle Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Engine</p>
                  <p className="font-medium">{vehicle.specs.engine}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Gauge className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Power</p>
                  <p className="font-medium">{vehicle.specs.power}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">0-100 km/h</p>
                  <p className="font-medium">{vehicle.specs.acceleration}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Benefits */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Investment Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <ArrowUpRight className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-medium">High Returns</h3>
                </div>
                <p className="text-emerald-900">Expected annual returns of {vehicle.investment.expectedROI}% through rental income and appreciation</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h3 className="font-medium">Secure Investment</h3>
                </div>
                <p className="text-blue-900">Asset-backed investment with professional fleet management</p>
              </div>
            </div>
          </div>

          {/* Porsche Heritage */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">GT3 RS Heritage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img 
                  src="/side1.webp" 
                  alt="GT3 RS Heritage" 
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="font-medium mb-2">Racing DNA</h3>
                <p className="text-sm text-gray-600">
                  The GT3 RS represents Porsche's commitment to bringing race technology to the road,
                  featuring motorsport-derived aerodynamics and chassis technology.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-medium mb-2">Performance Highlights</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Naturally aspirated 4.0L flat-six engine</li>
                    <li>• Advanced aerodynamic package</li>
                    <li>• Motorsport-derived suspension</li>
                    <li>• Carbon fiber construction</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-medium mb-2">Limited Availability</h3>
                  <p className="text-sm text-gray-600">
                    GT3 RS models historically maintain strong value due to limited production
                    and high demand among collectors and enthusiasts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Analysis */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Investment Analysis</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Historical Appreciation</p>
                  <p className="text-2xl font-bold text-emerald-600">+12.5%</p>
                  <p className="text-sm text-gray-600">Annual average</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Rental Yield</p>
                  <p className="text-2xl font-bold text-emerald-600">8.2%</p>
                  <p className="text-sm text-gray-600">Annual return</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium mb-3">Value Drivers</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Limited production numbers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Strong collector demand</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Motorsport heritage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>High rental demand</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;