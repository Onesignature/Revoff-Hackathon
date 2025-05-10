import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Car } from 'lucide-react';
import Logo from './Logo';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'invest' | 'rent'>('invest');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Route based on user type selection
    navigate(userType === 'invest' ? '/app' : '/rent');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <Logo />
            <h2 className="text-center text-3xl font-bold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="text-center text-gray-600 max-w-sm">
              Join the future of automotive investment and start earning today
            </p>
          </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="userType"
                  checked={userType === 'invest'}
                  onChange={() => setUserType('invest')}
                  className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
                />
                <span>I want to invest in cars</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="userType"
                  checked={userType === 'rent'}
                  onChange={() => setUserType('rent')}
                  className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
                />
                <span>I want to rent cars</span>
              </label>
            </div>
            <p className="text-sm text-gray-500">
              {userType === 'invest' 
                ? 'Invest in luxury vehicles and earn passive income'
                : 'Rent premium vehicles for your luxury driving experience'
              }
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <span className="absolute right-3 inset-y-0 flex items-center">
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span>Sign in with Google</span>
          </button>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-red-600 hover:text-red-500"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
      </div>
      
      {/* Right Panel - Image */}
      <div className="hidden lg:block w-1/2 relative">
        <img 
          src="/login.png" 
          alt="Luxury Car" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthPage;