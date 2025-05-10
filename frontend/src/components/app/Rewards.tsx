import React from 'react';
import { HelpCircle, Gift, Users, Ticket, ChevronRight, Copy } from 'lucide-react';

const Rewards: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Rewards</h1>

      {/* Total Rewards Card */}
      <div className="bg-white rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 text-gray-600">
              Total rewards earned
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="text-3xl font-bold mt-2">AED 0</div>
            <button className="text-red-600 flex items-center gap-1 mt-2 text-sm hover:text-red-700 transition-colors">
              view current balance
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-red-500" />
                <span className="text-gray-600">Cashback</span>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
              <span className="font-medium">AED 0</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-red-500" />
                <span className="text-gray-600">Referrals</span>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
              <span className="font-medium">AED 0</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-red-500" />
                <span className="text-gray-600">Promotions</span>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
              <span className="font-medium">AED 0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Intro Card */}
        <div className="bg-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Intro</h2>
            <ChevronRight className="w-5 h-5" />
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="text-2xl font-bold">AED 0</div>
              <div className="text-red-100">Invested in the last 12 months</div>
            </div>
            
            <div className="h-2 bg-red-500 rounded-full">
              <div className="h-full bg-white rounded-full" style={{ width: '0%' }} />
            </div>
            
            <div className="text-sm">
              Invest AED 10,000 to reach Plus
            </div>
          </div>
        </div>

        {/* Refer and Earn Card */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Gift className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-semibold">Refer and earn</h2>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <p className="text-gray-600 mb-6">
            Invite your friends and you'll both receive a rewards balance to invest in our properties!
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span>Friends get <strong>AED 150</strong> upon signing up</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span>You get <strong>AED 150</strong> after they invest <strong>AED 2,000</strong></span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Share your link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value="https://app.nowrevoff.com/rewards"
                readOnly
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-600"
              />
              <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                <Copy className="w-4 h-4" />
                copy link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;