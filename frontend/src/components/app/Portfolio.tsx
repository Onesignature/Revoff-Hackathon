import React from 'react';
import { Home, HelpCircle, TrendingUp, Calendar, LineChart, Car, Zap, Brain } from 'lucide-react';

const Portfolio: React.FC = () => {
  const carStakes = [
    {
      id: 1,
      name: 'Alfa Romeo Giulia Quadrifoglio',
      location: 'Dubai',
      investmentValue: 125000,
      totalRentalIncome: 12500,
      status: 'Active',
      image: '/mercedes/romeo.jpg',
      appreciation: 15.2,
      monthlyYield: 8.5
    },
    {
      id: 2,
      name: 'Mercedes-Benz S600',
      location: 'Dubai',
      investmentValue: 95000,
      totalRentalIncome: 9800,
      status: 'Active',
      image: '/mercedes/s600.jpg',
      appreciation: 12.8,
      monthlyYield: 7.9
    },
    {
      id: 3,
      name: 'Mercedes-AMG G Class',
      location: 'Dubai',
      investmentValue: 140000,
      totalRentalIncome: 15200,
      status: 'Active',
      image: '/mercedes/gclass.avif',
      appreciation: 18.5,
      monthlyYield: 9.2
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>

      {/* Portfolio Value Card */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          Portfolio value
          <HelpCircle className="w-4 h-4" />
        </div>
        <div className="text-3xl font-bold">AED 360,000</div>
      </div>

      {/* Key Financials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            Monthly income
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold">AED 2,750</div>
          <div className="text-sm text-gray-500 mt-1">Apr 2025</div>
        </div>

        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            Total rental income
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold">AED 37,500</div>
          <div className="text-sm text-gray-500 mt-1">as of Apr 2025</div>
        </div>

        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            Total appreciation
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold">AED 53,760</div>
          <div className="text-sm text-gray-500 mt-1">as of Apr 2025</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Stakes */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-xl font-bold">My Stakes</h2>
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Vehicle</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Location</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Investment value</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Total rental income</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {carStakes.map((stake) => (
                    <tr key={stake.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={stake.image} alt={stake.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <div className="font-medium">{stake.name}</div>
                            <div className="text-sm text-gray-500">
                              {stake.appreciation}% appreciation · {stake.monthlyYield}% yield
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{stake.location}</td>
                      <td className="py-4 px-6">
                        <div className="font-medium">AED {stake.investmentValue.toLocaleString()}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium">AED {stake.totalRentalIncome.toLocaleString()}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                          {stake.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {carStakes.length === 0 && (
                    <tr className="text-center">
                      <td colSpan={5} className="py-8 text-gray-500">
                        No stakes yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold">Quick insights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Home className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-gray-600">Number of vehicles</div>
              <div className="text-2xl font-bold mt-1">3</div>
            </div>

            <div className="bg-white rounded-xl p-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Rental rate</span>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold mt-1">85%</div>
            </div>

            <div className="bg-white rounded-xl p-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Annual rental yield</span>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold mt-1">8.2%</div>
            </div>
          </div>
        </div>

        {/* AI Analytics */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">AI Market Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Market Sentiment</h3>
                  <p className="text-sm text-gray-500">Based on current trends</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Luxury Sedan Market</span>
                    <span className="text-emerald-600">Bullish</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Performance Vehicles</span>
                    <span className="text-emerald-600">Very Bullish</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Performance Prediction</h3>
                  <p className="text-sm text-gray-500">Next 12 months</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Expected appreciation</span>
                  <span className="font-medium text-emerald-600">+15.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rental yield forecast</span>
                  <span className="font-medium text-emerald-600">9.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Market volatility</span>
                  <span className="font-medium text-amber-600">Medium</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Annual Investment Limit */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Annual investment limit</h2>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="bg-white rounded-xl p-6">
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">0% of limit used</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-full bg-red-600 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Annual limit</span>
                <span className="font-medium">AED 367,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Invested in the last 12 months</span>
                <span className="font-medium">AED 0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available to invest</span>
                <span className="font-medium">AED 367,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;