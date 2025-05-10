import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import Logo from '../Logo';

const RentSidebar: React.FC = () => {
  const location = useLocation();
  const filters = [
    { label: 'Mercedes-AMG', onRemove: () => {} },
    { label: 'Dubai Marina', onRemove: () => {} },
    { label: 'Luxury Sedans', onRemove: () => {} },
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
            <img src="/mercedes/amg-gt.jpg" alt="Mercedes-AMG GT" className="w-full h-full object-cover rounded-lg" />
            <button className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 3v6m0 0H15m6 0l-6-6m0 18v-6m0 0h6m-6 0l6 6" />
              </svg>
            </button>
          </div>
          <h3 className="font-medium mb-1">Mercedes-AMG GT</h3>
          <p className="text-sm text-gray-500">4.0L V8 Twin-Turbo (585 hp)</p>
          <p className="text-sm text-gray-500">Sport Plus · AMG Performance</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="relative mb-3">
            <img src="/mercedes/g63.webp" alt="Mercedes-AMG G63" className="w-full h-full object-cover rounded-lg" />
            <button className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 3v6m0 0H15m6 0l-6-6m0 18v-6m0 0h6m-6 0l6 6" />
              </svg>
            </button>
          </div>
          <h3 className="font-medium mb-1">Mercedes-AMG G63</h3>
          <p className="text-sm text-gray-500">4.0L V8 BiTurbo (577 hp)</p>
          <p className="text-sm text-gray-500">SUV · Off-Road Capable</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="relative mb-3">
            <img src="/mercedes/e63.jpg" alt="Mercedes-AMG E63" className="w-full h-full object-cover rounded-lg" />
            <button className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 3v6m0 0H15m6 0l-6-6m0 18v-6m0 0h6m-6 0l6 6" />
              </svg>
            </button>
          </div>
          <h3 className="font-medium mb-1">Mercedes-AMG E63</h3>
          <p className="text-sm text-gray-500">4.0L V8 BiTurbo (603 hp)</p>
          <p className="text-sm text-gray-500">Drift Mode · Performance Sedan</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="relative mb-3">
            <img src="/mercedes/sclass.jpg" alt="Mercedes-Benz S-Class" className="w-full h-full object-cover rounded-lg" />
            <button className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 3v6m0 0H15m6 0l-6-6m0 18v-6m0 0h6m-6 0l6 6" />
              </svg>
            </button>
          </div>
          <h3 className="font-medium mb-1">Mercedes-Benz S-Class</h3>
          <p className="text-sm text-gray-500">3.0L I6 Turbo + EQ Boost</p>
          <p className="text-sm text-gray-500">MBUX · Luxury Interior</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="relative mb-3">
            <img src="/mercedes/maybach.avif" alt="Mercedes-Maybach GLS 600" className="w-full h-full object-cover rounded-lg" />
            <button className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 3v6m0 0H15m6 0l-6-6m0 18v-6m0 0h6m-6 0l6 6" />
              </svg>
            </button>
          </div>
          <h3 className="font-medium mb-1">Mercedes-Maybach GLS 600</h3>
          <p className="text-sm text-gray-500">4.0L V8 BiTurbo (550 hp)</p>
          <p className="text-sm text-gray-500">Ultra Luxury · Burmester Sound</p>
        </div>
      </div>
    </aside>
  );
};


export default RentSidebar