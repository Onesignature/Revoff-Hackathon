import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import Logo from '../Logo';

const RentSidebar: React.FC = () => {
  const location = useLocation();
  const filters = [
    { label: 'Sports Cars', onRemove: () => {} },
    { label: 'Dubai Marina', onRemove: () => {} },
    { label: 'Available Now', onRemove: () => {} },
  ];

  return (
    <aside className="w-80 bg-gray-100 flex flex-col min-h-screen p-6">
      <div className="mb-8">
        <Logo />
      </div>

      <h1 className="text-2xl font-medium mb-6">Recently Viewed</h1>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-3 py-2.5 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Search cars..."
          />
        </div>
        <button className="p-2.5 bg-white rounded-lg hover:bg-gray-50 transition-colors">
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <div key={filter.label} className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full">
            <span className="text-sm">{filter.label}</span>
            <button onClick={filter.onRemove} className="text-gray-400 hover:text-red-600 transition-colors">
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="relative mb-3">
            <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg" alt="Porsche 911" className="w-full h-full object-cover rounded-lg" />
            <button className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 3v6m0 0H15m6 0l-6-6m0 18v-6m0 0h6m-6 0l6 6" />
              </svg>
            </button>
          </div>
          <h3 className="font-medium mb-1">Porsche 911 GT3 RS</h3>
          <p className="text-sm text-gray-500">4.0L Flat-6 (525 hp)</p>
          <p className="text-sm text-gray-500">PDK · Track Ready</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="relative mb-3">
            <img src="https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg" alt="Lamborghini Urus" className="w-full h-full object-cover rounded-lg" />
            <button className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 3v6m0 0H15m6 0l-6-6m0 18v-6m0 0h6m-6 0l6 6" />
              </svg>
            </button>
          </div>
          <h3 className="font-medium mb-1">Lamborghini Urus</h3>
          <p className="text-sm text-gray-500">4.0L V8 Twin-Turbo (650 hp)</p>
          <p className="text-sm text-gray-500">Performante · AWD</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="relative mb-3">
            <img src="https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg" alt="Ferrari SF90" className="w-full h-full object-cover rounded-lg" />
            <button className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 3v6m0 0H15m6 0l-6-6m0 18v-6m0 0h6m-6 0l6 6" />
              </svg>
            </button>
          </div>
          <h3 className="font-medium mb-1">Ferrari SF90</h3>
          <p className="text-sm text-gray-500">4.0L V8 Hybrid (1000 hp)</p>
          <p className="text-sm text-gray-500">Stradale · AWD</p>
        </div>
      </div>
    </aside>
  );
};


export default RentSidebar