import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, ArrowRight, Mail } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Newsletter Section */}
        <div className="relative rounded-3xl overflow-hidden mb-12 md:mb-20">
          <img 
            src="/lambo.png" 
            alt="Newsletter background" 
            className="w-full h-[300px] object-cover brightness-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Start Your Investment Journey<br />
              Own & Earn Today
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl w-full">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="Enter Email to Start Investing" 
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-gray-900"                />
              </div>
              <button 
                onClick={() => window.location.href = '/app/cart'} 
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
              >
                <span>Start Investing</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Logo />
            <p className="text-gray-400">
              The premier platform for fractional car ownership. Invest in luxury vehicles, earn monthly rental yields, and participate in the future of automotive investment.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Platform</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Investment Process</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Investment Security</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Join Our Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Where to Buy */}
          <div>
            <h3 className="text-xl font-bold mb-6">For Investors</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How to Invest</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Investment Calculator</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Portfolio Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Exit Options</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Investor Dashboard</a></li>
            </ul>
          </div>

          {/* Popular Products */}
          <div>
            <h3 className="text-xl font-bold mb-6">Investment Options</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Luxury Sedans</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sports Cars</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Premium SUVs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Exotic Cars</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Electric Vehicles</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400">© Copyright 2025 REVOFF</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;