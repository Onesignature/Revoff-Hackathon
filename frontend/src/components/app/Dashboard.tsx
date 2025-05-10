import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Card */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue breakdown</p>
                <p className="text-xs text-gray-500">01.07.24</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </button>
          </div>
          <p className="text-2xl font-semibold mb-4">AED 368,385.31</p>
          <div className="h-2 bg-red-600 rounded-full mb-2" style={{ width: '70%' }} />
          <div className="flex justify-between text-sm">
            <span>AED 257,869.72</span>
            <span>AED 110,515.59</span>
          </div>
        </div>

        {/* Sales Trends Card */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Sales trends</p>
                <p className="text-xs text-gray-500">01.07.24 - 07.07.24</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </button>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-semibold">+35.21%</span>
            <span className="text-sm text-gray-500">/ in a week</span>
          </div>
          <div className="grid grid-cols-7 gap-2 items-end h-24">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-full ${i === 5 ? 'bg-red-600' : 'bg-gray-100'} rounded-full`}
                  style={{ height: i === 5 ? '100%' : '40%' }}
                />
                <span className="text-xs text-gray-500">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Paid Amount Card */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Paid amount</p>
                <p className="text-xs text-gray-500">№82161</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </button>
          </div>
          <p className="text-2xl font-semibold mb-4">AED 90,809.59</p>
          <div className="relative">
            <div className="h-2 bg-red-600 rounded-full mb-2" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>05.07.2024</span>
              <span>12.07.2024</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>AED 0</span>
              <span>AED 90,809.59</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Search Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9c0 3.2 2.8 7 5.9 9l3.1 2 3.1-2c3.1-2 5.9-5.8 5.9-9Z" />
                  <path d="M12 12v.01" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Search for a car</p>
                <p className="text-xs text-gray-500">AI assistant</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </button>
          </div>
          
          <p className="text-lg mb-6">
            Can you help me find a Mercedes vehicle under AED 36,725 with good mileage
            <span className="text-gray-400"> and features?</span>
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-600 text-white rounded-xl p-4">
              <img 
                src="/mercedes/cle.jpg" 
                alt="Mercedes-Benz CLE" 
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h3 className="font-medium">Mercedes-Benz CLE 2023</h3>
              <p className="text-lg font-semibold">AED 30,683</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4">
              <img 
                src="/mercedes/c63red.webp" 
                alt="Mercedes-AMG C63" 
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h3 className="font-medium">Mercedes-AMG C63</h3>
              <p className="text-lg font-semibold">AED 34,889</p>
            </div>
          </div>

          <div className="flex mt-6 gap-4">
            <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </button>
            <div className="flex-1 flex items-center gap-4 px-6 border border-gray-200 rounded-full">
              <div className="flex-1">
                <input type="text" placeholder="Type your message..." className="w-full bg-transparent focus:outline-none" />
              </div>
              <button className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Car Details Section */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-medium">Mercedes-Benz CLE 2023</h2>
            <span className="text-sm text-gray-500">AMG Line · 2.0L</span>
          </div>

          <div className="relative mb-6 h-[300px]">
            <img 
              src='/mercedes/cle.jpg' 
              alt="Mercedes-Benz CLE" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-4xl font-semibold">AED 30,683</p>
              <p className="text-gray-500">Price</p>
            </div>
            <div>
              <p className="text-4xl font-semibold">AED 8,267</p>
              <p className="text-gray-500">Delivery</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">8,500 km</p>
                <p className="text-xs text-gray-500">Mileage of the car</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">2.0L · Turbocharged</p>
                <p className="text-xs text-gray-500">The engine</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v8" />
                  <path d="m4.93 10.93 1.41 1.41" />
                  <path d="M2 18h2" />
                  <path d="M20 18h2" />
                  <path d="m19.07 10.93-1.41 1.41" />
                  <path d="M22 22H2" />
                  <path d="m16 6-4 4-4-4" />
                  <path d="M16 18a4 4 0 0 0-8 0" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">city 11 · route 7.5</p>
                <p className="text-xs text-gray-500">Fuel consumption</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Bumper repair</p>
              <p className="text-lg font-semibold">AED 1,175</p>
            </div>
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              View details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;