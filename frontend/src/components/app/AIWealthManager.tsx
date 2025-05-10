import React, { useState } from 'react';
import { Brain, TrendingUp, LineChart, AlertTriangle, ArrowUpRight, Car, Zap, Send, ChevronRight } from 'lucide-react';

const AIWealthManager: React.FC = () => {
  const [message, setMessage] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const timeframes = ['1W', '1M', '3M', '6M', '1Y', 'ALL'];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-8">
      <h1 className="text-2xl font-bold text-gray-900">AI Wealth Manager</h1>

      {/* Market Overview Card */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
            <p className="text-gray-300 mb-6">
              AI-powered analysis shows strong market conditions with high potential for luxury vehicle investments.
            </p>
            <div className="flex gap-3">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTimeframe === tf
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div className="relative h-32">
            <img 
              src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg" 
              alt="Market Trend" 
              className="absolute top-0 right-0 w-48 h-32 object-cover rounded-xl opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">+15.8%</div>
                <div className="text-gray-300">Market Growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Intelligence */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Market Intelligence</h2>
                <p className="text-gray-600">Real-time market analysis and predictions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src="https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg" 
                    alt="Market Analysis" 
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm">Market Sentiment</div>
                    <div className="text-2xl font-bold">Strongly Bullish</div>
                  </div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-700">Confidence Score</span>
                    <span className="text-emerald-700 font-bold">92%</span>
                  </div>
                  <div className="h-2 bg-emerald-100 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Volume</div>
                    <div className="font-medium">↑ 12.5%</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Volatility</div>
                    <div className="font-medium">Low</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium mb-3">Key Insights</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    <span>Luxury SUV market showing strong growth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    <span>Electric vehicle segment expanding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    <span>Premium sports car demand increasing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* AI Insights */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-4 md:p-6 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8" />
              <h3 className="text-xl font-bold">AI Market Insights</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">Emerging Trends</span>
                </div>
                <p className="text-sm text-gray-100">
                  Electric vehicle market shows 32% growth potential in luxury segment
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Risk Alert</span>
                </div>
                <p className="text-sm text-gray-100">
                  Consider diversifying portfolio across different vehicle categories
                </p>
              </div>
            </div>
          </div>

          {/* Investment Recommendations */}
          <div className="bg-white rounded-xl p-4 md:p-6">
            <h2 className="text-xl font-bold mb-6">Recommended Investments</h2>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <img 
                  src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg" 
                  alt="Porsche 911" 
                  className="w-full md:w-24 h-24 md:h-24 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">Porsche 911 GT3 RS</h3>
                  <div className="text-sm text-gray-600">High appreciation potential · Low risk</div>
                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    <span className="text-sm text-emerald-600">↑ 15.2% Expected ROI</span>
                    <span className="text-sm text-gray-600">8.5% Annual Yield</span>
                  </div>
                </div>
                <button className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  View Details
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <img 
                  src="https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg" 
                  alt="Tesla Model S" 
                  className="w-full md:w-24 h-24 md:h-24 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">Tesla Model S Plaid</h3>
                  <div className="text-sm text-gray-600">Emerging market · Medium risk</div>
                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    <span className="text-sm text-emerald-600">↑ 18.7% Expected ROI</span>
                    <span className="text-sm text-gray-600">9.2% Annual Yield</span>
                  </div>
                </div>
                <button className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant and Analytics */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold">AI Investment Advisor</h2>
                <p className="text-sm text-gray-600">Get personalized advice</p>
              </div>
            </div>

            <div className="h-[300px] border border-gray-100 rounded-xl mb-4 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                    <p>Hello! I can help you make informed investment decisions. What would you like to know?</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about market trends, risks, or opportunities..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img 
                  src="https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg" 
                  alt="Performance" 
                  className="w-full sm:w-20 h-20 object-cover rounded-xl"
                />
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <div className="text-xl font-bold text-emerald-600">+15.8%</div>
                  </div>
                  <div className="text-sm text-gray-600">Annual Growth</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">ROI</div>
                  <div className="text-lg font-bold">18.3%</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Yield</div>
                  <div className="text-lg font-bold">9.2%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="bg-white rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-bold mb-4">Risk Analysis</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Market Risk</span>
                  <span className="text-amber-600">Medium</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Volatility</span>
                  <span className="text-emerald-600">Low</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Liquidity Risk</span>
                  <span className="text-red-600">High</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWealthManager;