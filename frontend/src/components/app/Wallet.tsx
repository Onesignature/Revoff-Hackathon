import React from 'react';
import { CreditCard, Building2, Clock, Star, HelpCircle, Plus } from 'lucide-react';

const Wallet: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cash Balance Card */}
        <div className="bg-white rounded-xl p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 text-gray-600">
                Cash balance
              </div>
              <div className="text-3xl font-bold mt-2">AED 0</div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              Deposit
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Withdraw
            </button>
          </div>
        </div>

        {/* Rewards Balance Card */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 text-gray-600">
                Rewards balance
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-3xl font-bold mt-2">AED 0</div>
            </div>
            <Star className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="bg-white rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-4 font-medium text-gray-600">Type</th>
                <th className="pb-4 font-medium text-gray-600">Status</th>
                <th className="pb-4 font-medium text-gray-600">Date</th>
                <th className="pb-4 font-medium text-gray-600">Wallet</th>
                <th className="pb-4 font-medium text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td colSpan={5} className="py-8">
                  <div className="flex flex-col items-center text-gray-500">
                    <Clock className="w-8 h-8 mb-2" />
                    <p>No transactions yet</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cards Section */}
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Cards</h2>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-4">
            <CreditCard className="w-6 h-6 text-gray-400" />
            <p className="text-sm text-gray-600">Add a card to enjoy instant deposits from anywhere in the world</p>
          </div>
          <button className="w-full flex items-center justify-center gap-2 text-gray-600 border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
            <Plus className="w-5 h-5" />
            Add new card
          </button>
        </div>

        {/* Banks Section */}
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Banks</h2>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-4">
            <Building2 className="w-6 h-6 text-gray-400" />
            <p className="text-sm text-gray-600">Add a bank account to deposit from anywhere in the world</p>
          </div>
          <button className="w-full flex items-center justify-center gap-2 text-gray-600 border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
            <Plus className="w-5 h-5" />
            Add new bank
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;