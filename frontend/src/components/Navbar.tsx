import React from 'react';
import { ChevronDown, LogIn } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-10 px-4 py-4">
      <div className="max-w-7xl mx-auto relative flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
        <div className="md:flex items-center gap-8">
          <div className="hidden md:flex items-center space-x-12">
            <a href="#home" className="text-white hover:text-green-200 transition-colors font-medium">Overview</a>
            
            <a href="#how-it-works" className="text-white hover:text-green-200 transition-colors font-medium">Features</a>
            
            <div className="relative group">
              <a href="#investment-options" className="text-white hover:text-red-200 transition-colors font-medium flex items-center whitespace-nowrap">
                Vehicles <ChevronDown className="ml-1 h-4 w-4" />
              </a>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="#investment-options" className="block px-4 py-2 text-gray-800 hover:bg-red-50">Buy Cars</a>
                <a href="/rent-cars" className="block px-4 py-2 text-gray-800 hover:bg-red-50">Rent Cars</a>
              </div>
            </div>
            
            <a href="#about" className="text-white hover:text-green-200 transition-colors font-medium whitespace-nowrap">About Us</a>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo />
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden md:flex items-center gap-3 text-white hover:text-red-200 transition-colors">
            <LogIn className="h-5 w-5" />
            <a href="/auth">Login</a>
          </button>
          
          <button className="hidden md:block bg-red-600 text-white px-6 md:px-8 py-2 rounded-full font-medium hover:bg-red-700 transition-colors ml-4">
            <a href="/auth">Sign Up</a>
          </button>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-sm py-6 border border-white/20 rounded-3xl mt-4 mx-4">
          <div className="px-6 space-y-6">
            <a href="#home" className="block text-white/80 hover:text-red-500 py-2 text-lg font-medium transition-colors">Overview</a>
            <a href="#how-it-works" className="block text-white/80 hover:text-red-500 py-2 text-lg font-medium transition-colors">Features</a>
            <div className="space-y-2">
              <a href="#investment-options" className="block text-white/80 hover:text-red-500 py-2 text-lg font-medium transition-colors">Buy Cars</a>
              <a href="/rent-cars" className="block text-white/80 hover:text-red-500 py-2 text-lg font-medium transition-colors">Rent Cars</a>
            </div>
            <a href="#about" className="block text-white/80 hover:text-red-500 py-2 text-lg font-medium transition-colors">About Us</a>
            <div className="pt-6 flex flex-col gap-4 border-t border-white/10">
              <a href="/auth" className="w-full text-white/90 hover:text-red-500 py-3 text-left text-lg font-medium transition-colors">Login</a>
              <a href="/auth" className="w-full bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-colors text-center text-lg">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;