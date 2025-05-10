import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Settings, Car, Calendar, Wallet, Clock, HeadphonesIcon, Heart } from 'lucide-react';

const RentHeader: React.FC = () => {
  const navItems = [
    { icon: Car, label: 'Dashboard', to: '/rent/dashboard' },
    { icon: Calendar, label: 'My Rentals', to: '/rent/my-rentals' },
    { icon: Wallet, label: 'Payments', to: '/rent/payments' },
    { icon: Clock, label: 'History', to: '/rent/history' },
    { icon: Heart, label: 'Favorites', to: '/rent/favorites' },
    { icon: HeadphonesIcon, label: 'Support', to: '/rent/support' },
  ];

  return (
    <header className="bg-gray-100 h-16 flex items-center px-6">
      <div className="flex-1">
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
                  isActive
                    ? 'bg-red-50 text-red-600'
                    : 'bg-white text-gray-600 hover:bg-gray-50/50'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex items-center justify-end gap-4">
        <button className="p-2 bg-white rounded-lg text-gray-600 hover:text-gray-900 transition-colors shadow-sm">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 bg-white rounded-lg text-gray-600 hover:text-gray-900 transition-colors shadow-sm">
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-white shadow-sm"></div>
      </div>
    </header>
  );
};

export default RentHeader;